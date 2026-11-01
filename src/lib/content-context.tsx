"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchPublicContent } from "./api";
import { defaultContent } from "./config";
import type { Content } from "./types";

const fallback = defaultContent();
const ContentContext = createContext<Content>(fallback);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(fallback);

  useEffect(() => {
    const controller = new AbortController();

    fetchPublicContent(controller.signal)
      .then((next) => setContent(next))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        console.warn("Using fallback site content.", error);
      });

    return () => controller.abort();
  }, []);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): Content {
  return useContext(ContentContext);
}
