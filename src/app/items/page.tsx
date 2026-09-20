import { db, delay } from "@/lib/db";
import Link from "next/link";

export default async function ItemsPage() {
  // 로딩 페이지 확인 완료.
  // await delay(1000);
  const { rows } = db.list();

  return (
    <div
      style={{
        marginLeft: "10px",
      }}
    >
      <h1 style={{ paddingBottom: "12px" }}>아이템 목록</h1>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {rows.map((item) => {
          return (
            <Link key={item.id} href={`/items/${item.id}`}>
              <li style={{ display: "flex", gap: "10px" }}>
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
