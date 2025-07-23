// components/layout/header/Logo.tsx
import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
  alt?: string;
}

const sizeMap = {
  sm: { width: 80, height: 26 },
  md: { width: 120, height: 40 },
  lg: { width: 160, height: 53 },
  xl: { width: 200, height: 66 },
};

export default function Logo({
  size = "md",
  className = "",
  priority = false,
  alt = "Logo de l'application",
}: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/téléchargement.jpeg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-contain"
        sizes="(max-width: 768px) 100px, 120px"
      />
    </div>
  );
}
