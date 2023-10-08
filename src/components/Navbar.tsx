"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import MyThemeContext from "./store/ThemeContext";

const products = [
  {
    name: "Author Guidelines",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Research Areas",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Correction Policy",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Plagiarism Policy",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ token: "null" });
  const [dark, setDark] = useState(false);
  const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
    useContext(MyThemeContext);
  // console.log()
  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler();
    const theme = JSON.parse(localStorage.getItem("isDarkTheme")!);
    setDark(theme);
    console.log(dark);
  }
  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("token");
  }
  useEffect(() => {
    // localStorage.setItem("token","");
    // setDark(themeCtx.isDarkMode!);
    const theme = JSON.parse(localStorage.getItem("isDarkTheme")!);
    setDark(theme);
    // console.log(dark);
    if (!isLocalStorageEmpty()) {
      const token = localStorage.getItem("token")!;
      // console.log(token);
      setUser({ token: token });
      // console.log(typeof user.token);
    }
  }, []);
  // console.log(user.token);
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      console.log(res.data);
      if (res.data.success) {
        localStorage.setItem("token", "");
        setUser({ token: "null" });
        toast.success("Logged Out!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // toastId: "info1",
        });
      } else {
        throw new Error("Not able to log out");
      }
    } catch (error) {
      toast.error("Some error occurred!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(error);
    }
  };
  return (
    <header className="  w-screen z-10 bg-white dark:bg-slate-800 dark:text-white ">
      <nav
        className="mx-auto  flex container items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              className=" w-"
              src="/1.jpg"
              alt="logo"
              width={200}
              height={100}
            />
          </a>
        </div>
        <div className="flex lg:hidden mr-4 ">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
          </button>
          <div
            className=" ml-5 cursor-pointer p-2 lg:hidden  text-gray-600 hover:text-blue-500"
            onClick={toggleThemeHandler}
          >
            {!dark ? (
              <MoonIcon className="h-6 w-6 " aria-hidden="true" />
            ) : (
              <SunIcon
                className="h-6 w-6 text-white hover:text-blue-500"
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-8 ">
          <a
            href="#"
            className="dark:text-white text-base dark:font-normal font-semibold leading-6 text-gray-900"
          >
            Home
          </a>
          <Popover className="relative">
            <Popover.Button className="dark:text-white flex items-center gap-x-1 text-base dark:font-normal font-semibold leading-6 text-gray-900">
              Author Guidelines
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 dark:bg-gray-900 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center  gap-x-6 rounded-lg p-4 text-sm leading-5 dark:hover:bg-gray-700 hover:bg-gray-50"
                    >
                      {/* <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div> */}
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block dark:text-white dark:font-normal font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div> */}
              </Popover.Panel>
            </Transition>
          </Popover>
          {/* 
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Aim & Scope
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Editorial Board
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Peer Review Process
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Reviewer Guidelines
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Ethics & Malpractices
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Contact Us
          </a> */}
        </Popover.Group>
        {user.token !== "null" && user.token ? (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
              <div className=" self-center mx-5 relative w-10 h-10 overflow-hidden bg-black rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <button
                onClick={onLogout}
                className="dark:text-white text-base font-semibold leading-6 text-black border-blue-500 border-2 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full"
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
            <button
              type="button"
              className="py-1 sm:py-2.5 px-2 sm:px-5 mr-2 bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black rounded"
              onClick={toggleThemeHandler}
            >
              Toggle Theme
            </button>
          </>
        ) : (
          <>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
              <Link
                href="/signup"
                className="dark:text-white text-base dark:font-normal font-semibold leading-6 text-black border-blue-500 border-2 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full"
              >
                Signup <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="hidden lg:flex  lg:justify-end ml-2  ">
              <Link
                href="/login"
                className="text-base font-semibold dark:font-normal leading-6 text-white bg-blue-500 border-2 border-blue-500 hover:border-2 hover:border-blue-500 hover:bg-transparent hover:text-black py-2 px-4 rounded-full"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div
              className="ml-2 cursor-pointer p-2 hidden lg:block text-gray-600 hover:text-blue-500"
              onClick={toggleThemeHandler}
            >
              {!dark ? (
                <MoonIcon className="h-6 w-6 " aria-hidden="true" />
              ) : (
                <SunIcon
                  className="h-6 w-6 text-white hover:text-blue-500"
                  aria-hidden="true"
                />
              )}
            </div>
          </>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <Transition
          show={mobileMenuOpen}
          as="div"
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto dark:bg-gray-900 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  alt="logo"
                  src="/img/top-logo.png"
                  height={8}
                  width={200}
                ></Image>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }: any) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-500"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products].map((item) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>

                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Aim & Scope
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Editorial Board
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Peer Review Process
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Reviewer Guidelines
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Ethics & Malpractices
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contact Us
                  </a>
                </div>
                <div className="py-6">
                  {user.token !== "null" ? (
                    <button
                      onClick={onLogout}
                      className="-mx-3 w-screen text-left block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        href="/login"
                      >
                        Login
                      </Link>
                      <Link
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        href="/signup"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </header>
  );
}
