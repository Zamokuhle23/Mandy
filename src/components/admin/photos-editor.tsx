"use client";

import type { Content, Photo } from "@/lib/types";
import { moveItem, uniqueId } from "@/lib/admin-utils";
import {
  EmptyState,
  Field,
  inputClass,
  primaryButton,
  RowActions,
  Section,
} from "./fields";
import { ImageField } from "./image-field";

type PhotosEditorProps = {
  content: Content;
  onChange: (content: Content) => void;
};

export function PhotosEditor({ content, onChange }: PhotosEditorProps) {
  const used = new Set(content.photos.map((photo) => photo.id));

  function updatePhoto(id: string, patch: Partial<Photo>) {
    onChange({
      ...content,
      photos: content.photos.map((photo) =>
        photo.id === id ? { ...photo, ...patch } : photo,
      ),
    });
  }

  function removePhoto(id: string) {
    onChange({
      ...content,
      photos: content.photos.filter((photo) => photo.id !== id),
    });
  }

  function addPhoto() {
    const id = uniqueId("photo", used);
    onChange({
      ...content,
      photos: [...content.photos, { id, src: "", alt: "" }],
    });
  }

  return (
    <Section
      title="Photos"
      description="The gallery inside the Photos app and the preview on the home screen."
      actions={
        <button type="button" onClick={addPhoto} className={primaryButton}>
          Add photo
        </button>
      }
    >
      {content.photos.length === 0 ? (
        <EmptyState>No photos yet. Add your first one above.</EmptyState>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {content.photos.map((photo, index) => (
            <div
              key={photo.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Photo {index + 1}
                </p>
                <RowActions
                  canUp={index > 0}
                  canDown={index < content.photos.length - 1}
                  onUp={() =>
                    onChange({
                      ...content,
                      photos: moveItem(content.photos, index, -1),
                    })
                  }
                  onDown={() =>
                    onChange({
                      ...content,
                      photos: moveItem(content.photos, index, 1),
                    })
                  }
                  onRemove={() => removePhoto(photo.id)}
                  removeLabel="Remove photo"
                />
              </div>

              <div className="space-y-3">
                <ImageField
                  label="Image"
                  value={photo.src}
                  onChange={(value) => updatePhoto(photo.id, { src: value })}
                />
                <Field label="Alt text">
                  <input
                    value={photo.alt}
                    onChange={(event) =>
                      updatePhoto(photo.id, { alt: event.target.value })
                    }
                    placeholder="Portrait in the city"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
