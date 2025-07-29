// components/ui/Nav.tsx
import React from "react";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

const navLinks = [
  {
    href: "/user/dashboard",
    label: "Mes rituels",
    icon: BookOpen,
  },
  {
    href: "/public",
    label: "Ajouter un rituel",
    icon: Plus,
  },
  {
    href: "/frame",
    label: "Apprentissage",
    icon: Plus,
  },
];

export default function Nav() {
  return (
    <nav className="flex items-center space-x-6">
      {navLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            <IconComponent className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
