"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const t = useTranslations("password-generator-tool");
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let characters = "";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()";

    if (characters === "") {
      setPassword(t("noCharactersSelected"));
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
  };

  return (
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-[calc(100dvh-80px)]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {t("generateTitle")}
          </h2>
          <p className="mt-2 text-lg text-gray-600">{t("generateDescription")}</p>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <label className="block text-sm font-medium text-gray-700">{t("lengthLabel")}</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={4}
            max={64}
            className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-600"
          />

          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              {t("includeUppercase")}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              {t("includeLowercase")}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              {t("includeNumbers")}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              {t("includeSymbols")}
            </label>
          </div>

          <pre className="mt-4 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 shadow-sm">
            {password || t("noPassword")}
          </pre>
          <button
            onClick={generatePassword}
            className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("generateButton")}
          </button>
          {password && (
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
