import { AdminAuthSessionProvider } from "@/components/auth/AdminAuthSessionProvider";
import AdminClientLayout from "@/components/auth/AdminClientLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthSessionProvider>
      <AdminClientLayout>{children}</AdminClientLayout>
    </AdminAuthSessionProvider>
  );
}
