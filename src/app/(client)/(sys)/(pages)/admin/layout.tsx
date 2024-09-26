import { Layout } from "@/components/admin/Layout";
import { AdminProvider } from "../../components/AdminProvider";

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
