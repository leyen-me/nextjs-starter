import Link from "next/link"

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <h1>Home</h1>
      <Link href="/admin/dashboard" className="bg-blue-500 text-white p-2 rounded-md ml-4">Dashboard</Link>
    </main>
  );
}
