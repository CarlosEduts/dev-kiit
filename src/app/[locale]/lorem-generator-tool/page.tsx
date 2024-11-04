"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

const loremWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "nulla",
  "viverra",
  "egestas",
  "urna",
  "ut",
  "varius",
  "integer",
  "ac",
  "feugiat",
  "odio",
  "neque",
  "orci",
  "convallis",
  "nullam",
  "vel",
  "semper",
  "scelerisque",
  "eros",
];

const generateRandomLoremIpsum = (
  paragraphs: number,
  wordsPerParagraph: number
) => {
  const getRandomWords = (count: number) =>
    Array.from(
      { length: count },
      () => loremWords[Math.floor(Math.random() * loremWords.length)]
    ).join(" ");

  return Array.from({ length: paragraphs }, () =>
    getRandomWords(wordsPerParagraph)
  ).join("\n\n");
};

const generateLoremIpsum = (paragraphs: number) => {
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra egestas urna ut varius. Integer ac feugiat odio.";
  return Array.from({ length: paragraphs }, () => loremText).join("\n\n");
};

export default function LoremGenerator() {
  const t = useTranslations("lorem-generator-tool");
  const [paragraphs, setParagraphs] = useState(1);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(30);
  const [loremText, setLoremText] = useState("");
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handleGenerate = () => {
    setLoremText(generateRandomLoremIpsum(paragraphs, wordsPerParagraph));
    setCopySuccess(null); // Reset copy success message
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(loremText);
      setCopySuccess(t("copySuccess"));
    } catch (err) {
      setCopySuccess(t("copyError"));
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-[calc(100dvh-80px)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {t("loremTitle")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">{t("loremDescription")}</p>
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("paragraphCount")}
        </label>
        <input
          type="number"
          min={1}
          value={paragraphs}
          onChange={(e) => setParagraphs(Number(e.target.value))}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        />

        <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
          {t("wordsPerParagraph")}
        </label>
        <input
          type="number"
          min={5}
          value={wordsPerParagraph}
          onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
        />

        <div className="mt-4 text-sm text-gray-700 whitespace-pre-line">
          <strong>{t("generatedText")}:</strong> <br /> {loremText}
        </div>

        <button
          onClick={handleGenerate}
          className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("generateButton")}
        </button>

        {loremText && (
          <button
            onClick={handleCopy}
            className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("copyButton")}
          </button>
        )}
        {copySuccess && (
          <p className="mt-2 text-sm text-green-600">{copySuccess}</p>
        )}
      </div>
    </div>
  );
}
