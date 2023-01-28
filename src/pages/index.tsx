import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { upperFirst, sliceWords } from "@/utils";
import { Iproducts } from "@/types";
const Home: NextPage<Iproducts> = ({ data }) => {
  return (
    <div className="grid  sm:grid-cols-4 gap-4 max-w-screen-2xl justify-center px-4">
      {data.length > 0 &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className="relative block overflow-hidden group rounded-xl"
            >
              <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                <span className="sr-only">Wishlist</span>
                <AiOutlineHeart />
              </button>
              <Image
                src={item.image}
                alt="asdas"
                width={300}
                height={300}
                className="object-cover w-full h-36 transition duration-500 group-hover:scale-105 sm:h-72"
              />
              <div className="relative p-6 bg-white border border-gray-100">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                  {upperFirst(item.category)}
                </span>
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  {sliceWords(item.title,5)}
                </h3>
                <p className="mt-1.5 text-sm text-gray-700">${item.price}</p>
                <div className="mt-4">
                  <Link
                    href={`/product/${item.id}`}
                    className="block w-full p-2 text-center text-sm font-medium transition bg-yellow-400 rounded hover:scale-105"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return {
    props: { data },
    revalidate: 120,
  };
};
