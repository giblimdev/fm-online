// @/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Users,
  Search,
  Star,
  Shield,
  Globe,
  Plus,
  Check,
  User,
  ExternalLink,
  FileText,
  Heart,
  TrendingUp,
  Tag,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Interface selon votre schéma Prisma
interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  grade?: string;
  category?: string;
  ordre?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  liens: DocumentLink[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface DocumentLink {
  id: string;
  url: string;
  title: string;
  description?: string;
  documentId: string;
}

export default function HomePage() {
  const [featuredDocuments, setFeaturedDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedDocuments, setAddedDocuments] = useState<Set<string>>(new Set());
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchFeaturedDocuments();
  }, []);

  const fetchFeaturedDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      if (response.ok) {
        const data = await response.json();
        setFeaturedDocuments(data.slice(0, 6)); // Afficher 6 documents en vedette
      }
    } catch (error) {
      console.error("Erreur lors du chargement des documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToLibrary = (documentId: string) => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 3000);
    setAddedDocuments((prev) => new Set(prev).add(documentId));
  };

  const handleImageError = (documentId: string, imageUrl?: string) => {
    console.log(
      "Erreur de chargement image pour document:",
      documentId,
      "URL:",
      imageUrl
    );
    setImageErrors((prev) => new Set(prev).add(documentId));
  };

  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url || url.trim() === "") return false;

    // Accepter les chemins locaux qui commencent par /
    if (url.startsWith("/")) return true;

    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case "apprenti":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "compagnon":
        return "bg-green-100 text-green-800 border-green-200";
      case "maitre":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "vénérable maitre":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "emulation":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "domatique":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "marque":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "nautonier":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "kt":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Bibliothèque Riche",
      description:
        "Accédez à une collection soigneusement sélectionnée de rituels maçonniques authentiques et documents de haute qualité.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Communauté de Frères",
      description:
        "Rejoignez une communauté de Frères passionnés par les traditions maçonniques et l'étude des rituels.",
    },
    {
      icon: <Search className="h-8 w-8 text-purple-600" />,
      title: "Recherche par Grade",
      description:
        "Trouvez rapidement les rituels correspondant à votre grade et catégorie maçonnique spécifique.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Contenu Authentique",
      description:
        "Tous nos rituels sont vérifiés et classés selon leur authenticité et leur tradition maçonnique.",
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Rituels",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
    },
    {
      value: "25+",
      label: "Frères",
      icon: <Users className="h-6 w-6 text-green-600" />,
    },
    {
      value: "8",
      label: "Grades & Catégories",
      icon: <Star className="h-6 w-6 text-yellow-600" />,
    },
    {
      value: "100%",
      label: "Authentique",
      icon: <Heart className="h-6 w-6 text-red-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Notification de connexion */}
      {showLoginPrompt && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="font-medium">
              Connectez-vous pour créer et gérer vos documents
            </span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl mb-8 shadow-2xl">
              <BookOpen className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Votre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bibliothèque Maçonnique
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez, explorez et enrichissez votre parcours maçonnique avec
              notre collection exclusive de rituels authentiques, organisés par
              grades et catégories.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                href="/public"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-3"
              >
                <Globe className="h-6 w-6" />
                <span>Explorer la bibliothèque</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/auth/register"
                className="group bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-3"
              >
                <Star className="h-6 w-6" />
                <span>Créer un compte gratuit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents en vedette */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Rituels en vedette
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez quelques-uns de nos rituels les plus appréciés par la
              communauté maçonnique.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 animate-pulse"
                >
                  <div className="h-48 bg-slate-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded mb-6"></div>
                  <div className="h-12 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDocuments.map((document) => {
                // Console.log pour déboguer l'image
                console.log(
                  "Document ID:",
                  document.id,
                  "Image:",
                  document.image,
                  "Type:",
                  typeof document.image
                );

                return (
                  <div
                    key={document.id}
                    className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      {document.image &&
                      isValidImageUrl(document.image) &&
                      !imageErrors.has(document.id) ? (
                        <Image
                          src={document.image}
                          alt={document.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={() =>
                            handleImageError(document.id, document.image)
                          }
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm font-medium">
                              Rituel traditionnel
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-3">
                          {document.title}
                        </h3>

                        {/* Badges pour Grade et Category */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {document.grade && (
                            <span
                              className={`px-2 py-1 text-xs font-medium border rounded-lg ${getGradeColor(
                                document.grade
                              )}`}
                            >
                              {document.grade}
                            </span>
                          )}
                          {document.category && (
                            <span
                              className={`px-2 py-1 text-xs font-medium border rounded-lg flex items-center ${getCategoryColor(
                                document.category
                              )}`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {document.category}
                            </span>
                          )}
                        </div>
                      </div>

                      {document.description && (
                        <p className="text-slate-600 line-clamp-3 mb-6 leading-relaxed">
                          {document.description}
                        </p>
                      )}

                      {/* Métadonnées */}
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            {document.liens.length} liens
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(document.createdAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/public/${document.id}`}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-xl font-medium transition-colors text-center"
                        >
                          Voir le rituel
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/public"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              <span>Découvrir tous les rituels</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Pourquoi choisir notre plateforme ?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Une expérience unique dédiée à l'étude et à la préservation des
              rituels maçonniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Comment utiliser la plateforme ?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Découvrez en 4 étapes simples comment tirer le meilleur parti de
              notre bibliothèque maçonnique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Explorez
              </h3>
              <p className="text-slate-600">
                Parcourez notre collection de rituels organisés par Grades et
                Rites
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Découvrez
              </h3>
              <p className="text-slate-600">
                Cliquez sur les rituels qui vous intéressent pour accéder au
                contenu et ajoutez les à votre bibliothèque.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Créez un compte
              </h3>
              <p className="text-slate-600">
                Inscrivez-vous gratuitement pour créer et gérer votre
                bibliothèque de rituel.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Ajoutez</h3>
              <p className="text-slate-600">
                Ajoutez un rituel à votre programme d'étude.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à enrichir votre parcours maçonnique ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre communauté et accédez à une bibliothèque
            exceptionnelle de rituels et documents maçonniques authentiques
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
            >
              <Star className="h-6 w-6" />
              <span>Créer un compte gratuit</span>
            </Link>
            <Link
              href="/public"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Globe className="h-6 w-6" />
              <span>Explorer la bibliothèque</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FM-Online</span>
            </div>

            <div className="flex items-center space-x-6 text-slate-300">
              <Link
                href="/public"
                className="hover:text-white transition-colors"
              >
                Rituels
              </Link>
              <span>•</span>
              <Link
                href="/auth/login"
                className="hover:text-white transition-colors"
              >
                Connexion
              </Link>
              <span>•</span>
              <Link
                href="/auth/register"
                className="hover:text-white transition-colors"
              >
                Inscription
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2025 FM-Online. Bibliothèque maçonnique - Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
