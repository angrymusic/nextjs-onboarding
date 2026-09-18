import { ITEMS } from "@/constants/items";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function itemPage({ params }: Props) {
  const { id } = await params;
  const item = ITEMS.find((item) => item.id === Number(id));

  if (!item) {
    notFound();
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "10px",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <Link href={"/items"}>← 목록으로</Link>
      </div>
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
