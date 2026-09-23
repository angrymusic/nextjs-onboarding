"use client";

import CreateItemForm from "./create-item-form";
import ItemFilterBar from "./item-filter-bar";
import ItemList from "./item-list";

export default function TempParent() {
  return (
    <div className="ml-2.5">
      <ItemFilterBar />
      <CreateItemForm />
      <ItemList />
    </div>
  );
}
