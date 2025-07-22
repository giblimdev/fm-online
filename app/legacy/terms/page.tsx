// @/app/legacy-terms/page.tsx
import Link from "next/link";
import { ArrowLeft, FileText, Shield, Scale } from "lucide-react";

export default function LegacyTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation de retour */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Conditions d'utilisation
          </h1>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Sections des conditions */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                1. Acceptation des conditions
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                En accédant et en utilisant cette plateforme intellectuelle,
                vous acceptez d'être lié par ces conditions d'utilisation et
                toutes les lois et réglementations applicables.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                2. Utilisation de la plateforme
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Cette plateforme est destinée à l'échange et au partage de
                rituels. Vous vous engagez à utiliser ce service de manière
                responsable et respectueuse.
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>
                  Respecter les droits d'auteur et la propriété intellectuelle
                </li>
                <li>Ne pas publier de contenu offensant ou inapproprié</li>
                <li>
                  Maintenir la confidentialité de vos identifiants de connexion
                </li>
                <li>
                  Signaler tout comportement abusif ou contenu problématique
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Contenu utilisateur
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Vous conservez les droits sur le contenu que vous publiez, mais
                vous accordez à la plateforme une licence non exclusive pour
                afficher, distribuer et promouvoir ce contenu dans le cadre du
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Limitation de responsabilité
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                La plateforme est fournie "en l'état" sans garantie d'aucune
                sorte. Nous ne sommes pas responsables des dommages directs ou
                indirects résultant de l'utilisation du service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                5. Modifications des conditions
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout
                moment. Les utilisateurs seront notifiés des changements
                importants par email ou via la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Contact
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation,
                vous pouvez nous contacter à l'adresse :
                <a
                  href="mailto:giblimdev@gmail.com"
                  className="text-blue-600 hover:text-blue-700 font-medium ml-1"
                >
                  legal@fm-online.com
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Navigation en bas */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-white text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors font-medium shadow-lg border border-slate-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
