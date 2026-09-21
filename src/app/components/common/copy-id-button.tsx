"use client";

import { useState } from "react";

type CopyIdButtonProps = {
  id: string;
};

export default function CopyIdButton({ id }: CopyIdButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(String(id));
    setIsCopied(true);
  }

  setTimeout(() => {
    setIsCopied(false);
  }, 2000);

  return (
    <div>
      <button onClick={handleClick} className="border border-black px-1.5 py-1">
        ID 복사
      </button>
      {isCopied && <span className="ml-2">복사됨!</span>}
    </div>
  );
}
