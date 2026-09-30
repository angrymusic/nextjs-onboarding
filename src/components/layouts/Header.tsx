import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/login/actions";

export default async function Header() {
  const session = (await cookies()).get("session")?.value;

  return (
    <header>
      <nav className="flex items-center gap-4 pl-2.5">
        <div>GNB</div>
        <Link href="/items">Items</Link>
        <Link href="/about">About</Link>
        <Link href="/feedback">Feedback</Link>
        <div className="ml-auto flex items-center gap-3 pr-2.5">
          {session ? (
            <>
              <span>{session}님</span>
              <form action={logout}>
                <button type="submit">로그아웃</button>
              </form>
            </>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
