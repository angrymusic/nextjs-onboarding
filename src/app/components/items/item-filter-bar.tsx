import { ItemFilterState } from "@/stores/item-filter";

type ItemFilterBarProps = {
  category: ItemFilterState["category"];
  keyword: string;
  setCategory: (category: ItemFilterState["category"]) => void;
  setKeyword: (keyword: string) => void;
};

const categories: ItemFilterState["category"][] = [
  "all",
  "server",
  "client",
  "shared",
];

export default function ItemFilterBar({
  category,
  keyword,
  setCategory,
  setKeyword,
}: ItemFilterBarProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-1.5">
        {categories.map((item) => {
          const isActive = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded border px-2.5 py-1.5 ${
                isActive ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {item === "all" ? "전체" : item}
            </button>
          );
        })}
      </div>
      
      <input
        type="search"
        value={keyword}
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
        placeholder="검색어 입력"
        aria-label="아이템 검색"
        className="rounded border px-2.5 py-1.5"
      />
    </div>
  );
}
