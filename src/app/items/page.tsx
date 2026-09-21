import { db, delay } from "@/lib/db";
import Link from "next/link";

export default async function ItemsPage() {
  // 로딩 페이지 확인 완료.
  // await delay(1000);
  const { rows } = db.list();

  return (
    <div className="ml-2.5">
      <h1 className="pb-2.5">아이템 목록</h1>
      <ul className="flex flex-col gap-2.5">
        {rows.map((item) => {
          return (
            <Link key={item.id} href={`/items/${item.id}`}>
              <li className="flex gap-2.5">
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>{item.price}원</span>
                <span> → </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
