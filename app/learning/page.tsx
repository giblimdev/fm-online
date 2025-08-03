// app/learning/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, BookText, Settings } from "lucide-react";

export default function LearningHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
      {/* Gradient blurred background shapes for a trendy look */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 opacity-30 rounded-full blur-3xl translate-x-1/4 translate-y-1/3 pointer-events-none" />
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 backdrop-blur-xl z-10">
        <CardHeader className="flex flex-col items-center justify-center pb-0">
          <span className="bg-blue-100 p-2 rounded-full mb-4 shadow-inner animate-bounce-slow">
            <Sparkles className="text-blue-500" size={42} />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-1 text-center text-blue-900 drop-shadow">
            Bienvenue&nbsp;sur l’espace <span className="text-blue-600">Apprentissage</span>
          </h1>
          <p className="text-gray-500 text-center mt-3 text-lg max-w-xl">
            Progressez mot-à-mot sur vos textes favoris.<br />
            Masquez, testez, mémorisez,<br className="hidden sm:inline" /> et visualisez vos avancées&nbsp;!
          </p>
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-6 md:flex-row">
          {/* Carte 1 : Textes à apprendre */}
          <div className="flex-1 group relative transition-all">
            <Card className="p-6 h-full bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-100 shadow-lg group-hover:shadow-2xl transition-transform group-hover:-translate-y-1 duration-200 border-2 hover:border-blue-300 hover:bg-blue-50/60">
              <span className="flex justify-center">
                <BookText className="mb-3 text-blue-500 drop-shadow animate-wiggle-slow" size={32}/>
              </span>
              <h3 className="text-lg font-bold text-blue-900 mb-1 text-center">
                Textes à Apprendre
              </h3>
              <p className="text-gray-500 text-sm mb-3 text-center leading-relaxed">
                Entraînez-vous en masquant ou&nbsp;révélant les mots à votre rythme.<br />Visualisez votre progression.
              </p>
              <Button asChild variant="secondary" className="w-full mt-auto font-semibold tracking-wide group-hover:bg-blue-200 group-hover:text-blue-900 transition">
                <Link href="/learning/textDashboard">Voir mon espace</Link>
              </Button>
              <div className="absolute top-2 right-4 hidden group-hover:block animate-pulse text-blue-400 text-xs font-semibold">Commencer !</div>
            </Card>
          </div>
          {/* Carte 2 : Administration */}
          <div className="flex-1 group relative transition-all">
            <Card className="p-6 h-full bg-gradient-to-br from-yellow-50 via-white to-yellow-100 border-yellow-100 shadow-lg group-hover:shadow-2xl transition-transform group-hover:-translate-y-1 duration-200 border-2 hover:border-yellow-300 hover:bg-yellow-50/60">
              <span className="flex justify-center">
                <Settings className="mb-3 text-yellow-500 drop-shadow animate-spin-slow" size={32}/>
              </span>
              <h3 className="text-lg font-bold text-yellow-900 mb-1 text-center">
                Administration
              </h3>
              <p className="text-gray-500 text-sm mb-3 text-center leading-relaxed">
                Ajoutez, modifiez, organisez vos textes <br /> dans la bibliothèque centrale.
              </p>
              <Button asChild className="w-full mt-auto font-semibold tracking-wide group-hover:bg-yellow-200 group-hover:text-yellow-900 transition">
                <Link href="/learning/textManager">Gérer mes textes</Link>
              </Button>
              <div className="absolute top-2 right-4 hidden group-hover:block animate-pulse text-yellow-400 text-xs font-semibold">Gestion !</div>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center mt-6 ">
          <p className="text-xs text-gray-400 text-center tracking-wide font-light">
            Application pédagogique · Mémoire active · Personnalisation totale
          </p>
        </CardFooter>
      </Card>
      {/* Petites gouttes random déco */}
      <div className="absolute left-8 bottom-32 w-8 h-8 bg-blue-200 rounded-full blur-md opacity-50 translate-x-8 animate-float-y pointer-events-none" />
      <div className="absolute right-12 top-24 w-4 h-4 bg-yellow-100 rounded-full blur-sm opacity-40 animate-float-x pointer-events-none" />
      <style>{`
        @keyframes wiggle-slow { 0%,100% {transform: rotate(-6deg);} 50%{transform:rotate(6deg);} }
        .animate-wiggle-slow { animation: wiggle-slow 2.4s infinite cubic-bezier(.67,.11,.97,.34);}
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        @keyframes bounce-slow { 0%,100%{ transform:translateY(0);} 60%{transform:translateY(-12px);} }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        @keyframes float-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(36px); } }
        .animate-float-x { animation: float-x 6s ease-in-out infinite;}
        @keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-22px); } }
        .animate-float-y { animation: float-y 7s ease-in-out infinite;}
      `}</style>
    </div>
  );
}
