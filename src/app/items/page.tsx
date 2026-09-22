import CreateItemForm from "../components/items/create-item-form";
import ItemList from "../components/items/item-list";

export default function ItemsPage() {
  return (
    <div className="ml-2.5">
      <CreateItemForm />
      <ItemList />
    </div>
  );
}
