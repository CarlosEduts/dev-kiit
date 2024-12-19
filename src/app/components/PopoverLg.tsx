"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { WrenchIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface ComponentProp {
  title: string;
  tool: string;
  quantity: number;
}

export default function PopoverLg({ title, tool, quantity }: ComponentProp) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");

  // Loop que pega o nome da ferramenta a faz um loop com o json de tradução
  const tools = [];
  for (var i = 0; i < quantity; i++) {
    console.log(t(`tools-data.${tool}.${i}.name`));

    tools.push({
      name: t(`tools-data.${tool}.${i}.name`),
      description: t(`tools-data.${tool}.${i}.description`),
      href: t(`tools-data.${tool}.${i}.href`),
      icon: WrenchIcon,
    });
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        {title}
        <ChevronDownIcon
          aria-hidden="true"
          className="h-5 w-5 flex-none text-gray-400"
        />
      </button>

      {isOpen && (
        <div className="absolute -left-8 top-full z-10 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
          <div className="p-4">
            {tools.map((item) => (
              <div
                key={item.name}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div className="flex-auto">
                  <Link
                    href={item.href}
                    className="block font-semibold text-gray-900"
                  >
                    {item.name}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
