import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dkm-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo und Event Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
               <img 
                 src="/lovable-uploads/c5646609-b9de-48f4-8629-f1a6644ba81e.png" 
                 alt="DKM Logo" 
                 className="h-12 w-auto"
               />
               <img 
                 src="/lovable-uploads/10f90abc-6172-4d47-8845-b51ffebd1ef3.png" 
                 alt="Salevium Logo" 
                 className="h-9 w-auto"
               />
            </div>
            <div className="font-encode space-y-2 text-gray-300">
              <p className="font-semibold">Die Leitmesse für die</p>
              <p className="font-semibold">Finanz- und Versicherungswirtschaft</p>
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
                  Die Challenge
                </a>
              </li>
              <li>
                <a href="/spielregeln" className="hover:text-dkm-yellow transition-colors">
                  Ablauf
                </a>
              </li>
              <li>
                <a href="/preise" className="hover:text-dkm-yellow transition-colors">
                  Preise
                </a>
              </li>
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

          {/* Kontakt */}
          <div>
            <h3 className="font-encode font-bold text-lg mb-4">Kontakt</h3>
            <div className="space-y-2 font-encode">
              <p className="text-gray-300">DKM Challenge</p>
              <a 
                href="mailto:dkm@salevium.de" 
                className="hover:text-dkm-yellow transition-colors block"
              >
                dkm@salevium.de
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-encode font-bold text-lg mb-4">Folge uns</h3>
            
            {/* DKM Social Media */}
            <div className="mb-6">
              <h4 className="font-encode font-semibold text-sm mb-2 text-gray-300">DKM</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/leitmesse/?locale=de_DE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                  aria-label="DKM Facebook"
                >
                  <Facebook size={18} className="text-white" />
                </a>
                <a
                  href="https://www.instagram.com/dkm_leitmesse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                  aria-label="DKM Instagram"
                >
                  <Instagram size={18} className="text-white" />
                </a>
                <a
                  href="https://www.linkedin.com/company/dkm-die-leitmesse/?originalSubdomain=de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                  aria-label="DKM LinkedIn"
                >
                  <Linkedin size={18} className="text-white" />
                </a>
              </div>
            </div>
            
            {/* Salevium Social Media */}
            <div>
              <h4 className="font-encode font-semibold text-sm mb-2 text-gray-300">Salevium</h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/company/salevium/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                  aria-label="Salevium LinkedIn"
                >
                  <Linkedin size={18} className="text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@salevium-0720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-dkm-turquoise hover:bg-dkm-yellow transition-colors"
                  aria-label="Salevium YouTube"
                >
                  <Youtube size={18} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dkm-turquoise/30 mt-8 pt-8 text-center font-encode text-gray-400">
          <p>&copy; 2025 DKM - Die Leitmesse. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;