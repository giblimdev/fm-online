// @/lib/auth/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
//import { resend } from "@/lib/email/resend"; // Configuration Resend pour l'envoi d'emails

export const auth = betterAuth({
  appName: "Plateforme Intellectuelle",

  // Configuration de la base de données
  database: prismaAdapter(prisma, {
    provider: "postgresql", // ou "mysql", "sqlite" selon votre base
  }),

  // Configuration des cookies d'authentification
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    },
  },

  // Configuration email et mot de passe avec vérification
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Désactivé car on veut forcer la vérification email
    minPasswordLength: 6,
    maxPasswordLength: 128,
    requireEmailVerification: false, // Temporairement désactivé sans service email
  },

  // Configuration de la vérification d'email (désactivée temporairement)
  emailVerification: {
    sendOnSignUp: false, // Désactivé sans service email configuré
    autoSignInAfterVerification: true,

    // Fonction d'envoi de l'email de vérification (commentée pour l'instant)
    /*
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        await resend.emails.send({
          from: "noreply@votre-domaine.com",
          to: user.email,
          subject: "Vérifiez votre adresse email",
          html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin-bottom: 10px;">Vérification d'email</h1>
                <p style="color: #64748b; font-size: 16px;">
                  Bonjour ${user.name || user.email},
                </p>
                <p style="color: #64748b; font-size: 16px;">
                  Merci de vous être inscrit sur notre plateforme intellectuelle. 
                  Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" 
                   style="background-color: #1e40af; color: white; padding: 14px 28px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold; 
                          display: inline-block; font-size: 16px;">
                  Vérifier mon email
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 14px; text-align: center;">
                  Si vous n'arrivez pas à cliquer sur le bouton, copiez ce lien dans votre navigateur :
                </p>
                <p style="color: #1e40af; font-size: 14px; text-align: center; word-break: break-all;">
                  ${url}
                </p>
                <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
                  Ce lien expire dans 24 heures pour des raisons de sécurité.
                </p>
              </div>
            </div>
          `,
        });
        
        console.log(`Email de vérification envoyé à ${user.email}`);
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de vérification:", error);
        throw new Error("Impossible d'envoyer l'email de vérification");
      }
    },
    */
  },

  // Configuration des cookies sécurisés
  cookies: {
    secure: process.env.NODE_ENV === "production", // HTTPS en production
    httpOnly: true, // Protection contre XSS
    sameSite: "lax", // Protection CSRF
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    prefix: "auth", // Préfixe des cookies
  },

  // Configuration des origines de confiance
  trustedOrigins: [
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL!
      : "http://localhost:3000",
  ],

  // Configuration avancée
  advanced: {
    generateId: () => crypto.randomUUID(), // Génération d'ID sécurisée
    crossSubDomainCookies: {
      enabled: false, // Activez si vous avez plusieurs sous-domaines
      domain: process.env.COOKIE_DOMAIN,
    },
  },

  // Pages de redirection personnalisées
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    emailVerification: "/auth/verify-email",
    error: "/auth/error",
  },

  // Secret pour le chiffrement (obligatoire)
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "your-secret-key-minimum-32-characters-long-please",
});

// Export des types pour TypeScript
export type Session = typeof auth.$Infer.Session;
