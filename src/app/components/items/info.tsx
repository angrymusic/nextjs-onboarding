import { Item } from "@/lib/db";

type InfoProps = {
  item: Item;
};
export default function Info({ item }: InfoProps) {
  return (
    <div>
      <div>{item?.name}</div>
      <div>
        <span>카테고리: </span>
        {item?.category}
      </div>
      <div>
        <span>가격: </span>
        {item?.price}
      </div>
    </div>
  );
}
