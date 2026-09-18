import { ITEMS } from "@/constants/items";
import Link from "next/link";

export default function ItemsPage() {
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
        {ITEMS.map((item) => {
          return (
            <Link href={`/items/${item.id}`}>
              <li key={item.id} style={{ display: "flex", gap: "10px" }}>
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
