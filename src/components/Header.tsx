import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Spielregeln", href: "/spielregeln" },
    { name: "Preise", href: "/preise" },
  ];

  return (
    <header className="relative">
      {/* Wellenform Hintergrund */}
      <div className="dkm-wave-header h-24 relative">
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
          {/* DKM Logo mit Leuchtturm-Icon */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              {/* Vereinfachtes Leuchtturm-Icon */}
              <div className="relative">
                <div className="w-8 h-12 bg-white rounded-t-lg relative">
                  <div className="w-6 h-2 bg-dkm-yellow absolute top-2 left-1 rounded"></div>
                  <div className="w-6 h-2 bg-white absolute top-5 left-1 rounded"></div>
                  <div className="w-6 h-2 bg-dkm-yellow absolute top-8 left-1 rounded"></div>
                  <div className="w-10 h-3 bg-white absolute -top-1 -left-1 rounded-full"></div>
                </div>
                <div className="w-10 h-4 bg-white absolute -bottom-1 -left-1 rounded-b-lg"></div>
              </div>
              <div className="ml-2">
                <div className="font-encode font-black text-3xl text-white tracking-tight">
                  DKM
                </div>
                <div className="font-encode text-xs text-white/90 leading-tight -mt-1">
                  DIE LEITMESSE
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-encode font-bold text-white hover:text-dkm-yellow transition-colors ${
                  location.pathname === item.href ? "text-dkm-yellow" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-dkm-yellow"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dkm-navy border-t border-dkm-turquoise">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block font-encode font-bold text-white hover:text-dkm-yellow transition-colors py-2 ${
                  location.pathname === item.href ? "text-dkm-yellow" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;