// @/components/layout/IsConnected.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth/auth-client";
import {
  User,
  ChevronDown,
  Calendar,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";

export default function IsConnected() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Récupérer la session avec Better Auth
  const { data: session, isPending } = useSession();

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setIsDropdownOpen(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Affichage pendant le chargement
  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
      </div>
    );
  }

  // Si pas de session : afficher le bouton de connexion
  if (!session) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
        <Link
          href="/auth/login"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center inline-flex items-center justify-center space-x-2"
        >
          <User className="h-4 w-4" />
          <span>Se connecter</span>
        </Link>
      </div>
    );
  }

  // Si session : afficher l'avatar avec menu déroulant
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-blue-300 transition-colors">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Nom utilisateur (masqué sur mobile) */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-900 truncate max-w-32">
            {session.user.name || "Utilisateur"}
          </p>
          <p className="text-xs text-slate-500 truncate max-w-32">
            {session.user.email}
          </p>
        </div>

        {/* Icône flèche */}
        <ChevronDown
          className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu déroulant */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden">
          {/* En-tête utilisateur (affiché sur mobile) */}
          <div className="px-4 py-3 border-b border-slate-100 md:hidden">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {session.user.name || "Utilisateur"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {session.user.email}
            </p>
          </div>

          {/* Options du menu */}
          <div className="py-1">
            <Link
              href="/user/dashboard"
              onClick={closeDropdown}
              className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">dashboard</p>
                <p className="text-xs text-slate-500">
                  Vos rituels et autres Informations
                </p>
              </div>
            </Link>

            <Link
              href="/user/profile"
              onClick={closeDropdown}
              className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Mon profil</p>
                <p className="text-xs text-slate-500">
                  Informations personnelles
                </p>
              </div>
            </Link>
          </div>

          {/* Séparateur */}
          <div className="border-t border-slate-100 my-1"></div>

          {/* Déconnexion */}
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group disabled:opacity-50"
          >
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              {isLoading ? (
                <Loader2 className="h-4 w-4 text-red-600 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4 text-red-600" />
              )}
            </div>
            <div>
              <p className="font-medium">Se déconnecter</p>
              <p className="text-xs text-red-500">Fermer la session</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
