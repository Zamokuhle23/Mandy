import type {
  AppId,
  Content,
  Product,
  SiteSettings,
} from "./types";

const FALLBACK: Content = {
  site: {
    name: "Mandy",
    handle: "@mandy",
    tagline: "Pieces I actually wear.",
    location: "Lagos, Nigeria",
    bio: [
      "Hey, I am Mandy. I pick, style, and sell the pieces I keep reaching for.",
      "Every order is packed by me and answered on WhatsApp.",
    ],
    email: "",
    whatsappLink: "",
    socials: {
      instagram: "",
      tiktok: "",
      facebook: "",
    },
    wallpaper: "/media/wallpaper.jpg",
    currency: "NGN",
  },
  categories: [
    { id: "tops", name: "Tops" },
    { id: "hoodies", name: "Hoodies" },
    { id: "prints", name: "Prints" },
    { id: "bags", name: "Bags" },
  ],
  products: [
    {
      id: "signature-tee",
      name: "Signature Tee",
      price: 25000,
      categoryId: "tops",
      tag: "New",
      description:
        "Heavyweight cotton tee with a relaxed drop shoulder and a soft washed finish.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Cream", "Sand"],
      image: "",
      gradient: "from-[#f7b267] via-[#f79d65] to-[#f4845f]",
      active: true,
    },
    {
      id: "soft-hoodie",
      name: "Soft Hoodie",
      price: 48000,
      categoryId: "hoodies",
      tag: "Best seller",
      description:
        "Brushed fleece hoodie, boxy fit, double-lined hood. Made for cold nights and long days.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Charcoal", "Bone", "Moss"],
      image: "",
      gradient: "from-[#8e9eab] via-[#667eea] to-[#4c51bf]",
      active: true,
    },
    {
      id: "limited-print",
      name: "Limited Print",
      price: 18000,
      categoryId: "prints",
      tag: "Limited",
      description:
        "A small-run art print on textured matte paper. Signed and numbered by hand.",
      sizes: ["A3", "A2"],
      colors: ["Warm", "Cool"],
      image: "",
      gradient: "from-[#fbc2eb] via-[#a6c1ee] to-[#8b5cf6]",
      active: true,
    },
    {
      id: "everyday-tote",
      name: "Everyday Tote",
      price: 15000,
      categoryId: "bags",
      tag: "Restock",
      description:
        "Sturdy canvas tote with an inside pocket. Fits a laptop, a bottle, and everything else.",
      sizes: ["One size"],
      colors: ["Natural", "Black"],
      image: "",
      gradient: "from-[#a8e063] via-[#56ab2f] to-[#2f8f46]",
      active: true,
    },
  ],
  photos: [
    { id: "photo-01", src: "/photos/01.jpg", alt: "Portrait in the city" },
    { id: "photo-02", src: "/photos/02.jpg", alt: "On the water at golden hour" },
    { id: "photo-03", src: "/photos/03.jpg", alt: "Close-up portrait" },
    { id: "photo-04", src: "/photos/04.jpg", alt: "Flowers in the sun" },
    { id: "photo-05", src: "/photos/05.jpg", alt: "Golden hour glow" },
    { id: "photo-06", src: "/photos/06.jpg", alt: "Behind the lens" },
    { id: "photo-07", src: "/photos/07.jpg", alt: "Shooting on the street" },
    { id: "photo-08", src: "/photos/08.jpg", alt: "Quiet moment by the sea" },
    { id: "photo-09", src: "/photos/09.jpg", alt: "Out on the trail" },
  ],
  notifications: [
    {
      id: "drop",
      app: "shop",
      appName: "Shop",
      time: "now",
      title: "New drop is live",
      body: "Fresh pieces just landed. Tap to browse and order on WhatsApp.",
    },
    {
      id: "message",
      app: "whatsapp",
      appName: "WhatsApp",
      time: "2m ago",
      title: "Mandy",
      body: "Hey! Need help with a size or an order? Message me directly.",
    },
    {
      id: "photos",
      app: "photos",
      appName: "Photos",
      time: "1h ago",
      title: "Latest photos",
      body: "Behind the scenes from the new shoot are up in Photos.",
    },
  ],
};

export function defaultContent(): Content {
  return structuredClone(FALLBACK);
}

export function formatPrice(site: SiteSettings, value: number): string {
  const price = Number.isFinite(value) ? value : 0;

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: site.currency || "NGN",
      maximumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  } catch {
    return `${site.currency || "NGN"} ${price.toLocaleString()}`;
  }
}

export function externalUrl(site: SiteSettings, id: AppId): string | null {
  switch (id) {
    case "instagram":
      return site.socials.instagram || null;
    case "tiktok":
      return site.socials.tiktok || null;
    case "facebook":
      return site.socials.facebook || null;
    case "whatsapp":
      return site.whatsappLink || null;
    case "sayhi":
      return site.whatsappLink
        ? whatsappUrl(site, "Hi Mandy! I found your site and I have a question.")
        : null;
    default:
      return null;
  }
}

export function whatsappUrl(
  site: SiteSettings,
  message: string,
): string | null {
  if (!site.whatsappLink) return null;

  try {
    const url = new URL(site.whatsappLink);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return null;
  }
}

export function orderMessage(
  site: SiteSettings,
  product: Product,
  size: string,
  color: string,
  quantity: number,
): string {
  const unit = formatPrice(site, product.price);
  const total = formatPrice(site, product.price * quantity);

  return [
    `Hi ${site.name}! I would like to order:`,
    `${product.name} — ${unit}`,
    `Colour: ${color} · Size: ${size} · Qty: ${quantity}`,
    `Total: ${total} (${quantity} × ${unit})`,
  ].join("\n");
}
