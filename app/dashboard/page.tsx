// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span>Bonjour, {session?.user?.name}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-8">
            <h2 className="text-2xl font-bold mb-4">
              Bienvenue dans votre dashboard!
            </h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-2">
                Informations utilisateur
              </h3>
              <p>
                <strong>Nom:</strong> {session?.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {session?.user?.email}
              </p>
              <p>
                <strong>ID:</strong> {session?.user?.id}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
