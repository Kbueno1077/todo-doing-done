"use client";
import TicketsDashboard from "@/sections/TicketsDashboard/TicketsDashboard";

export default async function DemoPage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <main className="flex-1 flex flex-col gap-6 px-6 py-6">
        <TicketsDashboard />
      </main>
    </div>
  );
}
