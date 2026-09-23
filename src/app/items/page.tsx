import CreateItemDialog from "../components/items/create-item-dialog";
import ItemFilterBar from "../components/items/item-filter-bar";
import ItemList from "../components/items/item-list";

export default function ItemsPage() {
  return (
    <div className="ml-2.5">
      <ItemFilterBar />
      <ItemList />
    </div>
  );
}
