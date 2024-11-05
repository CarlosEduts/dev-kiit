import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import {
  DisclosureButton,
  DisclosurePanel,
  //@ts-ignore
} from "@headlessui/react";
import { ChartPieIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface ComponentProp {
  title: string;
  tool: string;
  quantity: number;
  closeBar: any;
}

export default function PopoverSm({
  title,
  tool,
  quantity,
  closeBar,
}: ComponentProp) {
  const t = useTranslations("Header");

  // Loop que pega o nome da ferramenta a faz um loop com o json de tradução
  const tools = [];
  for (var i = 0; i < quantity; i++) {
    console.log(t(`tools-data.${tool}.${i}.name`));

    tools.push({
      name: t(`tools-data.${tool}.${i}.name`),
      description: t(`tools-data.${tool}.${i}.description`),
      href: t(`tools-data.${tool}.${i}.href`),
      icon: ChartPieIcon,
    });
  }

  return (
    <div>
        <p className="font-bold text-indigo-600">{title}</p>
      <div className="mt-2 space-y-2">
        {tools.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeBar}
            className="block rounded-lg py-2 pl-6 pr-3 text-sm text-gray-700 hover:bg-gray-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
