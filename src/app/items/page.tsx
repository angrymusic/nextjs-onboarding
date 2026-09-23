import CreateItemForm from "../components/items/create-item-form";
import ItemFilterBar from "../components/items/item-filter-bar";
import ItemList from "../components/items/item-list";

export default function ItemsPage() {
  return (
    <div className="ml-2.5">
      <ItemFilterBar />
      <CreateItemForm />
      <ItemList />
    </div>
  );
}
