"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { IMAGES } from "../../../../share/assets";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { name: "Orders", href: "/orders", current: false },
  { name: "Earnings", href: "/earnings", current: false },
];

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

interface FreelancerNavbarProps {
  onSignOut: () => Promise<void>;
}

export default function FreelancerNavbar({ onSignOut }: FreelancerNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleMessage = async () => {
    if (pathname !== "/realTimeChat") {
      router.push("/realTimeChat");
    }
  };

  const dummyNotifications = [
    "New message from Ahmed Younas",
    "New message from Ahmed Younas",
    "New message from Ahmed Younas",
    "Your project proposal has been submitted",
    "New message in Discussion",
    "New message in Discussion",
    "New message in Discussion",
    "New message in Discussion",
    "New message in Discussion",
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-primary-900 fixed top-0 left-0 right-0 z-10"
    >
      <div className="mx-auto max-w-[90%] px-2 lg:px-6 xl:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center lg:hidden">
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
          <div className="flex flex-1 items-center space-x-6">
            <div className="flex flex-shrink-0 items-center">
              <Image alt="GiGo." src={IMAGES.gigo} className="h-8 w-auto" />
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
          <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative">
              <MenuButton className="relative bg-primary-900 px-2 text-gray-200 hover:text-white">
                <span className="sr-only">View notifications</span>
                <FaBell aria-hidden="true" className="h-6 w-6" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-64 max-h-80 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="py-1">
                  {dummyNotifications.map((notification, index) => (
                    <MenuItem key={index}>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active ? "bg-primary-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {notification}
                        </div>
                      )}
                    </MenuItem>
                  ))}
                  {dummyNotifications.length === 0 && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </MenuItems>
            </Menu>
            <button
              type="button"
              className="relative bg-primary-900 px-2 text-gray-200 hover:text-white"
              onClick={handleMessage}
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <FaEnvelope aria-hidden="true" className="h-6 w-6" />
            </button>
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-primary-800 text-sm">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <Image
                    alt=""
                    src={IMAGES.profile}
                    className="h-10 w-10 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-primary-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    href="/profile/freelancer"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary-100"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="/paymentMethod"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary-100"
                  >
                    Payment Method
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={onSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary-100"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
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
