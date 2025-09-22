import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Star, Medal, Search } from "lucide-react";
import championsLeagueCrowd from "@/assets/champions-league-crowd.jpg";

const Preise = () => {
  interface DetailItem {
    text: string;
    isLink: boolean;
  }

  interface Prize {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    details: (string | DetailItem)[];
    color: string;
  }

  interface ParticipationPrize {
    icon: React.ReactNode;
    title: string;
    description: string;
    links?: (string | DetailItem)[];
  }

  const prizes: Prize[] = [
    {
      icon: <Trophy className="text-dkm-yellow" size={48} />,
      title: "Supermakler 2025",
      subtitle: "Gold-Paket",
      description: "",
      details: [
        "Employer Branding Workshop im Wert von 4.500 Euro",
        { text: "https://www.convaix.de/", isLink: true },
        "Livinda-Gutschein für Möbel im Wert von 250 Euro", 
        { text: "https://livinda.de/", isLink: true },
        "SALES MATCH Master Box DKM Edition im Wert von 840 Euro",
        { text: "https://www.salevium.de/", isLink: true },
        
        "Zuzüglich Teilnahmepreise"
      ],
      color: "border-dkm-yellow/30 bg-dkm-yellow/5"
    },
    {
      icon: (
        <div className="relative">
          <Medal className="text-gray-400" size={48} />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">2</span>
        </div>
      ),
      title: "Vize-Supermakler", 
      subtitle: "Silber-Paket",
      description: "",
      details: [
        "Employer Branding Workshop im Wert von 4.500 Euro",
        { text: "https://www.convaix.de/", isLink: true },
        "Livinda-Gutschein für Möbel im Wert von 250 Euro", 
        { text: "https://livinda.de/", isLink: true },
        "Zuzüglich Teilnahmepreise"
      ],
      color: "border-gray-400/30 bg-gray-50"
    },
    {
      icon: (
        <div className="relative">
          <Medal className="text-amber-600" size={48} />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">3</span>
        </div>
      ),
      title: "Top 3 Supermakler",
      subtitle: "Bronze-Paket",
      description: "",
      details: [
        "Employer Branding Workshop im Wert von 4.500 Euro",
        { text: "https://www.convaix.de/", isLink: true },
        "Zuzüglich Teilnahmepreise"
      ],
      color: "border-amber-600/30 bg-amber-50"
    }
  ];

  const participationPrizes: ParticipationPrize[] = [
    {
      icon: <Gift className="text-dkm-navy" size={32} />,
      title: "Jeder Teilnehmer",
      description: "SALEVIUM-Gutschein im Wert von 100 €",
      links: [
        "Exklusiver Zugang zu den Top 3 Sales Videos von Bilgehan Karatas (Geschäftsführer SALEVIUM)",
        { text: "https://www.salevium.de/", isLink: true }
      ]
    },
    {
      icon: <Search className="text-dkm-turquoise" size={32} />,
      title: "Die ersten 100 Online-Teilnehmer",
      description: "15 Minuten AI SEO Audit inkl. vier Analysen im Wert von 150 €",
      links: [
        { text: "https://klickdojo.de/", isLink: true }
      ]
    },
    {
      icon: <Star className="text-dkm-yellow" size={32} />,
      title: "Die ersten 50 Teilnehmer in der SALEVIUM-Arena",
      description: "Employer-Branding-Analyse inkl. Scorecard und Loom-Videofeedback im Wert von 500 €",
      links: [
        { text: "https://www.convaix.de/", isLink: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section mit Champions League Crowd */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${championsLeagueCrowd})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-encode font-black text-4xl md:text-6xl mb-4">
              Preise
            </h1>
            <p className="font-encode text-lg md:text-xl max-w-2xl">
              Meistern Sie die DKM-Challenge und gewinnen fantastische Preise im Gesamtwert von über 77.777€!
            </p>
          </div>
        </div>
      </div>
      
      <main className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">

          {/* Hauptpreise */}
          <div className="mb-20">
            <h2 className="font-encode font-black text-3xl text-dkm-navy text-center mb-12">
              Hauptpreise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {prizes.map((prize, index) => (
                <Card key={index} className={`p-8 ${prize.color} border-2 hover:shadow-[var(--shadow-smooth)] transition-all duration-300`}>
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      {prize.icon}
                    </div>
                    <h3 className="font-encode font-black text-2xl text-dkm-navy mb-2">
                      {prize.title}
                    </h3>
                    <p className="font-encode font-bold text-lg text-gray-600 mb-4">
                      {prize.subtitle}
                    </p>
                    <p className="font-encode text-gray-700 mb-6">
                      {prize.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {prize.details.map((detail, detailIndex) => {
                      if (typeof detail === 'object' && detail.isLink) {
                        return (
                          <div key={detailIndex} className="text-left">
                            <a 
                              href={detail.text} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-encode text-sm text-dkm-turquoise hover:text-dkm-navy transition-colors underline"
                            >
                              {detail.text}
                            </a>
                          </div>
                        );
                      }
                        return (
                          <div key={detailIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-dkm-turquoise rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p className="font-encode text-sm text-gray-700">{detail as string}</p>
                          </div>
                        );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Teilnahmepreise */}
          <div className="mb-16">
            <h2 className="font-encode font-black text-3xl text-dkm-navy text-center mb-12">
              Teilnahmepreise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {participationPrizes.map((prize, index) => (
                <Card key={index} className="p-6 border-2 border-gray-200 text-center hover:shadow-[var(--shadow-smooth)] transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    {prize.icon}
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-3">
                    {prize.title}
                  </h3>
                  <p className="font-encode text-gray-600 mb-3">
                    {prize.description}
                  </p>
                  {prize.links && (
                    <div className="space-y-2">
                      {prize.links.map((link, linkIndex) => {
                        if (typeof link === 'object' && link.isLink) {
                          return (
                            <div key={linkIndex}>
                              <a 
                                href={link.text} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-encode text-sm text-dkm-turquoise hover:text-dkm-navy transition-colors underline"
                              >
                                {link.text}
                              </a>
                            </div>
                          );
                        }
                          return (
                            <p key={linkIndex} className="font-encode text-sm text-gray-600">
                              {link as string}
                            </p>
                          );
                      })}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Gewinnspiel-Info */}
          <Card className="p-8 mb-16 bg-gradient-to-r from-dkm-navy/5 to-dkm-turquoise/5 border-2 border-dkm-turquoise/20">
            <div className="text-center">
              <h2 className="font-encode font-black text-3xl text-dkm-navy mb-6">
                So funktioniert's
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    1
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Anmelden</h3>
                  <p className="font-encode text-sm text-gray-600">Melden Sie sich mit Namen und E-Mail an.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-turquoise rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    2
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">DKM-Wissen</h3>
                  <p className="font-encode text-sm text-gray-600">Beweisen Sie Ihr DKM-Wissen.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    3
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Vor Ort</h3>
                  <p className="font-encode text-sm text-gray-600">Zeigen Sie vor Ort Ihr Können.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-lime rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    4
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Ehrung</h3>
                  <p className="font-encode text-sm text-gray-600">Die Besten werden live in der SALEVIUM-Arena geehrt.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-navy rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    5
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Teilnahmepreis</h3>
                  <p className="font-encode text-sm text-gray-600">Sie erhalten per E-Mail Ihren Teilnahmepreis.</p>
                </div>
              </div>
            </div>
          </Card>


        </div>
      </main>

      {/* CTA with Full Width Background */}
      <div 
        className="relative py-32 px-8 text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${championsLeagueCrowd})`
        }}
      >
        <div className="relative z-10">
          <h3 className="font-encode font-black text-4xl text-white mb-6">
            Worauf warten Sie noch?
          </h3>
          <p className="font-encode text-xl text-white mb-12 max-w-2xl mx-auto">
            Starten Sie jetzt Ihre Challenge und sichern Sie sich Ihre Chance auf die fantastischen Preise im Gesamtwert von über 77.777€.
          </p>
          <Button 
            variant="dkm" 
            size="lg"
            onClick={() => window.location.href = "/#register"}
            className="text-xl px-16 py-8"
          >
            Anpfiff
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Preise;