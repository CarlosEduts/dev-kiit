import { useTranslations } from "next-intl";
import Hero from "../components/Hero";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div>
      {/* <h1>{t("title")}</h1> */}
      <Hero />
    </div>
  );
}
