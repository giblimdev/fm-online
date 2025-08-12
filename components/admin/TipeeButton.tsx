// components/admin/TipeeButton.tsx

"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface TipeeButtonProps {
  tipeeUrl: string;
  username?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "gradient";
}

export default function TipeeButton({
  tipeeUrl,
  username = "Créateur",
  className = "",
  size = "md",
  variant = "default",
}: TipeeButtonProps) {
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation pulse toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000); // Durée de l'animation
    }, 5 * 60 * 500); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open(tipeeUrl, "_blank", "noopener,noreferrer");
  };

  // Styles selon la taille
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Styles selon la variante
  const variantClasses = {
    default:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50",
    gradient:
      "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl",
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative overflow-hidden rounded-full font-semibold
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          flex items-center gap-2
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${isPulsing ? "animate-pulse scale-110" : ""}
          ${className}
        `}
      >
        {/* Effet de brillance au survol */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
            opacity-0 transform -translate-x-full transition-all duration-700
            ${isHovered ? "opacity-20 translate-x-full" : ""}
          `}
        />

        {/* Icône cœur animée */}
        <Heart
          className={`
            transition-all duration-300
            ${isHovered ? "fill-current animate-bounce" : ""}
            ${isPulsing ? "animate-ping" : ""}
          `}
          size={size === "sm" ? 16 : size === "md" ? 20 : 24}
        />

        <span className="relative z-10">Me Soutenir</span>

        {/* Particules flottantes lors du pulse */}
        {isPulsing && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-75 delay-100" />
            <div className="absolute top-1/2 -right-2 w-1 h-1 bg-purple-300 rounded-full animate-ping opacity-75 delay-200" />
          </>
        )}
      </button>

      {/* Effet de halo lors du pulse */}
      {isPulsing && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-30 animate-ping scale-150" />
      )}
    </div>
  );
}
