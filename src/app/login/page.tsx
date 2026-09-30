import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from = "/items" } = await searchParams;

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">로그인</h1>
      <form action={login} className="flex flex-col gap-5">
        <input type="hidden" name="from" value={from} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            maxLength={50}
            required
          />
        </div>
        <Button type="submit" variant="brand">
          로그인
        </Button>
      </form>
    </main>
  );
}
