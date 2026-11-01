const APP_LABELS = {
  shop: "Shop",
  photos: "Photos",
  about: "About",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  sayhi: "Say hi",
};

const APP_IDS = new Set(Object.keys(APP_LABELS));

const GRADIENTS = [
  "from-[#f7b267] via-[#f79d65] to-[#f4845f]",
  "from-[#8e9eab] via-[#667eea] to-[#4c51bf]",
  "from-[#fbc2eb] via-[#a6c1ee] to-[#8b5cf6]",
  "from-[#a8e063] via-[#56ab2f] to-[#2f8f46]",
  "from-[#f97316] via-[#ef4444] to-[#7c3aed]",
  "from-[#22d3ee] via-[#3b82f6] to-[#1e1b4b]",
];

const DEFAULT_CONTENT = {
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

function text(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function uniqueId(value, used) {
  const base = slug(value) || "item";
  let candidate = base;
  let suffix = 2;

  while (used.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  used.add(candidate);
  return candidate;
}

function httpUrl(value) {
  const raw = text(value, 1200);
  if (!raw) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw)
    ? raw
    : `https://${raw.replace(/^\/+/, "")}`;

  try {
    const url = new URL(withScheme);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function socialUrl(value, host) {
  const raw = text(value, 500);
  if (!raw) return "";
  if (raw.startsWith("@")) {
    return `https://${host}/${raw.slice(1)}`;
  }
  if (!/^https?:\/\//i.test(raw) && !raw.includes(".")) {
    return `https://${host}/${raw.replace(/^\/+/, "")}`;
  }
  return httpUrl(raw);
}

function whatsappUrl(value) {
  const raw = text(value, 500);
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return httpUrl(raw);
  if (/^[\d+\s()\-]+$/.test(raw)) {
    const digits = raw.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  return httpUrl(raw);
}

function mediaUrl(value) {
  const raw = text(value, 1200);
  if (!raw) return "";
  if (
    raw.startsWith("/uploads/") ||
    raw.startsWith("/photos/") ||
    raw.startsWith("/media/")
  ) {
    return raw;
  }
  return httpUrl(raw);
}

function list(value, maxItems, maxLength) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  return source
    .map((item) => text(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function paragraphs(value) {
  const source = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/\n+/)
      : [];
  return source
    .map((item) => text(item, 600))
    .filter(Boolean)
    .slice(0, 10);
}

function amount(value) {
  const parsed =
    typeof value === "number"
      ? value
      : Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.round(parsed * 100) / 100;
}

function currency(value) {
  const code = text(value, 3).toUpperCase();
  return /^[A-Z]{3}$/.test(code) ? code : "NGN";
}

export function defaultContent() {
  return structuredClone(DEFAULT_CONTENT);
}

export function normalizeContent(input) {
  const source = input && typeof input === "object" ? input : {};
  const rawSite = source.site && typeof source.site === "object" ? source.site : {};
  const rawSocials =
    rawSite.socials && typeof rawSite.socials === "object" ? rawSite.socials : {};

  const site = {
    name: text(rawSite.name, 80) || "Mandy",
    handle: text(rawSite.handle, 80),
    tagline: text(rawSite.tagline, 200),
    location: text(rawSite.location, 120),
    bio: paragraphs(rawSite.bio),
    email: text(rawSite.email, 200),
    whatsappLink: whatsappUrl(rawSite.whatsappLink),
    socials: {
      instagram: socialUrl(rawSocials.instagram, "instagram.com"),
      tiktok: socialUrl(rawSocials.tiktok, "tiktok.com"),
      facebook: socialUrl(rawSocials.facebook, "facebook.com"),
    },
    wallpaper: mediaUrl(rawSite.wallpaper),
    currency: currency(rawSite.currency),
  };

  const rawCategories = Array.isArray(source.categories) ? source.categories : [];
  const usedCategories = new Set();
  const categories = rawCategories.slice(0, 40).map((category, index) => {
    const name = text(category?.name, 80) || `Category ${index + 1}`;
    return {
      id: uniqueId(category?.id || name, usedCategories),
      name,
    };
  });
  const categoryIds = new Set(categories.map((category) => category.id));

  const rawProducts = Array.isArray(source.products) ? source.products : [];
  const usedProducts = new Set();
  const products = rawProducts.slice(0, 200).map((product, index) => {
    const name = text(product?.name, 120) || `Piece ${index + 1}`;
    const categoryId = text(product?.categoryId, 80);
    const gradient = text(product?.gradient, 200);
    const sizes = list(product?.sizes, 20, 40);
    const colors = list(product?.colors, 20, 40);

    return {
      id: uniqueId(product?.id || name, usedProducts),
      name,
      price: amount(product?.price),
      categoryId:
        categoryId === "" || categoryIds.has(categoryId)
          ? categoryId
          : categories[0]?.id ?? "",
      tag: text(product?.tag, 40),
      description: text(product?.description, 2000),
      sizes: sizes.length > 0 ? sizes : ["One size"],
      colors: colors.length > 0 ? colors : ["Default"],
      image: mediaUrl(product?.image),
      gradient: GRADIENTS.includes(gradient)
        ? gradient
        : GRADIENTS[index % GRADIENTS.length],
      active: product?.active !== false,
    };
  });

  const rawPhotos = Array.isArray(source.photos) ? source.photos : [];
  const usedPhotos = new Set();
  const photos = rawPhotos
    .slice(0, 100)
    .map((photo, index) => ({
      id: uniqueId(photo?.id || `photo-${index + 1}`, usedPhotos),
      src: mediaUrl(photo?.src),
      alt: text(photo?.alt, 200),
    }))
    .filter((photo) => photo.src);

  const rawNotifications = Array.isArray(source.notifications)
    ? source.notifications
    : [];
  const usedNotifications = new Set();
  const notifications = rawNotifications.slice(0, 8).map((notification, index) => {
    const app = APP_IDS.has(notification?.app) ? notification.app : "shop";
    return {
      id: uniqueId(notification?.id || `notification-${index + 1}`, usedNotifications),
      app,
      appName: text(notification?.appName, 40) || APP_LABELS[app],
      time: text(notification?.time, 40),
      title: text(notification?.title, 120),
      body: text(notification?.body, 500),
    };
  });

  return { site, categories, products, photos, notifications };
}

export function publicContent(content) {
  return {
    site: content.site,
    categories: content.categories,
    products: content.products.filter((product) => product.active),
    photos: content.photos,
    notifications: content.notifications,
  };
}
