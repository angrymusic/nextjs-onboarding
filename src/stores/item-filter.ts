export type ItemFilterState = {
  category: "all" | "server" | "client" | "shared";
  keyword: string;
  setCategory: (c: ItemFilterState["category"]) => void;
  setKeyword: (k: string) => void;
};
