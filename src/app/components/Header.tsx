"use client";
import { useTranslations } from "next-intl";
import PopoverLg from "./PopoverLg";
import PopoverSm from "./PopoverSm";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  PopoverGroup,
  //@ts-ignore
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Dropdow from "./Dropdow";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("Header");

  return (
    <header className="bg-white">
      {/* Desktop Bar */}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">DevKiit</span>
            <img alt="" src="/DevKiit.png" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* Ferramentas (title: Título, tool: Ferramenta, quantity: Quantidade de ferramentas) */}
          <PopoverLg title={t("tools-grup.text")} tool="text" quantity={4} />
          <PopoverLg
            title={t("tools-grup.design")}
            tool="design"
            quantity={1}
          />
          <PopoverLg title={t("tools-grup.dev")} tool="dev" quantity={2} />
          <PopoverLg title={t("tools-grup.time")} tool="time" quantity={1} />
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Dropdow />
        </div>
      </nav>

      {/* Mobile Bar */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/DevKiit.png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              <div className="flex justify-end"><Dropdow /></div>
                <Disclosure as="div" className="-mx-3">
                  {/* Ferramentas (title: Título, tool: Ferramenta, quantity: Quantidade de ferramentas) */}
                  <PopoverSm
                    tool="text"
                    title={t("tools-grup.text")}
                    quantity={4}
                    closeBar={() => setMobileMenuOpen(false)}
                  />
                  <PopoverSm
                    title={t("tools-grup.design")}
                    tool="design"
                    quantity={1}
                    closeBar={() => setMobileMenuOpen(false)}
                  />
                  <PopoverSm
                    title={t("tools-grup.dev")}
                    tool="dev"
                    quantity={2}
                    closeBar={() => setMobileMenuOpen(false)}
                  />
                  <PopoverSm
                    title={t("tools-grup.time")}
                    tool="time"
                    quantity={1}
                    closeBar={() => setMobileMenuOpen(false)}
                  />
                </Disclosure>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
