import { Item } from "@/lib/db";
import { formatDate, formatNumber } from "@/lib/utils";

type InfoProps = {
  item: Item;
};
export default function Info({ item }: InfoProps) {
  return (
    <div>
      <div>
        <span>카테고리: </span>
        {item?.category}
      </div>
      <div>
        <span>가격: </span>
        {formatNumber(item?.price)}원
      </div>
      <div>
        <span>등록일: </span>
        {formatDate(item?.createdAt)}
      </div>
    </div>
  );
}
