"use client";

import { Children, ReactNode, useState } from "react";

type DetailTabsProps = {
  children: ReactNode;
};

export default function DetailTabs({ children }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"info" | "memo">("info");
  const [info, memo] = Children.toArray(children);
  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{ border: "1px solid", padding: "5px" }}
          onClick={() => setActiveTab("info")}
        >
          정보
        </button>
        <button
          style={{ border: "1px solid", padding: "5px" }}
          onClick={() => setActiveTab("memo")}
        >
          메모
        </button>
      </div>
      <div>{activeTab === "info" ? info : memo}</div>
    </div>
  );
}
