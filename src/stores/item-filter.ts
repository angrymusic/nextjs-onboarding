import { create } from "zustand";
export type ItemFilterState = {
  category: "all" | "server" | "client" | "shared";
  keyword: string;
  setCategory: (c: ItemFilterState["category"]) => void;
  setKeyword: (k: string) => void;
};

export const useItemFilter = create<ItemFilterState>()((set) => ({
  category: "all",
  keyword: "",
  setCategory: (category) => {
    set({ category });
  },
  setKeyword: (keyword) => {
    set({ keyword });
  },
}));
