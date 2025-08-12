// app/public/help/page.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  LogIn,
  BookOpen,
  Plus,
  Eye,
  Search,
  Heart,
  Settings,
  Shield,
  Download,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Comment ça marche
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez comment utiliser notre plateforme pour gérer et accéder à
            vos rituels maçonniques en toute simplicité.
          </p>
        </div>

        {/* Guide principal avec Accordion */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Guide d'utilisation
            </CardTitle>
            <CardDescription>
              Suivez ces étapes pour tirer le meilleur parti de votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {/* Étape 1 : Créer un compte */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="min-w-8 h-8 flex items-center justify-center"
                    >
                      1
                    </Badge>
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">Créer votre compte</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">
                          Inscription simple et sécurisée
                        </h4>
                        <p className="text-slate-600 mb-3">
                          Créez votre compte en quelques minutes avec vos
                          informations de base.
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Renseignez votre nom et email</li>
                          <li>Sélectionnez vos grades maçonniques</li>
                          <li>Vérifiez votre adresse email</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          <Shield className="h-4 w-4 inline mr-2" />
                          Vos informations sont protégées et ne sont jamais
                          partagées.
                        </p>
                      </div>
                      <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Créer un compte
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Étape 2 : Se connecter */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="min-w-8 h-8 flex items-center justify-center"
                    >
                      2
                    </Badge>
                    <LogIn className="h-5 w-5 text-green-600" />
                    <span className="font-semibold">Se connecter</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">
                          Accès à votre espace personnel
                        </h4>
                        <p className="text-slate-600 mb-3">
                          Connectez-vous avec vos identifiants pour accéder à
                          votre dashboard.
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Utilisez votre email et mot de passe</li>
                          <li>Accédez à votre bibliothèque personnelle</li>
                          <li>Gérez vos favoris et notes</li>
                        </ul>
                      </div>
                      <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <LogIn className="h-4 w-4" />
                        Se connecter
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Étape 3 : Découvrir les rituels */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="min-w-8 h-8 flex items-center justify-center"
                    >
                      3
                    </Badge>
                    <Search className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold">
                      Découvrir les rituels disponibles
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">
                          Explorer la collection de rituels
                        </h4>
                        <p className="text-slate-600 mb-3">
                          Naviguez dans notre catalogue de rituels adaptés à vos
                          grades.
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Allez sur "Découvrir les rituels"</li>
                          <li>Filtrez par grade ou catégorie</li>
                          <li>
                            Utilisez la recherche pour trouver un rituel
                            spécifique
                          </li>
                          <li>Consultez les aperçus et descriptions</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-purple-800 text-sm">
                          <Eye className="h-4 w-4 inline mr-2" />
                          Seuls les rituels compatibles avec vos grades sont
                          affichés.
                        </p>
                      </div>
                      <Link
                        href="/public"
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Search className="h-4 w-4" />
                        Découvrir les rituels
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Étape 4 : Ajouter à la bibliothèque */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="min-w-8 h-8 flex items-center justify-center"
                    >
                      4
                    </Badge>
                    <Plus className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold">
                      Ajouter un rituel à votre bibliothèque
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">
                          Constituer votre collection personnelle
                        </h4>
                        <p className="text-slate-600 mb-3">
                          Ajoutez les rituels qui vous intéressent à votre
                          bibliothèque personnelle.
                        </p>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-slate-800">
                              Depuis la liste des rituels :
                            </h5>
                            <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                              <li>
                                Cliquez sur "Ajouter à ma bibliothèque" sur un
                                rituel
                              </li>
                              <li>Le document est automatiquement ajouté</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-slate-800">
                              Depuis la page d'un rituel :
                            </h5>
                            <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                              <li>Consultez le rituel en détail</li>
                              <li>Cliquez sur "Ajouter à ma bibliothèque"</li>
                              <li>
                                Ajoutez des notes personnelles si souhaité
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-orange-800 text-sm">
                          <Plus className="h-4 w-4 inline mr-2" />
                          Un même rituel ne peut être ajouté qu'une seule fois à
                          votre bibliothèque.
                        </p>
                      </div>
                      <Link
                        href="/user/addDoc"
                        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Ajouter des rituels
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Étape 5 : Gérer sa bibliothèque */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="default"
                      className="min-w-8 h-8 flex items-center justify-center"
                    >
                      5
                    </Badge>
                    <Settings className="h-5 w-5 text-indigo-600" />
                    <span className="font-semibold">
                      Gérer votre bibliothèque
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-14 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">
                          Organiser et personnaliser vos rituels
                        </h4>
                        <p className="text-slate-600 mb-3">
                          Depuis votre dashboard, gérez votre collection de
                          rituels.
                        </p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>
                            Consultez tous vos rituels depuis le dashboard
                          </li>
                          <li>Marquez vos rituels favoris avec le cœur</li>
                          <li>Ajoutez des notes personnelles</li>
                          <li>Triez par date d'ajout, titre ou catégorie</li>
                          <li>
                            Retirez des rituels de votre bibliothèque si besoin
                          </li>
                        </ul>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-indigo-800 text-sm">
                          <Heart className="h-4 w-4 inline mr-2" />
                          Utilisez les favoris pour accéder rapidement à vos
                          rituels les plus importants.
                        </p>
                      </div>
                      <Link
                        href="/user/dashboard"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Accéder au dashboard
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Section Conseils */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-6 w-6 text-emerald-600" />
              Conseils d'utilisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">
                  🎯 Organisez-vous
                </h4>
                <ul className="text-slate-600 space-y-1 text-sm">
                  <li>• Utilisez les favoris pour vos rituels principaux</li>
                  <li>• Ajoutez des notes pour vos réflexions personnelles</li>
                  <li>• Explorez régulièrement les nouveaux rituels</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">
                  🔍 Recherchez efficacement
                </h4>
                <ul className="text-slate-600 space-y-1 text-sm">
                  <li>• Filtrez par grade pour voir les rituels appropriés</li>
                  <li>• Utilisez la recherche par mots-clés</li>
                  <li>• Consultez les descriptions avant d'ajouter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Prêt à commencer ?</h3>
          <p className="text-blue-100 mb-6">
            Créez votre compte et commencez à constituer votre bibliothèque de
            rituels dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              href="/public"
              className="border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Découvrir les rituels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
