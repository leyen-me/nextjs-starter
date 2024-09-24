import { AdminProvider } from "@/components/auth/AdminProvider";
import { Layout } from "@/components/admin/Layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <Layout>{children}</Layout>
    </AdminProvider>
  );
}
