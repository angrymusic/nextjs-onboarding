"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateItemForm from "./create-item-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateItemDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" size="sm">
          + 새 아이템
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-4 text-lg font-semibold">
          새 아이템 추가
        </DialogTitle>
        <CreateItemForm
          onSuccess={() => {
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
