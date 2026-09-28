"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Children, ReactNode } from "react";

type DetailTabsProps = {
  children: ReactNode;
};

export default function DetailTabs({ children }: DetailTabsProps) {
  const [info, memo] = Children.toArray(children);
  return (
    <Tabs defaultValue="info" className="border px-2 py-1">
      <TabsList>
        <TabsTrigger value="info">정보</TabsTrigger>
        <TabsTrigger value="memo">메모</TabsTrigger>
      </TabsList>
      <TabsContent value="info">{info}</TabsContent>
      <TabsContent value="memo">{memo}</TabsContent>
    </Tabs>
  );
}
