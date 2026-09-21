export { cn } from "cn";

export function formatDate(dateString: string) {
  return dateString.slice(0, 10);
}

export function formatNumber(value: number) {
  return value.toLocaleString("ko-KR");
}
