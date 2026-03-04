import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "El's Dream Factory - El Yapımı Seramik Ürünler";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f5f0eb 0%, #e8ddd4 50%, #d4c5b5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              color: '#8B7355',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            El Yapımı Seramik
          </div>
          <div
            style={{
              fontSize: '72px',
              color: '#2C2C2C',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            {"El's Dream Factory"}
          </div>
          <div
            style={{
              width: '80px',
              height: '2px',
              backgroundColor: '#B8860B',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              color: '#5C5C5C',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Seramik Kupalar · Dekoratif Objeler · Hediye Seçenekleri
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#8B7355',
              letterSpacing: '0.15em',
              marginTop: '20px',
            }}
          >
            elsdreamfactory.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
