// @/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  Shield,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Calendar,
  ExternalLink,
  Settings,
  Database,
  Activity,
} from "lucide-react";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  totalDocuments: number;
  totalLinks: number;
  recentUsers: number;
  documentsThisWeek: number;
  linksThisWeek: number;
}

export default function AdminPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalDocuments: 0,
    totalLinks: 0,
    recentUsers: 0,
    documentsThisWeek: 0,
    linksThisWeek: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isPending && session?.user) {
      fetchStats();
    } else if (!isPending && !session?.user) {
      router.push("/auth/login");
    }
  }, [session, isPending, router]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      // Simuler les stats - remplacez par votre API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats({
        totalUsers: 156,
        totalDocuments: 423,
        totalLinks: 1247,
        recentUsers: 12,
        documentsThisWeek: 34,
        linksThisWeek: 89,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <p className="text-slate-600 text-lg font-medium">
            Chargement de l'administration...
          </p>
        </div>
      </div>
    );
  }

  const adminCards = [
    {
      title: "Gestion des Documents",
      description:
        "Administrer tous les documents, contenus et liens de la plateforme",
      icon: <FileText className="h-8 w-8" />,
      link: "/admin/documents",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      count: stats.totalDocuments,
      label: "documents",
    },
    {
      title: "Gestion des Utilisateurs",
      description: "Gérer les comptes utilisateurs, sessions et permissions",
      icon: <Users className="h-8 w-8" />,
      link: "/admin/users",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      count: stats.totalUsers,
      label: "utilisateurs",
    },
  ];

  const statsCards = [
    {
      title: "Total Utilisateurs",
      value: stats.totalUsers,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      trend: `+${stats.recentUsers} cette semaine`,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Documents",
      value: stats.totalDocuments,
      icon: <FileText className="h-6 w-6 text-emerald-600" />,
      trend: `+${stats.documentsThisWeek} cette semaine`,
      bgColor: "bg-emerald-100",
    },
    {
      title: "Total Liens",
      value: stats.totalLinks,
      icon: <ExternalLink className="h-6 w-6 text-purple-600" />,
      trend: `+${stats.linksThisWeek} cette semaine`,
      bgColor: "bg-purple-100",
    },
    {
      title: "Activité",
      value: "98%",
      icon: <Activity className="h-6 w-6 text-orange-600" />,
      trend: "Système opérationnel",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header moderne */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Administration
                </h1>
                <p className="text-slate-600 font-medium">
                  Panneau de contrôle de la plateforme
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-white/50"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Retour au dashboard</span>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {session?.user?.name?.charAt(0) || "A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Message de bienvenue */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Bienvenue dans l'espace d'administration, {session?.user?.name}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Gérez efficacement votre plateforme intellectuelle avec ces outils
            d'administration avancés.
          </p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <p className="text-xs text-slate-500 font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Cartes principales d'administration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <div className="text-white">{card.icon}</div>
                </div>
                <div className="flex items-center space-x-2 text-slate-500 group-hover:text-slate-700 transition-colors">
                  <span className="text-sm font-medium">Accéder</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`${card.bgColor} px-4 py-2 rounded-xl border border-white/40`}
                >
                  <span className={`text-sm font-bold ${card.textColor}`}>
                    {card.count} {card.label}
                  </span>
                </div>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <ArrowRight className="h-4 w-4 text-slate-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Actions rapides supplémentaires */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Settings className="h-6 w-6 text-slate-600 mr-3" />
            Actions rapides
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/analytics"
              className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                  Analytics
                </p>
                <p className="text-sm text-slate-600">
                  Statistiques détaillées
                </p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Paramètres
                </p>
                <p className="text-sm text-slate-600">Configuration système</p>
              </div>
            </Link>

            <Link
              href="/admin/database"
              className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                  Base de données
                </p>
                <p className="text-sm text-slate-600">Maintenance DB</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
