import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { upperFirst, sliceWords } from "@/utils";
import { Iproducts } from "@/types";
const Category: NextPage<Iproducts> = ({ data }) => {
  if (!data) {
    return <p>An error occured</p>;
  }
  return (
    <div className="grid mt-2 sm:grid-cols-4 gap-4 max-w-screen-2xl justify-center px-4">
      {data?.length > 0 &&
        data?.map((item, index) => {
          return (
            <div
              key={index}
              className="relative border py-4 block overflow-hidden group rounded-xl"
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
                className="object-contain w-full h-36 transition duration-500 group-hover:scale-105 sm:h-72"
              />
              <div className="relative p-6 bg-white border-gray-100">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                  {upperFirst(item.category)}
                </span>
                <span className="flex my-3">
                  {item?.rating.rate &&
                    [...Array(Math.ceil(item?.rating.rate))].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </span>
                <h3 className="mt-4 text-sm font-medium text-gray-900">
                  {sliceWords(item.title, 5)}
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

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/categories`
  );
  let paths = data.map((item: string) => {
    return { params: { category: item } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/category/${params?.category}`
  );
  return {
    props: { data },
  };
};
