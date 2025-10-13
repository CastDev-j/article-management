import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin-header";

export const metadata: Metadata = {
  title: "Panel de Administración | El Periódico",
  description: "Gestiona artículos y categorías",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
