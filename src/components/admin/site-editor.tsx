"use client";

import type { Content, SiteSettings } from "@/lib/types";
import { Field, inputClass, Section } from "./fields";
import { ImageField } from "./image-field";

type SiteEditorProps = {
  content: Content;
  onChange: (content: Content) => void;
};

export function SiteEditor({ content, onChange }: SiteEditorProps) {
  const { site } = content;

  function updateSite(patch: Partial<SiteSettings>) {
    onChange({ ...content, site: { ...site, ...patch } });
  }

  function updateSocial(
    key: keyof SiteSettings["socials"],
    value: string,
  ) {
    updateSite({ socials: { ...site.socials, [key]: value } });
  }

  return (
    <div className="space-y-4">
      <Section
        title="Brand"
        description="The name, tagline, and intro shown across the phone."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              value={site.name}
              onChange={(event) => updateSite({ name: event.target.value })}
              placeholder="Mandy"
              className={inputClass}
            />
          </Field>
          <Field label="Handle">
            <input
              value={site.handle}
              onChange={(event) => updateSite({ handle: event.target.value })}
              placeholder="@mandy"
              className={inputClass}
            />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <input
              value={site.tagline}
              onChange={(event) => updateSite({ tagline: event.target.value })}
              placeholder="Pieces I actually wear."
              className={inputClass}
            />
          </Field>
          <Field label="Location">
            <input
              value={site.location}
              onChange={(event) => updateSite({ location: event.target.value })}
              placeholder="Lagos, Nigeria"
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={site.email}
              onChange={(event) => updateSite({ email: event.target.value })}
              placeholder="hello@example.com"
              className={inputClass}
            />
          </Field>
          <Field
            label="Bio"
            hint="One paragraph per line."
            className="sm:col-span-2"
          >
            <textarea
              value={site.bio.join("\n")}
              onChange={(event) =>
                updateSite({ bio: event.target.value.split("\n") })
              }
              rows={4}
              placeholder="Tell people who you are and how ordering works."
              className={`${inputClass} resize-y leading-relaxed`}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Links"
        description="WhatsApp powers ordering. Social links open in a new tab."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="WhatsApp"
            hint="Paste a wa.me link or just your number, for example +2348012345678."
            className="sm:col-span-2"
          >
            <input
              value={site.whatsappLink}
              onChange={(event) =>
                updateSite({ whatsappLink: event.target.value })
              }
              placeholder="https://wa.me/2348012345678"
              className={inputClass}
            />
          </Field>
          <Field label="Instagram" hint="Full URL or @handle.">
            <input
              value={site.socials.instagram}
              onChange={(event) =>
                updateSocial("instagram", event.target.value)
              }
              placeholder="@mandy"
              className={inputClass}
            />
          </Field>
          <Field label="TikTok" hint="Full URL or @handle.">
            <input
              value={site.socials.tiktok}
              onChange={(event) => updateSocial("tiktok", event.target.value)}
              placeholder="@mandy"
              className={inputClass}
            />
          </Field>
          <Field label="Facebook" hint="Full URL or @handle.">
            <input
              value={site.socials.facebook}
              onChange={(event) =>
                updateSocial("facebook", event.target.value)
              }
              placeholder="@mandy"
              className={inputClass}
            />
          </Field>
          <Field label="Currency" hint="Three-letter code, for example NGN.">
            <input
              value={site.currency}
              maxLength={3}
              onChange={(event) =>
                updateSite({ currency: event.target.value.toUpperCase() })
              }
              placeholder="NGN"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Wallpaper"
        description="One photo sits behind both the lock screen and the home screen."
      >
        <ImageField
          label="Lock and home wallpaper"
          value={site.wallpaper}
          onChange={(value) => updateSite({ wallpaper: value })}
          hint="Use a tall portrait photo. It is resized to fit a phone screen."
        />
      </Section>
    </div>
  );
}
