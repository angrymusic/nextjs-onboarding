"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function getSafeReturnPath(value: FormDataEntryValue | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return "/items";
  }

  return value;
}

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  if (!username || username.length > 50) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  cookieStore.set("session", username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect(getSafeReturnPath(formData.get("from")));
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/login");
}
