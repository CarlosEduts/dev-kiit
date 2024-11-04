"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Page() {
  const t = useTranslations("border-editor-tool");
  const [borderWidth, setBorderWidth] = useState(3);
  const [borderStyle, setBorderStyle] = useState("solid");
  const [borderColor, setBorderColor] = useState("rgb(79, 70, 229)");
  const [borderRadius, setBorderRadius] = useState({
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
  });

  // Atualiza o valor do border-radius individual
  const handleBorderRadiusChange = (corner: string, value: string) => {
    setBorderRadius((prev) => ({
      ...prev,
      [corner]: Number(value),
    }));
  };

  // Estilo dinâmico para o box
  const boxStyle = {
    borderWidth: `${borderWidth}px`,
    borderStyle: borderStyle,
    borderColor: borderColor,
    borderTopLeftRadius: `${borderRadius.topLeft}px`,
    borderTopRightRadius: `${borderRadius.topRight}px`,
    borderBottomLeftRadius: `${borderRadius.bottomLeft}px`,
    borderBottomRightRadius: `${borderRadius.bottomRight}px`,
  };

  // Gera o CSS em formato de string para exibir e copiar
  const generatedCSS = `
    border-width: ${borderWidth}px;
    border-style: ${borderStyle};
    border-color: ${borderColor};
    border-top-left-radius: ${borderRadius.topLeft}px;
    border-top-right-radius: ${borderRadius.topRight}px;
    border-bottom-left-radius: ${borderRadius.bottomLeft}px;
    border-bottom-right-radius: ${borderRadius.bottomRight}px;
  `;

  // Função para copiar o CSS gerado
  const handleCopyCSS = async () => {
    await navigator.clipboard.writeText(generatedCSS);
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8 min-h-[calc(100dvh-80px)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {t("borderEditorTitle")}
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          {t("borderEditorDescription")}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div
          style={boxStyle}
          className="h-32 w-full rounded-lg bg-gray-100 mb-5"
        ></div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("borderWidthLabel")}
            </label>
            <input
              type="number"
              min="0"
              value={borderWidth}
              onChange={(e) => setBorderWidth(Number(e.target.value))}
              className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("borderStyleLabel")}
            </label>
            <select
              value={borderStyle}
              onChange={(e) => setBorderStyle(e.target.value)}
              className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("borderColorLabel")}
            </label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="block w-full h-10 rounded-md border px-3.5 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("borderRadiusLabel")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                min="0"
                value={borderRadius.topLeft}
                onChange={(e) =>
                  handleBorderRadiusChange("topLeft", e.target.value)
                }
                placeholder={t("borderRadiusTopLeft")}
                className="rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              <input
                type="number"
                min="0"
                value={borderRadius.topRight}
                onChange={(e) =>
                  handleBorderRadiusChange("topRight", e.target.value)
                }
                placeholder={t("borderRadiusTopRight")}
                className="rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              <input
                type="number"
                min="0"
                value={borderRadius.bottomLeft}
                onChange={(e) =>
                  handleBorderRadiusChange("bottomLeft", e.target.value)
                }
                placeholder={t("borderRadiusBottomLeft")}
                className="rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              <input
                type="number"
                min="0"
                value={borderRadius.bottomRight}
                onChange={(e) =>
                  handleBorderRadiusChange("bottomRight", e.target.value)
                }
                placeholder={t("borderRadiusBottomRight")}
                className="rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="mt-6"></div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            {t("generatedCSSLabel")}
          </label>
          <pre className="mt-2 whitespace-pre-wrap break-words rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 shadow-sm">
            {generatedCSS}
          </pre>
          <button
            onClick={handleCopyCSS}
            className="mt-4 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("copyCSSButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
