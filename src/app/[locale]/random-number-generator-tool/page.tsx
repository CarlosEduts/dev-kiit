"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const t = useTranslations("random-number-generator-tool");
  const [numCount, setNumCount] = useState(1);
  const [charCount, setCharCount] = useState(5);
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);

  const handleGenerate = () => {
    const numbers: string[] = Array.from({ length: numCount }, () =>
      Math.floor(Math.random() * Math.pow(10, charCount))
        .toString()
        .padStart(charCount, "0") // garante que o número tenha o número correto de caracteres
    );
    setGeneratedNumbers(numbers);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedNumbers.join("\n"));
  };

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
        <label className="block text-sm font-medium text-gray-700">
          {t("numCountLabel")}
        </label>
        <input
          type="number"
          min={1}
          value={numCount}
          onChange={(e) => setNumCount(Number(e.target.value))}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        />
        
        <label className="block text-sm font-medium text-gray-700 mt-4">
          {t("charCountLabel")}
        </label>
        <input
          type="number"
          min={1}
          value={charCount}
          onChange={(e) => setCharCount(Number(e.target.value))}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        />

        <button
          onClick={handleGenerate}
          className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("generateButton")}
        </button>

        <div className="mt-4">
          <pre className="mt-2 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 shadow-sm">
            {generatedNumbers.length > 0 ? generatedNumbers.join("\n") : t("noNumbersGenerated")}
          </pre>
        </div>

        {generatedNumbers.length > 0 && (
          <button
            onClick={handleCopy}
            className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("copyButton")}
          </button>
        )}
      </div>
    </div>
  );
}
