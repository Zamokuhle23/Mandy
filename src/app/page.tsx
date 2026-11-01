import Phone from "@/components/phone";
import { ContentProvider } from "@/lib/content-context";

export default function Home() {
  return (
    <ContentProvider>
      <Phone />
    </ContentProvider>
  );
}
