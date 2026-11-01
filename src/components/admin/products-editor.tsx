"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/config";
import { gradientFor, moveItem, uniqueId } from "@/lib/admin-utils";
import type { Content, Product } from "@/lib/types";
import {
  EmptyState,
  Field,
  inputClass,
  ListField,
  primaryButton,
  RowActions,
  Section,
  Toggle,
} from "./fields";
import { ImageField } from "./image-field";

type ProductsEditorProps = {
  content: Content;
  onChange: (content: Content) => void;
};

export function ProductsEditor({ content, onChange }: ProductsEditorProps) {
  const [openId, setOpenId] = useState<string | null>(
    content.products[0]?.id ?? null,
  );
  const used = new Set(content.products.map((product) => product.id));

  function updateProduct(id: string, patch: Partial<Product>) {
    onChange({
      ...content,
      products: content.products.map((product) =>
        product.id === id ? { ...product, ...patch } : product,
      ),
    });
  }

  function removeProduct(id: string) {
    if (!window.confirm("Remove this product?")) return;
    onChange({
      ...content,
      products: content.products.filter((product) => product.id !== id),
    });
    setOpenId((current) => (current === id ? null : current));
  }

  function addProduct() {
    const id = uniqueId("new-piece", used);
    const product: Product = {
      id,
      name: "New piece",
      price: 0,
      categoryId: content.categories[0]?.id ?? "",
      tag: "",
      description: "",
      sizes: ["One size"],
      colors: ["Default"],
      image: "",
      gradient: gradientFor(content.products.length),
      active: true,
    };

    onChange({ ...content, products: [...content.products, product] });
    setOpenId(id);
  }

  return (
    <Section
      title="Products"
      description="Add pieces, set prices and categories, and control what is visible in the shop."
      actions={
        <button type="button" onClick={addProduct} className={primaryButton}>
          Add product
        </button>
      }
    >
      {content.products.length === 0 ? (
        <EmptyState>No products yet. Add your first piece above.</EmptyState>
      ) : (
        <div className="space-y-3">
          {content.products.map((product, index) => {
            const open = openId === product.id;
            const categoryName =
              content.categories.find(
                (category) => category.id === product.categoryId,
              )?.name ?? "Uncategorized";

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >
                <div className="flex flex-wrap items-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : product.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-expanded={open}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        product.active ? "bg-emerald-400" : "bg-white/25"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-semibold">
                        {product.name || "Untitled piece"}
                      </span>
                      <span className="block truncate text-[11px] text-white/40">
                        {formatPrice(content.site, product.price)} ·{" "}
                        {categoryName}
                        {product.active ? "" : " · hidden"}
                      </span>
                    </span>
                  </button>

                  <Toggle
                    label="Visible"
                    checked={product.active}
                    onChange={(active) =>
                      updateProduct(product.id, { active })
                    }
                  />

                  <RowActions
                    canUp={index > 0}
                    canDown={index < content.products.length - 1}
                    onUp={() =>
                      onChange({
                        ...content,
                        products: moveItem(content.products, index, -1),
                      })
                    }
                    onDown={() =>
                      onChange({
                        ...content,
                        products: moveItem(content.products, index, 1),
                      })
                    }
                    onRemove={() => removeProduct(product.id)}
                    removeLabel="Remove product"
                  />
                </div>

                {open ? (
                  <div className="border-t border-white/10 p-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Name">
                        <input
                          value={product.name}
                          onChange={(event) =>
                            updateProduct(product.id, {
                              name: event.target.value,
                            })
                          }
                          placeholder="Signature Tee"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Price" hint={`Currency: ${content.site.currency}`}>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={Number.isFinite(product.price) ? product.price : 0}
                          onChange={(event) =>
                            updateProduct(product.id, {
                              price: Number(event.target.value),
                            })
                          }
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Category">
                        <select
                          value={product.categoryId}
                          onChange={(event) =>
                            updateProduct(product.id, {
                              categoryId: event.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="">Uncategorized</option>
                          {content.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Tag" hint="For example: New, Best seller, Limited.">
                        <input
                          value={product.tag}
                          onChange={(event) =>
                            updateProduct(product.id, {
                              tag: event.target.value,
                            })
                          }
                          placeholder="New"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Description" className="sm:col-span-2">
                        <textarea
                          value={product.description}
                          onChange={(event) =>
                            updateProduct(product.id, {
                              description: event.target.value,
                            })
                          }
                          rows={3}
                          placeholder="Fabric, fit, and anything else worth knowing."
                          className={`${inputClass} resize-y leading-relaxed`}
                        />
                      </Field>
                      <ListField
                        label="Sizes"
                        value={product.sizes}
                        onChange={(sizes) =>
                          updateProduct(product.id, { sizes })
                        }
                        hint="Separate with commas."
                        placeholder="S, M, L, XL"
                      />
                      <ListField
                        label="Colours"
                        value={product.colors}
                        onChange={(colors) =>
                          updateProduct(product.id, { colors })
                        }
                        hint="Separate with commas."
                        placeholder="Black, Cream, Sand"
                      />
                      <div className="sm:col-span-2">
                        <ImageField
                          label="Product image"
                          value={product.image}
                          onChange={(image) =>
                            updateProduct(product.id, { image })
                          }
                          hint="Optional. Without an image, the product uses a gradient tile."
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
