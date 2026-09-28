"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type CopyIdButtonProps = {
  id: string;
};

export default function CopyIdButton({ id }: CopyIdButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(String(id));
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <div>
      <Button type="button" variant="outline" size="sm" onClick={handleClick}>
        ID 복사
      </Button>
      {isCopied && <span className="ml-2">복사됨!</span>}
    </div>
  );
}
