export type IGraveyardItem = {
  id?: string;
  fellesraadId?: string;
  name: string;
  location: string;
  picture: string[];
  content: string;
  newsLink: string;
  forecastLink: string;
  approved?: boolean;
  cratedAt?: Date;
  updatedAt?: Date;
};

export type IImageType = File[];

export type IUploadUrlTYpe = string[];

export type IGraveyardTableFilterValue = string | string[];

export type IGraveyardTableFilters = {
  name: string;
  approved: boolean;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IGraveItem = {
  id: string;
  sku: string;
  name: string;
  code: string;
  price: number;
  taxes: number;
  tags: string[];
  gender: string;
  sizes: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  colors: string[];
  quantity: number;
  category: string;
  available: number;
  totalSold: number;
  description: string;
  totalRatings: number;
  totalReviews: number;
  inventoryType: string;
  subDescription: string;
  priceSale: number | null;
  reviews: IProductReview[];
  createdAt: Date;
  ratings: {
    name: string;
    starCount: number;
    reviewCount: number;
  }[];
  saleLabel: {
    enabled: boolean;
    content: string;
  };
  newLabel: {
    enabled: boolean;
    content: string;
  };
};

export type IResponseType = {
  success: boolean;
  message: string;
  result: any;
};
