import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  const menu = useRef<HTMLInputElement | null>(null);
  const searchbar = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const toogleMenu = (): void => {
    if (menu.current) {
      menu.current.classList.toggle("hidden");
    }
  };
  const hideNavbar = (): void => {
    if (menu.current) {
      menu.current.classList.add("hidden");
    }
    if (searchbar.current) {
      searchbar.current.classList.add("hidden");
    }
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", hideNavbar);
    return () => {
      router.events.off("routeChangeComplete", hideNavbar);
    };
  }, [router.events]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="self-center text-xl font-bold whitespace-nowrap">
            Myntra
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={toogleMenu}
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          ref={menu}
          className={`items-center transition-all  hidden justify-between w-full md:flex md:w-auto md:order-1 `}
          id="navbar-search"
        >
          <ul className="flex flex-col tracking-wider p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-bold md:border-0 md:bg-white">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 ${
                  router.pathname == "/"
                    ? "bg-yellow-600 text-white md:text-yellow-600"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/category/jewelery"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "jewelery"
                    ? "bg-yellow-600 text-white md:text-yellow-600"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
                aria-current="page"
              >
                Jewelery
              </Link>
            </li>
            <li>
              <Link
                href="/category/electronics"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "electronics"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white"
                } rounded md:bg-transparent md:p-0`}
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href="/category/men's clothing"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "men's clothing"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                Men{"'"}s-clothing
              </Link>
            </li>
            <li>
              <Link
                href="/category/women's clothing"
                className={`block py-2 pl-3 pr-4 ${
                  router.query.category === "women's clothing"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                Women{"'"}s-clothing
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className={`block py-2 pl-3 pr-4 ${
                  router.pathname == "/cart"
                    ? " md:text-yellow-600 bg-yellow-600 text-white"
                    : "text-gray-700 bg-white "
                } rounded md:bg-transparent md:p-0`}
              >
                <AiOutlineShoppingCart className="text-2xl font-extrabold" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
