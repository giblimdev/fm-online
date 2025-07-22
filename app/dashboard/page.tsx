// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Accès correct aux données avec Better Auth
  if (session.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/auth/signin");
    return null;
  }

  const user = session.data.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <nav className="bg-white shadow border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Dashboard</h1>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bonjour, {user.name}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenue dans votre espace
          </h2>
          <p className="text-gray-600">Voici vos informations personnelles</p>
        </div>

        {/* Cartes d'informations */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Profil</h3>
            <p className="text-gray-600">Nom: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">ID: {user.id}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Statut</h3>
            <p className="text-green-600 font-medium">✓ Connecté</p>
            <p className="text-gray-600">Session active</p>
            <p className="text-gray-600">
              Email vérifié: {user.emailVerified ? "✓" : "✗"}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Actions</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 mb-2">
              Modifier profil
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mb-2">
              Paramètres
            </button>
          </div>
        </div>

        {/* Zone de contenu principal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Informations de session
          </h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Session ID:</strong> {session.data.session?.id}
            </p>
            <p className="text-gray-600">
              <strong>Créé le:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString("fr-FR")}
            </p>
            <p className="text-gray-600">
              <strong>Dernière mise à jour:</strong>{" "}
              {new Date(user.updatedAt).toLocaleDateString("fr-FR")}
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-4">
              <p className="text-gray-500">
                Ajoutez ici le contenu spécifique à votre application
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
