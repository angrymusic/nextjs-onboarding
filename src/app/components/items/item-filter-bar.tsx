"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemFilterState, useItemFilter } from "@/stores/item-filter";

const categories: ItemFilterState["category"][] = [
  "all",
  "server",
  "client",
  "shared",
];

function ItemCategoryTabs() {
  const category = useItemFilter((state) => state.category);
  const setCategory = useItemFilter((state) => state.setCategory);
  return (
    <div className="flex gap-1.5">
      {categories.map((item) => {
        const isActive = category === item;
        return (
          <Button key={item} type="button" onClick={() => setCategory(item)}>
            {item === "all" ? "전체" : item}
          </Button>
        );
      })}
    </div>
  );
}
function ItemKeywordInput() {
  const keyword = useItemFilter((state) => state.keyword);
  const setKeyword = useItemFilter((state) => state.setKeyword);
  return (
    <Input
      type="search"
      value={keyword}
      onChange={(event) => {
        setKeyword(event.target.value);
      }}
      placeholder="검색어 입력"
      aria-label="아이템 검색"
      className="rounded border px-2.5 py-1.5"
    />
  );
}
export default function ItemFilterBar() {
  return (
    <div className="flex items-center gap-2.5">
      <ItemCategoryTabs />
      <ItemKeywordInput />
    </div>
  );
}
