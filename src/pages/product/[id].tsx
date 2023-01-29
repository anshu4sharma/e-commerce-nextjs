import Loader from "@/components/Loader";
import { IProductitem, Iproduct } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Suspense, useState } from "react";
import { useQuery } from "react-query";
import { sliceWords } from "@/utils";
import { useCard } from "@/store/useCard";
import toast from "react-hot-toast";
const Product = () => {
  const bears = useCard((state) => state.items);
  const addToCard = useCard((state) => state.addToCard);
  const addItem = (arg: IProductitem) => {
    try {
      toast.success("Added to card !");
    } catch (error) {
      toast.error("An error occured");
    }
    addToCard(arg);
  };
  const { query } = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("1");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const fetchProduct = async (): Promise<Iproduct> => {
    const data = await axios.get<Iproduct>(
      `https://fakestoreapi.com/products/${query.id}`
    );
    return data.data;
  };
  const { data, isLoading, error } = useQuery(
    ["product", query.id],
    fetchProduct,
    {
      enabled: !!query.id,
    }
  );
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <Suspense fallback={<p>loading</p>}>
      <section>
        <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              {data?.image && (
                <Image
                  width={500}
                  height={500}
                  alt="Les Paul"
                  src={data?.image}
                  className="object-contain w-full aspect-square rounded-xl"
                />
              )}
            </div>
            <div className="sticky top-0">
              <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                Pre Order
              </strong>
              <div className="flex justify-between mt-8">
                <div className="max-w-[35ch]">
                  <h1 className="text-2xl font-bold">{data?.title}</h1>
                  <p className="mt-0.5 text-sm">Highest Rated Product</p>
                  <div className="mt-2 -ml-0.5 flex">
                    {data?.rating.rate &&
                      [...Array(Math.ceil(data?.rating.rate))].map(
                        (_, index) => (
                          <svg
                            key={index}
                            className="w-5 h-5 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )
                      )}
                  </div>
                  <p className="text-lg font-bold my-2">$ {data?.price}</p>
                </div>
              </div>
              <details className="group relative mt-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="block">
                  <div>
                    <div className="prose max-w-none group-open:hidden">
                      <p>
                        {data?.description && sliceWords(data?.description, 12)}
                      </p>
                    </div>
                    <span className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0">
                      Read More
                    </span>
                  </div>
                </summary>
                <div className="pb-6 prose max-w-none">{data?.description}</div>
              </details>
              <form className="mt-8">
                <div className="flex mt-8 flex-col justify-center gap-4 items-start">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select an option
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    onChange={handleOptionChange}
                    value={selectedOption}
                  >
                    {[...Array(10)].map((_, option) => {
                      return (
                        <option key={option} value={option + 1}>
                          {option + 1}
                        </option>
                      );
                    })}
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        title: data?.title,
                        category: data?.category,
                        price: data?.price,
                        id: data?.id,
                        image: data?.image,
                        quantity: selectedOption,
                      })
                    }
                    className="block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
                  >
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Product;
