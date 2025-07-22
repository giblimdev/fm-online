// @/components/auth/SignUpForm.tsx
"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Upload, ArrowLeft, User } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false); // Nouvelle state pour la case à cocher
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation des conditions d'utilisation
    if (!acceptTerms) {
      setError(
        "Vous devez accepter les conditions d'utilisation pour continuer"
      );
      setIsLoading(false);
      return;
    }

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.avatarUrl || undefined,
      });

      if (error) {
        setError(
          error.message || "Une erreur est survenue lors de l'inscription"
        );
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError("Une erreur inattendue est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (error) setError("");
    };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData((prev) => ({ ...prev, avatarUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Créer un compte
          </h1>
          <p className="text-slate-600 text-lg">
            Rejoignez notre communauté d'intellectuels
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {avatarPreview ? (
                  <div className="relative">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-slate-200 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeAvatar}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200 shadow-lg">
                    <User className="h-10 w-10 text-slate-400" />
                  </div>
                )}
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">
                  <Upload className="h-4 w-4" />
                  <span className="text-sm font-medium">Choisir un avatar</span>
                </div>
              </label>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Nom complet
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange("name")}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                placeholder="TRF Gilbert Gasquier"
                required
              />
            </div>

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
                value={formData.email}
                onChange={handleInputChange("email")}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                placeholder="marie.curie@sorbonne.fr"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••••••"
                  minLength={6}
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
              <p className="mt-2 text-xs text-slate-500 font-medium">
                Minimum 6 caractères requis
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Acceptation des conditions - NOUVELLE SECTION */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-start space-x-3">
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);
                    if (error) setError("");
                  }}
                  className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-colors"
                  required
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-slate-700 leading-relaxed"
                >
                  En créant un compte, vous acceptez nos{" "}
                  <Link
                    href="/legacy-terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                  >
                    conditions d'utilisation
                  </Link>{" "}
                  et notre{" "}
                  <Link
                    href="/legacy/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                  >
                    politique de confidentialité
                  </Link>
                </label>
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
              disabled={isLoading || !acceptTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Création en cours...</span>
                </div>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <Link
              href="/auth/login"
              className="flex items-center justify-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour à la connexion</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
