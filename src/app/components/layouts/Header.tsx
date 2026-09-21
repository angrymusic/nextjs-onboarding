import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex gap-4 pl-2.5">
        <div>GNB</div>
        <Link href="/items">Items</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
