"use client";

import type { Content } from "@/lib/types";
import { moveItem, uniqueId } from "@/lib/admin-utils";
import {
  EmptyState,
  Field,
  inputClass,
  primaryButton,
  RowActions,
  Section,
} from "./fields";

type CategoriesEditorProps = {
  content: Content;
  onChange: (content: Content) => void;
};

export function CategoriesEditor({ content, onChange }: CategoriesEditorProps) {
  const used = new Set(content.categories.map((category) => category.id));

  function addCategory() {
    const id = uniqueId("new-category", used);
    onChange({
      ...content,
      categories: [
        ...content.categories,
        { id, name: "New category" },
      ],
    });
  }

  function renameCategory(id: string, name: string) {
    onChange({
      ...content,
      categories: content.categories.map((category) =>
        category.id === id ? { ...category, name } : category,
      ),
    });
  }

  function removeCategory(id: string) {
    const count = content.products.filter(
      (product) => product.categoryId === id,
    ).length;

    if (
      count > 0 &&
      !window.confirm(
        `${count} product${count === 1 ? "" : "s"} will become uncategorized. Continue?`,
      )
    ) {
      return;
    }

    onChange({
      ...content,
      categories: content.categories.filter((category) => category.id !== id),
      products: content.products.map((product) =>
        product.categoryId === id
          ? { ...product, categoryId: "" }
          : product,
      ),
    });
  }

  return (
    <Section
      title="Categories"
      description="Shown as filter chips in the shop. Products can also be uncategorized."
      actions={
        <button type="button" onClick={addCategory} className={primaryButton}>
          Add category
        </button>
      }
    >
      {content.categories.length === 0 ? (
        <EmptyState>No categories yet. Add one above.</EmptyState>
      ) : (
        <div className="space-y-2">
          {content.categories.map((category, index) => {
            const count = content.products.filter(
              (product) => product.categoryId === category.id,
            ).length;

            return (
              <div
                key={category.id}
                className="flex flex-wrap items-end gap-2 rounded-2xl border border-white/10 bg-black/20 p-3"
              >
                <Field
                  label={`Category ${index + 1}`}
                  hint={`${count} product${count === 1 ? "" : "s"} · id: ${category.id}`}
                  className="min-w-[180px] flex-1"
                >
                  <input
                    value={category.name}
                    onChange={(event) =>
                      renameCategory(category.id, event.target.value)
                    }
                    placeholder="Tops"
                    className={inputClass}
                  />
                </Field>
                <RowActions
                  canUp={index > 0}
                  canDown={index < content.categories.length - 1}
                  onUp={() =>
                    onChange({
                      ...content,
                      categories: moveItem(content.categories, index, -1),
                    })
                  }
                  onDown={() =>
                    onChange({
                      ...content,
                      categories: moveItem(content.categories, index, 1),
                    })
                  }
                  onRemove={() => removeCategory(category.id)}
                  removeLabel="Remove category"
                />
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
