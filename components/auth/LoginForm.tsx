// @/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
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
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Bon retour parmi nous
          </h1>
          <p className="text-slate-600 text-lg">Accédez à votre espace</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                placeholder="gilbert.gasquier@gasquier.fr"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Mot de passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError();
                  }}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="h-5 w-5" />
                  <span>Se connecter</span>
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="text-center">
              <p className="text-slate-600 font-medium">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/register"
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Créer un compte</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Besoin d'aide ?{" "}
            <Link
              href="/support"
              className="text-blue-600 hover:underline font-medium"
            >
              Contactez notre support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
