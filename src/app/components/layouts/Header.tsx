import Link from "next/link";

export default function Header() {
    return (
        <header>
            <nav style={{display:'flex', gap:'16px', paddingLeft:'10px'}}>
                <div>GNB</div>
                <Link href="/items">Items</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    )
}