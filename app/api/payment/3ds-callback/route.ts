import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrCreateUser, createOrder, createOrderItems } from '@/lib/supabase';

function generateSignature(message: string, secretKey: string): string {
  return crypto
    .createHmac('sha1', secretKey)
    .update(message)
    .digest('base64');
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// iyzico 3D Secure callback — banka OTP doğrulaması sonrası iyzico bu endpoint'e POST atar
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.IYZICO_API_KEY || '';
    const secretKey = process.env.IYZICO_SECRET_KEY || '';
    const baseUrl = process.env.IYZICO_BASE_URL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elsdreamfactory.com';

    if (!baseUrl || !apiKey || !secretKey) {
      return NextResponse.redirect(`${siteUrl}/payment-failed?reason=config_error`);
    }

    // iyzico form-encoded body gönderir
    const formData = await request.formData();
    const paymentId = formData.get('paymentId')?.toString() || '';
    const conversationData = formData.get('conversationData')?.toString() || '';
    const mdStatus = formData.get('mdStatus')?.toString() || '';

    // mdStatus: 1 = tam 3DS, 2-6 = yarı 3DS (bankaya göre değişir), diğerleri = başarısız
    if (!['1', '2', '3', '4'].includes(mdStatus)) {
      return NextResponse.redirect(`${siteUrl}/payment-failed?reason=3ds_failed`);
    }

    // 3D Secure doğrulama tamamlama isteği
    const authPayload = {
      locale: 'tr',
      conversationId: generateRandomId(),
      paymentId,
      conversationData,
    };

    const jsonPayload = JSON.stringify(authPayload);
    const signature = generateSignature(jsonPayload, secretKey);
    const authorizationHeader = Buffer.from(apiKey).toString('base64');

    const response = await fetch(`${baseUrl}/payment/3dsecure/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `IyzipayV2 ${authorizationHeader}`,
        'X-IyzipayV2': signature,
      },
      body: jsonPayload,
    });

    const result = await response.json();

    if (result.status === 'success') {
      try {
        // Conversation data'dan sipariş bilgilerini çek
        let orderData: any = {};
        try {
          orderData = conversationData ? JSON.parse(conversationData) : {};
        } catch {
          // conversationData JSON değilse boş bırak
        }

        const user = await getOrCreateUser(
          orderData.email || result.buyer?.email || 'musteri@elsdreamfactory.com',
          orderData.firstName || result.buyer?.name || 'Müşteri',
          orderData.lastName || result.buyer?.surname || ''
        );

        const order = await createOrder(
          user.id,
          parseFloat(result.paidPrice || result.price || '0'),
          orderData.address || result.shippingAddress?.address || '',
          result.paymentId
        );

        if (orderData.items && Array.isArray(orderData.items)) {
          await createOrderItems(
            order.id,
            orderData.items.map((item: any) => ({
              product_id: item.id,
              product_name: item.name,
              quantity: item.quantity,
              price: item.price,
            }))
          );
        }

        const orderId = `ORD-${order.id.slice(0, 8).toUpperCase()}`;
        const date = new Date().toLocaleDateString('tr-TR');
        return NextResponse.redirect(
          `${siteUrl}/thank-you?orderId=${orderId}&date=${encodeURIComponent(date)}`
        );
      } catch {
        // DB kaydı başarısız olsa bile ödeme başarılı — yönlendir
        const orderId = `ORD-${Date.now()}`;
        const date = new Date().toLocaleDateString('tr-TR');
        return NextResponse.redirect(
          `${siteUrl}/thank-you?orderId=${orderId}&date=${encodeURIComponent(date)}`
        );
      }
    } else {
      let errorCode = 'payment_failed';
      const errorMsg = result.errorMessage || '';

      if (errorMsg.includes('declined') || errorMsg.includes('reddedildi')) errorCode = 'card_declined';
      else if (errorMsg.includes('insufficient') || errorMsg.includes('yetersiz')) errorCode = 'insufficient_funds';
      else if (errorMsg.includes('expired') || errorMsg.includes('süresi')) errorCode = 'expired_card';

      return NextResponse.redirect(`${siteUrl}/payment-failed?reason=${errorCode}`);
    }
  } catch {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elsdreamfactory.com';
    return NextResponse.redirect(`${siteUrl}/payment-failed?reason=network_error`);
  }
}
