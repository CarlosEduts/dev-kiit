"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const t = useTranslations("count-characters-tool");
  const [text, setText] = useState("");
  const wordCount = text ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-[calc(100dvh-80px)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">{t("description")}</p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("placeholder")}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        />
        <div className="mt-4 text-sm text-gray-700 text-center">
          {t("charCount")}: {charCount} <br />
          {t("wordCount")}: {wordCount}
        </div>
      </div>
    </div>
  );
}
