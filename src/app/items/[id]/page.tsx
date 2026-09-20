import CopyIdButton from "@/app/components/common/copy-id-button";
import DetailTabs from "@/app/components/common/detail-tabs";
import Info from "@/app/components/items/info";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemPage({ params }: Props) {
  const { id } = await params;
  const item = db.get(Number(id));

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
      <CopyIdButton id={id} />
      <DetailTabs>
        <Info item={item} />
        <p>메모가 없습니다.</p>
      </DetailTabs>
    </div>
  );
}
