import Modal from "@/app/components/common/modal";
import InfoSummary from "@/app/components/items/info-summary";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailModal({ params }: Props) {
  const { id } = await params;
  const item = db.get(Number(id));

  if (!item) {
    notFound();
  }

  return (
    <Modal>
      <InfoSummary item={item} />
      <a href={`/items/${id}`} rel="noopener noreferrer">
        [풀페이지로 보기]
      </a>
    </Modal>
  );
}
