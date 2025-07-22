// @/app/privacy/page.tsx
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

export default function PrivacyPage() {
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
            <span>Retour à la page précédente</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Politique de confidentialité
          </h1>
          <p className="text-slate-600 text-lg">
            Protection et traitement de vos données personnelles
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-green-600 mr-3" />
                1. Introduction
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous respectons votre vie privée et nous nous engageons à
                protéger vos données personnelles. Cette politique de
                confidentialité vous informe sur la façon dont nous collectons,
                utilisons et protégeons vos informations lorsque vous utilisez
                notre plateforme intellectuelle.
              </p>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-green-600 mr-3" />
                2. Données que nous collectons
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous collectons les informations suivantes lors de votre
                inscription et utilisation :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>
                  <strong>Informations d'identification :</strong> nom, adresse
                  email
                </li>
                <li>
                  <strong>Informations de profil :</strong> photo de profil
                  (optionnelle)
                </li>
                <li>
                  <strong>Contenu créé :</strong> documents, descriptions, liens
                  partagés
                </li>
                <li>
                  <strong>Données de session :</strong> adresse IP, agent
                  utilisateur
                </li>
                <li>
                  <strong>Données d'utilisation :</strong> pages visitées,
                  actions effectuées
                </li>
              </ul>
            </section>

            {/* Utilisation des données */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                3. Comment nous utilisons vos données
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience sur la plateforme</li>
                <li>Communiquer avec vous concernant votre compte</li>
                <li>Assurer la sécurité et prévenir les fraudes</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            {/* Partage des données */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                4. Partage de vos données
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous ne vendons jamais vos données personnelles. Nous ne les
                partageons que dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>
                  Avec nos prestataires de services de confiance (hébergement,
                  analytics)
                </li>
                <li>Pour respecter une obligation légale</li>
                <li>Pour protéger nos droits et ceux de nos utilisateurs</li>
              </ul>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-green-600 mr-3" />
                5. Sécurité de vos données
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous mettons en place des mesures de sécurité techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre l'accès non autorisé, la perte, la
                destruction ou la divulgation accidentelle.
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Chiffrement des données en transit et au repos</li>
                <li>Authentification sécurisée avec Better Auth</li>
                <li>
                  Accès limité aux données sur la base du besoin d'en connaître
                </li>
                <li>Surveillance continue des systèmes</li>
              </ul>
            </section>

            {/* Vos droits */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                6. Vos droits
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>
                  <strong>Droit d'accès :</strong> consulter vos données
                  personnelles
                </li>
                <li>
                  <strong>Droit de rectification :</strong> corriger vos données
                  inexactes
                </li>
                <li>
                  <strong>Droit à l'effacement :</strong> demander la
                  suppression de vos données
                </li>
                <li>
                  <strong>Droit de portabilité :</strong> récupérer vos données
                  dans un format structuré
                </li>
                <li>
                  <strong>Droit d'opposition :</strong> vous opposer au
                  traitement de vos données
                </li>
                <li>
                  <strong>Droit de limitation :</strong> demander la limitation
                  du traitement
                </li>
              </ul>
            </section>

            {/* Conservation */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                7. Conservation des données
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Nous conservons vos données personnelles uniquement pendant la
                durée nécessaire aux finalités pour lesquelles elles ont été
                collectées, ou selon les exigences légales :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Données de compte : tant que votre compte est actif</li>
                <li>Documents créés : tant que votre compte existe</li>
                <li>Données de session : 90 jours maximum</li>
                <li>Logs de sécurité : 1 an maximum</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                8. Nous contacter
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Pour toute question concernant cette politique de
                confidentialité ou pour exercer vos droits, contactez-nous à :
                <br />
                <a
                  href="mailto:privacy@fm-online.com"
                  className="text-green-600 hover:text-green-700 font-medium ml-1"
                >
                  privacy@fm-online.com
                </a>
                <br />
                Ou par courrier à : Délégué à la Protection des Données, [Votre
                adresse]
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                9. Modifications de cette politique
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Nous pouvons mettre à jour cette politique de confidentialité de
                temps à autre. Nous vous informerons de tout changement
                important par email ou via une notification sur la plateforme.
                La version mise à jour prendra effet à la date indiquée en haut
                de cette page.
              </p>
            </section>
          </div>

          {/* Footer de la page */}
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
            <div className="text-center text-sm text-slate-600">
              <p>Dernière mise à jour : 22 juillet 2025</p>
              <p className="mt-2">
                Cette politique est conforme au RGPD et aux lois françaises sur
                la protection des données
              </p>
            </div>
          </div>
        </div>

        {/* Navigation en bas */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-white text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors font-medium shadow-lg border border-slate-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à la page précédente</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
