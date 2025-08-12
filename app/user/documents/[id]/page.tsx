// app/user/documents/[id]/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  Navigation,
  MousePointer,
  Keyboard,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function DocumentViewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Consultation de Documents
          </h1>
          <p className="text-slate-600">
            Guide d'utilisation pour naviguer dans vos rituels
          </p>
        </div>

        {/* Instructions principales */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertDescription>
            <div className="text-blue-800">
              <p className="font-medium text-lg mb-4">
                📖 Comment naviguer dans vos documents :
              </p>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Menu className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold text-slate-900">
                        Menu de gauche
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Cliquez sur n'importe quel document dans la sidebar pour y
                      accéder directement.
                    </p>
                  </div>

                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Navigation className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold text-slate-900">
                        Flèches de navigation
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Utilisez les boutons "Précédent" et "Suivant" en bas de
                      page.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Keyboard className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold text-slate-900">
                        Raccourcis clavier
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Flèche gauche (←) = Précédent | Flèche droite (→) =
                      Suivant
                    </p>
                  </div>

                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MousePointer className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold text-slate-900">
                        Liens externes
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      Cliquez sur les liens dans le document pour les ouvrir
                      dans un nouvel onglet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Démonstration visuelle */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5 text-blue-600" />
                Navigation par le menu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-slate-100 rounded p-3 border-l-4 border-blue-500">
                  <div className="font-medium text-sm">
                    📄 Rituel d'ouverture
                  </div>
                  <div className="text-xs text-slate-500">
                    Apprenti • Ajouté le 15/01/2024
                  </div>
                </div>
                <div className="bg-slate-50 rounded p-3">
                  <div className="font-medium text-sm">
                    📄 Cérémonie de passage
                  </div>
                  <div className="text-xs text-slate-500">
                    Compagnon • Ajouté le 10/01/2024
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  ↑ Cliquez sur n'importe lequel pour y aller
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-green-600" />
                Navigation par les flèches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-100 rounded p-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Précédent</span>
                  </Button>
                  <span className="text-sm font-medium">Document 2/5</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <span className="hidden sm:inline">Suivant</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-slate-600 italic text-center">
                  ↑ Navigation en bas de chaque page
                </p>
                <p className="text-xs text-slate-500 text-center">
                  Ou utilisez les flèches ← → du clavier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="text-center p-8">
            <h3 className="text-xl font-bold mb-4">
              Prêt à explorer vos documents ?
            </h3>
            <p className="mb-6 text-blue-100">
              Accédez à votre bibliothèque et commencez à naviguer dans vos
              rituels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/user/dashboard">
                <Button variant="secondary" size="lg">
                  Aller à ma bibliothèque
                </Button>
              </Link>
              <Link href="/user/addDoc">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Ajouter des documents
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
