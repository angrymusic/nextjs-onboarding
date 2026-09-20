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
      <button
        onClick={handleClick}
        style={{ border: "1px solid", padding: "5px" }}
      >
        ID 복사
      </button>
      {isCopied && <span style={{ marginLeft: "10px" }}>복사됨!</span>}
    </div>
  );
}
