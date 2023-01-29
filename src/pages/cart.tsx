import Image from "next/image";
import { MdOutlineDelete, MdOutlineRemoveShoppingCart } from "react-icons/md";
import React, { useMemo } from "react";
import { useCard } from "@/store/useCard";
const Cart = () => {
  const items = useCard((state) => state.items);
  console.log(items);
  const removeFromCard = useCard((state) => state.removeFromCard);
  const Totalprice = useMemo(() => {
    let totalAmount = items.reduce((total, currentValue) => {
      if (!currentValue?.price) {
        return total;
      }
      return total + currentValue.price;
    }, 0);
    return totalAmount;
  }, [items]);
  console.log(Totalprice, "calculatePrice");

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
              {items.length > 0 ? (
                items.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      {item.image && (
                        <Image
                          width={400}
                          height={400}
                          src={item?.image}
                          alt="item"
                          className="object-contain aspect-square w-16 h-16 rounded"
                        />
                      )}
                      <div className="text-sm ml-4">
                        <h3 className="text-gray-900">{item.title}</h3>
                        <p className="inline">Category: {item.category}</p>
                      </div>

                      <div className="flex items-center justify-end flex-1 gap-2">
                        <form>
                          <label htmlFor="Line2Qty" className="sr-only">
                            Quantity
                          </label>
                          <p>{item.quantity}</p>
                        </form>
                        <button
                          onClick={() => removeFromCard(item?.id)}
                          className="text-gray-600 transition hover:text-red-600"
                        >
                          <span className="sr-only">Remove item</span>
                          <MdOutlineDelete />
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
            {items.length > 0 && (
              <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>$ {Totalprice}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
                    >
                      Checkout
                    </a>
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
