import { Item } from "@/lib/db";
import { formatNumber } from "@/lib/utils";

type InfoSummaryProps = {
  item: Item;
};
export default function InfoSummary({ item }: InfoSummaryProps) {
  return (
    <div>
      <div>{item?.name}</div>
      <div>
        {item?.category} /{formatNumber(item?.price)}원
      </div>
    </div>
  );
}
