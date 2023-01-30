import Image from "next/image";
import { MdOutlineDelete, MdOutlineRemoveShoppingCart } from "react-icons/md";
import React, { useEffect, useMemo, useState } from "react";
import { useCard } from "@/store/useCard";
import { sliceWords } from "@/utils";
import { IProductitem } from "@/types";
const Cart = () => {
  const [cartItem, setCartItem] = useState<IProductitem[]>([]);
  const items = useCard((state) => state.items);
  const removeFromCard = useCard((state) => state.removeFromCard);
  const removeAll = useCard((state) => state.removeAll);
  const Totalprice = useMemo(() => {
    let totalAmount = cartItem.reduce((total, currentValue) => {
      if (!currentValue?.price) {
        return total;
      }
      return (total + currentValue.price) * currentValue.quantity;
    }, 0);
    return totalAmount;
  }, [cartItem]);

  useEffect(() => {
    setCartItem(items);
  }, [items]);

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="text-center">
            <h1 className="text-xl font-bold tracking-wider text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>
          <div className="mt-8">
            <ul className="space-y-4">
              {cartItem.length > 0 ? (
                cartItem.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-start border  py-4 rounded-lg"
                    >
                      {item.image && (
                        <Image
                          width={80}
                          height={80}
                          src={item?.image}
                          alt="item"
                          className="object-contain aspect-square rounded"
                        />
                      )}
                      <div className="text-sm ml-4">
                        <h3 className="text-gray-900 sm:hidden font-bold">
                          {item?.title && sliceWords(item?.title, 4)}
                        </h3>
                        <h3 className="text-gray-900 hidden sm:block font-bold">
                          {item?.title}
                        </h3>
                        <p className="my-2">Category: {item.category}</p>
                        <p className="my-2">Quantity : {item.quantity}</p>
                        <p className="my-2">
                          Price: {item.price} * {item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCard(item?.id)}
                          className="text-gray-600 mt-4 transition hover:text-red-600"
                        >
                          <span className="flex gap-2 items-center">
                            Remove item <MdOutlineDelete />
                          </span>
                        </button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p className="text-center flex-col items-center flex justify-center">
                  <span className="my-4">Empty Cart </span>
                  <MdOutlineRemoveShoppingCart className="text-2xl font-bold" />
                </p>
              )}
            </ul>
            {cartItem.length > 0 && (
              <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>$ {Totalprice}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <button
                      onClick={removeAll}
                      className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
