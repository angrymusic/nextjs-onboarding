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
  );
}
function ItemKeywordInput() {
  const keyword = useItemFilter((state) => state.keyword);
  const setKeyword = useItemFilter((state) => state.setKeyword);
  return (
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
