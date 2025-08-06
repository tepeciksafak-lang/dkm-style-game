import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dkm-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo und Event Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/8849e965-2caf-4e2c-9c75-2ab85a4c2bbf.png" 
                alt="DKM Logo" 
                className="h-12 w-auto"
              />
              <img 
                src="/lovable-uploads/169b942d-e497-405b-a013-0fb3e9606734.png" 
                alt="Salevium Logo" 
                className="h-9 w-auto"
              />
            </div>
            <div className="font-encode space-y-2 text-gray-300">
              <p className="font-semibold">Die Leitmesse für die Finanz- und Versicherungswirtschaft</p>
              <p>28.–29. Oktober 2025</p>
              <p>Dortmund, Deutschland</p>
              <p>Messe Westfalenhallen</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-encode font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2 font-encode">
              <li>
                <a href="/" className="hover:text-dkm-yellow transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/spielregeln" className="hover:text-dkm-yellow transition-colors">
                  Spielregeln
                </a>
              </li>
              <li>
                <a href="/preise" className="hover:text-dkm-yellow transition-colors">
                  Preise
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-encode font-bold text-lg mb-4">Rechtliches</h3>
            <ul className="space-y-2 font-encode">
              <li>
                <a href="/datenschutz" className="hover:text-dkm-yellow transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/impressum" className="hover:text-dkm-yellow transition-colors">
                  Impressum
                </a>
              </li>
            </ul>
          </div>

          {/* DKM Social Media */}
          <div>
            <h3 className="font-encode font-bold text-lg mb-4">DKM folgen</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.facebook.com/leitmesse/?locale=de_DE"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                aria-label="DKM Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/dkm_leitmesse/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                aria-label="DKM Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/dkm-die-leitmesse/?originalSubdomain=de"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                aria-label="DKM LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
            
            {/* Salevium Social Media */}
            <h3 className="font-encode font-bold text-lg mb-4">Salevium folgen</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/salevium/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                aria-label="Salevium LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dkm-turquoise/30 mt-8 pt-8 text-center font-encode text-gray-400">
          <p>&copy; 2025 DKM - Deutsche Kraftfahrzeug-Messe. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;