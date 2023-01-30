import { persist } from "zustand/middleware";
import { IProductitem } from "./../types/index";
import { create } from "zustand";

interface IuseCard {
  items: IProductitem[];
  addToCard: (item: IProductitem) => void;
  removeFromCard: (id?: number) => void;
  removeAll: () => void;
}

export const useCard = create<IuseCard>()(
  persist(
    (set, get) => ({
      items: [],
      addToCard: (item: IProductitem) => {
        const isExist = get().items.find((product) => product.id === item.id);
        const index = get().items.findIndex(
          (product) => product.id === item.id
        );
        if (isExist) {
          let incQuantity = get().items[index];
          incQuantity.quantity++;
          set((state) => ({
            items: [...state.items],
          }));
        } else {
          set((state) => ({
            items: [...state.items, item],
          }));
        }
      },
      removeFromCard: (id: number | undefined) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeAll: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: "cartItems",
      getStorage: () => localStorage,
    }
  )
);
