"use client";

import { Button } from "@/components/ui/button";
import { Children, ReactNode, useState } from "react";

type DetailTabsProps = {
  children: ReactNode;
};

export default function DetailTabs({ children }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"info" | "memo">("info");
  const [info, memo] = Children.toArray(children);
  return (
    <div className="border px-2 py-1">
      <div>
        <Button
          className="border px-2 py-1"
          onClick={() => setActiveTab("info")}
        >
          정보
        </Button>
        <Button
          className="border px-2 py-1"
          onClick={() => setActiveTab("memo")}
        >
          메모
        </Button>
      </div>
      <div>{activeTab === "info" ? info : memo}</div>
    </div>
  );
}
