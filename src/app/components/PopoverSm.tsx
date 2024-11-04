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
    <>
      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
        {title}
        <ChevronDownIcon
          aria-hidden="true"
          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
        />
      </DisclosureButton>
      <DisclosurePanel className="mt-2 space-y-2">
        {tools.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeBar}
            className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
          >
            {item.name}
          </Link>
        ))}
      </DisclosurePanel>
    </>
  );
}
