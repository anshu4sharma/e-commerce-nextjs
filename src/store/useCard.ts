import { IProductitem } from "./../types/index";
import { create } from "zustand";

interface IuseCard {
  items: IProductitem[];
  addToCard: (item: IProductitem) => void;
  removeFromCard: (id?: number) => void;
}

export const useCard = create<IuseCard>((set) => ({
  items: [],
  addToCard: (item: IProductitem) =>
    set((state) => ({ items: [...state.items, item] })),
  removeFromCard: (id?: number) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
