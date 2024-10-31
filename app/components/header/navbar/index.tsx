"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { IMAGES } from "../../../../share/assets";
import Image from "next/image";

const navigation = [
  // { name: "Become a Seller", href: "/auth/signup", current: false },
  { name: "Signup", href: "/auth/signup", current: false },
  { name: "Login", href: "/auth/signin", current: false },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-primary-900 fixed top-0 left-0 right-0 z-10"
    >
      <div className="mx-auto max-w-[90%] px-2 lg:px-6 xl:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-primary-400 hover:bg-primary-700 hover:text-white">
              <CiMenuBurger
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <RxCross1
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-shrink-0 items-center">
            <Image alt="GiGO." src={IMAGES.gigo} className="h-8 w-auto" />
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="w-[70%] hidden lg:ml-6 lg:block"></div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-2 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-primary-900 text-white"
                        : "text-primary-50 hover:bg-primary-700 hover:text-white transition-colors duration-300 ease-in-out",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-primary-900 text-white"
                  : "text-primary-50 hover:bg-primary-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
