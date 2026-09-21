import "server-only";
// 과제용 인메모리 mock DB.
// 서버 재시작 시 초기화된다 — 과제 목적상 그걸로 충분.
export type Item = {
  id: number;
  name: string;
  category: "server" | "client" | "shared";
  price: number;
  createdAt: string;
};

let seq = 21;

const items: Item[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `아이템 ${i + 1}`,
  category: (["server", "client", "shared"] as const)[i % 3],
  price: (i + 1) * 1000,
  createdAt: new Date(Date.now() - i * 86400_000).toISOString(),
}));

// 로딩/에러 상태 UI를 눈으로 확인할 수 있게 인위적 지연
export const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const db = {
  list(opts?: {
    page?: number;
    pageSize?: number;
    sort?: keyof Item;
    desc?: boolean;
  }) {
    const { page = 1, pageSize = 10, sort, desc = false } = opts ?? {};
    const rows = [...items];
    if (sort) {
      rows.sort((a, b) => (a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0));
      if (desc) rows.reverse();
    }
    const start = (page - 1) * pageSize;
    return {
      rows: rows.slice(start, start + pageSize),
      total: items.length,
      page,
      pageSize,
    };
  },
  get(id: number) {
    return items.find((i) => i.id === id) ?? null;
  },
  create(data: Pick<Item, "name" | "category" | "price">) {
    const item: Item = {
      id: seq++,
      createdAt: new Date().toISOString(),
      ...data,
    };
    items.unshift(item);
    return item;
  },
  update(id: number, data: Partial<Pick<Item, "name" | "category" | "price">>) {
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    Object.assign(item, data);
    return item;
  },
  remove(id: number) {
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  },
};
