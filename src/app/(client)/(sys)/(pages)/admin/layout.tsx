import { AdminProvider } from "../../components/AdminProvider";
import { Layout } from "../../components/layout/Layout";

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
