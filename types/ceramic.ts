export interface CeramicProduct {
  id: number | string;
  name: string;
  description: string;
  price: number;
  stock: number;
  clayType: 'stoneware' | 'porcelain' | 'earthenware' | 'bone-china' | 'terracotta';
  images: string[];
  category: string;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
    diameter?: number;
  };
  weight?: number;
  handmade: boolean;
  glaze?: string;
  dishwasherSafe?: boolean;
  microwave?: boolean;
  featured?: boolean;
}

export interface CeramicImage {
  url: string;
  alt: string;
}
