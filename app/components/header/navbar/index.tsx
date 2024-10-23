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
import InputField from "../../input";
import { useState } from "react";
import Button from "../../button";
import { IMAGES } from "../../../../share/assets";
import Image from "next/image";

const navigation = [
  { name: "Become a Seller", href: "/auth/signup", current: false },
  { name: "Signup", href: "/auth/signup", current: false },
  { name: "Login", href: "/auth/signin", current: false },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setSearch("");
  };
  return (
    <Disclosure as="nav" className="bg-primary-900 fixed top-0 left-0 right-0 z-10">
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
            <div className="w-[70%] hidden lg:ml-6 lg:block">
              <div className="flex">
                <InputField
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[80%] p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent text-black placeholder:text-sm"
                />
                <Button
                  text="Search"
                  onClick={handleSearch}
                  className="bg-secondary-600 text-white py-2 px-4 w-[20%] rounded-r-lg hover:bg-secondary-700 transition-colors duration-300 ease-in-out"
                />
              </div>
            </div>
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
          <div className="flex px-2">
            <InputField
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[80%] p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-black placeholder:text-sm"
            />
            <Button
              text="Search"
              onClick={handleSearch}
              className="bg-secondary-700 text-white py-2 px-2 w-[20%] rounded-r-lg hover:bg-secondary-600 transition-colors duration-300 ease-in-out"
            />
          </div>
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
