"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      {/* ↑ 딤: 화면 전체 덮기 + 반투명 검정 + 카드 중앙 정렬. 여기에 딤 클릭 닫기 */}
      <div
        className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="모달 닫기"
          className="absolute right-3 top-3 text-xl text-gray-500 hover:text-black"
          onClick={closeModal}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
