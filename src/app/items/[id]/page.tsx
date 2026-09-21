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
    <div className="flex flex-col ml-2.5">
      <div className="mb-2.5">
        <Link href={"/items"}>← 목록으로</Link>
      </div>
      <div className="flex gap-1 items-center">
        <div>{item?.name}</div>
        <CopyIdButton id={id} />
      </div>
      <DetailTabs>
        <Info item={item} />
        <p>메모가 없습니다.</p>
      </DetailTabs>
    </div>
  );
}
