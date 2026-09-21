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
      <div className="border px-2 py-1">
        <button
          className="border px-2 py-1"
          onClick={() => setActiveTab("info")}
        >
          정보
        </button>
        <button
          className="border px-2 py-1"
          onClick={() => setActiveTab("memo")}
        >
          메모
        </button>
      </div>
      <div>{activeTab === "info" ? info : memo}</div>
    </div>
  );
}
