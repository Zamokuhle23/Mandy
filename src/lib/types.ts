export type AppId =
  | "shop"
  | "photos"
  | "about"
  | "whatsapp"
  | "instagram"
  | "tiktok"
  | "facebook"
  | "sayhi";

export type SocialLinks = {
  instagram: string;
  tiktok: string;
  facebook: string;
};

export type SiteSettings = {
  name: string;
  handle: string;
  tagline: string;
  location: string;
  bio: string[];
  email: string;
  whatsappLink: string;
  socials: SocialLinks;
  wallpaper: string;
  currency: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  tag: string;
  description: string;
  sizes: string[];
  colors: string[];
  image: string;
  gradient: string;
  active: boolean;
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
};

export type Notification = {
  id: string;
  app: AppId;
  appName: string;
  time: string;
  title: string;
  body: string;
};

export type Content = {
  site: SiteSettings;
  categories: Category[];
  products: Product[];
  photos: Photo[];
  notifications: Notification[];
  updatedAt?: string;
};
