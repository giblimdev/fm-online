import { ReactNode } from "react";
import Nav from "../../components/layout/nav";

interface RituelsLayoutProps {
  children: ReactNode;
}

const RituelsLayout: React.FC<RituelsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation - largeur fixe sur desktop */}
          <nav className="md:w-64 flex-shrink-0">
            <Nav />
          </nav>

          {/* Contenu principal - s'étend pour remplir l'espace */}
          <section className="flex-1 bg-white  rounded-lg shadow-m">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RituelsLayout;
