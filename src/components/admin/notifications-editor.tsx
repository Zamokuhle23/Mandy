"use client";

import type { Content, Notification } from "@/lib/types";
import type { AppId } from "@/lib/types";
import {
  APP_LABELS,
  APP_OPTIONS,
  moveItem,
  uniqueId,
} from "@/lib/admin-utils";
import {
  EmptyState,
  Field,
  inputClass,
  primaryButton,
  RowActions,
  Section,
} from "./fields";

type NotificationsEditorProps = {
  content: Content;
  onChange: (content: Content) => void;
};

export function NotificationsEditor({
  content,
  onChange,
}: NotificationsEditorProps) {
  const used = new Set(
    content.notifications.map((notification) => notification.id),
  );

  function updateNotification(id: string, patch: Partial<Notification>) {
    onChange({
      ...content,
      notifications: content.notifications.map((notification) =>
        notification.id === id
          ? { ...notification, ...patch }
          : notification,
      ),
    });
  }

  function removeNotification(id: string) {
    onChange({
      ...content,
      notifications: content.notifications.filter(
        (notification) => notification.id !== id,
      ),
    });
  }

  function addNotification() {
    const id = uniqueId("notification", used);
    onChange({
      ...content,
      notifications: [
        ...content.notifications,
        {
          id,
          app: "shop",
          appName: APP_LABELS.shop,
          time: "now",
          title: "New drop is live",
          body: "Tap to browse the latest pieces.",
        },
      ],
    });
  }

  return (
    <Section
      title="Lock screen notifications"
      description="These are the glass cards on the lock screen. Tapping one opens that app."
      actions={
        <button
          type="button"
          onClick={addNotification}
          disabled={content.notifications.length >= 8}
          className={primaryButton}
        >
          Add notification
        </button>
      }
    >
      {content.notifications.length === 0 ? (
        <EmptyState>No notifications yet. Add one above.</EmptyState>
      ) : (
        <div className="space-y-3">
          {content.notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="rounded-2xl border border-white/10 bg-black/20 p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  Notification {index + 1}
                </p>
                <RowActions
                  canUp={index > 0}
                  canDown={index < content.notifications.length - 1}
                  onUp={() =>
                    onChange({
                      ...content,
                      notifications: moveItem(
                        content.notifications,
                        index,
                        -1,
                      ),
                    })
                  }
                  onDown={() =>
                    onChange({
                      ...content,
                      notifications: moveItem(
                        content.notifications,
                        index,
                        1,
                      ),
                    })
                  }
                  onRemove={() => removeNotification(notification.id)}
                  removeLabel="Remove notification"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="App" hint="Tapping the notification opens this.">
                  <select
                    value={notification.app}
                    onChange={(event) => {
                      const app = event.target.value as AppId;
                      updateNotification(notification.id, {
                        app,
                        appName: APP_LABELS[app],
                      });
                    }}
                    className={inputClass}
                  >
                    {APP_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="App label">
                  <input
                    value={notification.appName}
                    onChange={(event) =>
                      updateNotification(notification.id, {
                        appName: event.target.value,
                      })
                    }
                    placeholder="Shop"
                    className={inputClass}
                  />
                </Field>
                <Field label="Time">
                  <input
                    value={notification.time}
                    onChange={(event) =>
                      updateNotification(notification.id, {
                        time: event.target.value,
                      })
                    }
                    placeholder="now"
                    className={inputClass}
                  />
                </Field>
                <Field label="Title">
                  <input
                    value={notification.title}
                    onChange={(event) =>
                      updateNotification(notification.id, {
                        title: event.target.value,
                      })
                    }
                    placeholder="New drop is live"
                    className={inputClass}
                  />
                </Field>
                <Field
                  label="Message"
                  className="sm:col-span-2"
                >
                  <textarea
                    value={notification.body}
                    onChange={(event) =>
                      updateNotification(notification.id, {
                        body: event.target.value,
                      })
                    }
                    rows={2}
                    placeholder="Fresh pieces just landed."
                    className={`${inputClass} resize-y leading-relaxed`}
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
