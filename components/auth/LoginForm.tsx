// @/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        setError(
          error.message || "Une erreur est survenue lors de la connexion"
        );
      } else {
        router.push("/auth/welcome");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Une erreur inattendue est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Accédez à votre espace
          </h1>
          <p className="text-blue-100 text-lg">Connectez-vous pour continuer</p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={clearError}
                required
                placeholder="votre@email.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-slate-900 placeholder-slate-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={clearError}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-slate-900 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors p-1"
                  tabIndex={-1}
                  aria-label="Afficher/masquer le mot de passe"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-3 block text-sm text-slate-700 select-none cursor-pointer"
              >
                Se souvenir de moi
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="text-center text-sm text-slate-600">
              Pas encore de compte ?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Créer un compte
              </Link>
            </div>

            <div className="text-center text-xs text-slate-500 mt-4">
              Besoin d'aide ?{" "}
              <a
                href="mailto:support@fm-online.com"
                className="text-blue-600 hover:text-blue-700 underline transition-colors"
              >
                Contactez notre support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
