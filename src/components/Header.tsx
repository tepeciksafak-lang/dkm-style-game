import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Die Challenge", href: "/" },
    { name: "Ablauf", href: "/spielregeln" },
    { name: "Preise", href: "/preise" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  return (
    <header className="relative">
      {/* Header mit linearem Verlauf */}
      <div className="dkm-header-gradient h-24 relative">
        <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
          {/* DKM Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/8849e965-2caf-4e2c-9c75-2ab85a4c2bbf.png" 
              alt="DKM Logo" 
              className="h-16 w-auto"
            />
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