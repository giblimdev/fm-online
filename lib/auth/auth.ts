// @/lib/auth/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  appName: "Plateforme Intellectuelle",

  // Configuration de la base de données
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ✅ Configuration corrigée des cookies de session
  session: {
    cookieCache: {
      enabled: false, // Désactivé pour éviter l'erreur de taille
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
  },

  // Configuration email et mot de passe
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    requireEmailVerification: false,
  },

  // Configuration de la vérification d'email
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
  },

  // Configuration des cookies sécurisés
  cookies: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    prefix: "auth",
  },

  // Configuration des origines de confiance
  trustedOrigins: [
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL!
      : "http://localhost:3000",
  ],

  // ✅ Configuration corrigée pour la génération d'IDs
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(), // Remplace l'ancien advanced.generateId
    },
    crossSubDomainCookies: {
      enabled: false,
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

  // Secret pour le chiffrement
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "your-secret-key-minimum-32-characters-long-please",
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
