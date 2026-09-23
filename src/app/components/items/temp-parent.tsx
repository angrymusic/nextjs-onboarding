"use client";

import { ItemFilterState } from "@/stores/item-filter";
import { useState } from "react";
import CreateItemForm from "./create-item-form";
import ItemList from "./item-list";
import ItemFilterBar from "./item-filter-bar";

export default function TempParent() {
  const [category, setCategory] = useState<ItemFilterState["category"]>("all");
  const [keyword, setKeyword] = useState<ItemFilterState["keyword"]>("");

  return (
    <div className="ml-2.5">
      <ItemFilterBar
        category={category}
        keyword={keyword}
        setCategory={setCategory}
        setKeyword={setKeyword}
      />
      <CreateItemForm />
      <ItemList category={category} keyword={keyword} />
    </div>
  );
}
