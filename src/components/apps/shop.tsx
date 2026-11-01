"use client";

import Image from "next/image";
import { useState } from "react";
import { mediaSrc } from "@/lib/api-base";
import { formatPrice, orderMessage, whatsappUrl } from "@/lib/config";
import { useContent } from "@/lib/content-context";
import type { Product, SiteSettings } from "@/lib/types";
import { ArrowUpRight, MinusIcon, PlusIcon, ShopGlyph } from "../icons";

type ShopAppProps = {
  notify: (message: string) => void;
};

export default function ShopApp({ notify }: ShopAppProps) {
  const { site, products, categories } = useContent();
  const [selected, setSelected] = useState<Product | null>(null);
  const [category, setCategory] = useState("all");

  if (selected) {
    return (
      <ProductDetail
        site={site}
        product={selected}
        onBack={() => setSelected(null)}
        notify={notify}
      />
    );
  }

  const activeCategory =
    category === "all" || categories.some((item) => item.id === category)
      ? category
      : "all";

  const visibleProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => product.categoryId === activeCategory);

  return (
    <>
      <div className="glass relative overflow-hidden rounded-[26px] p-4">
        <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#ff3d6e]/35 blur-2xl" />
        <div className="relative flex items-start gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/10 text-white">
            <ShopGlyph className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[14px] font-semibold">Order on WhatsApp</p>
            <p className="mt-0.5 text-[12px] leading-snug text-white/65">
              Pick a piece, choose your size, and send the order straight to{" "}
              {site.name}.
            </p>
          </div>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
              activeCategory === "all"
                ? "bg-white text-black"
                : "glass text-white/75"
            }`}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                activeCategory === item.id
                  ? "bg-white text-black"
                  : "glass text-white/75"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      {visibleProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {visibleProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelected(product)}
              className="glass overflow-hidden rounded-[22px] p-2.5 text-left transition active:scale-[0.975]"
            >
              <div
                className={`relative aspect-square overflow-hidden rounded-[16px] bg-gradient-to-br ${product.gradient}`}
              >
                {product.image ? (
                  <Image
                    src={mediaSrc(product.image)}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 45vw, 160px"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <span className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/25 blur-xl" />
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      {site.name}
                    </span>
                  </>
                )}
                {product.tag ? (
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-black/35 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur">
                    {product.tag}
                  </span>
                ) : null}
              </div>
              <p className="mt-2.5 truncate text-[13px] font-semibold">
                {product.name}
              </p>
              <p className="text-[12px] text-white/60">
                {formatPrice(site, product.price)}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="glass mt-4 rounded-[24px] p-5 text-center">
          <p className="text-[13px] font-semibold">No pieces here yet</p>
          <p className="mt-1 text-[12px] leading-snug text-white/55">
            Check back soon or say hi on WhatsApp.
          </p>
        </div>
      )}
    </>
  );
}

type ProductDetailProps = {
  site: SiteSettings;
  product: Product;
  onBack: () => void;
  notify: (message: string) => void;
};

function ProductDetail({
  site,
  product,
  onBack,
  notify,
}: ProductDetailProps) {
  const { categories } = useContent();
  const [size, setSize] = useState(product.sizes[0] ?? "One size");
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [quantity, setQuantity] = useState(1);

  const link = whatsappUrl(
    site,
    orderMessage(site, product, size, color, quantity),
  );
  const categoryName = categories.find(
    (category) => category.id === product.categoryId,
  )?.name;

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/65"
      >
        <span aria-hidden>←</span> All pieces
      </button>

      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br ${product.gradient}`}
      >
        {product.image ? (
          <Image
            src={mediaSrc(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, 340px"
            className="object-cover"
          />
        ) : (
          <>
            <span className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" />
            <span className="absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-black/20 blur-2xl" />
            <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
              {site.name}
            </span>
          </>
        )}
        {product.tag ? (
          <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
            {product.tag}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          {categoryName ? (
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/45">
              {categoryName}
            </p>
          ) : null}
          <h3 className="text-[21px] font-semibold tracking-[-0.01em]">
            {product.name}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-white/65">
            {product.description}
          </p>
        </div>
        <p className="shrink-0 text-[17px] font-semibold">
          {formatPrice(site, product.price)}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
          Size
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                size === option
                  ? "bg-white text-black"
                  : "glass text-white/80"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
          Colour
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setColor(option)}
              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                color === option
                  ? "bg-white text-black"
                  : "glass text-white/80"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50">
          Quantity
        </p>
        <div className="glass flex items-center gap-1 rounded-full p-1">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="grid h-8 w-8 place-items-center rounded-full text-white/85 active:bg-white/10"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-6 text-center text-[13px] font-semibold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            aria-label="Increase quantity"
            className="grid h-8 w-8 place-items-center rounded-full text-white/85 active:bg-white/10"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-3.5 text-[14px] font-semibold text-[#052e16] transition active:scale-[0.98]"
        >
          Order on WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => notify("WhatsApp ordering is coming soon.")}
          className="glass mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold text-white/85 transition active:scale-[0.98]"
        >
          Order on WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </button>
      )}
      <p className="mt-3 text-center text-[11px] leading-snug text-white/45">
        {link
          ? "Your order opens in WhatsApp with the details already filled in."
          : "WhatsApp checkout link coming soon."}
      </p>
    </div>
  );
}
