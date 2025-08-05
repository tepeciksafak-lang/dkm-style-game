import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Star, Crown, Award, Zap } from "lucide-react";

const Preise = () => {
  const prizes = [
    {
      icon: <Crown className="text-dkm-yellow" size={48} />,
      title: "1. Platz",
      subtitle: "Hauptgewinn",
      description: "Exklusiver VIP-Zugang zur DKM 2025",
      details: [
        "Premium-Messeeintritt für 2 Personen",
        "VIP-Lounge Zugang",
        "Persönliche Führung durch die Highlights",
        "Meet & Greet mit Ausstellern",
        "Exklusives DKM 2025 Merchandise-Paket"
      ],
      color: "border-dkm-yellow/30 bg-dkm-yellow/5"
    },
    {
      icon: <Trophy className="text-dkm-turquoise" size={48} />,
      title: "2. Platz", 
      subtitle: "Silber-Paket",
      description: "Premium DKM 2025 Erlebnis",
      details: [
        "Messeeintritt für 2 Personen",
        "DKM 2025 Merchandise-Paket",
        "Gutschein für Messestand-Catering",
        "Exklusive DKM 2025 Tasche",
        "Digitales Messehandbuch"
      ],
      color: "border-dkm-turquoise/30 bg-dkm-turquoise/5"
    },
    {
      icon: <Award className="text-dkm-lime" size={48} />,
      title: "3. Platz",
      subtitle: "Bronze-Paket", 
      description: "DKM 2025 Starter-Paket",
      details: [
        "Messeeintritt für 1 Person",
        "DKM 2025 Merchandise-Set",
        "Messeplan und Programmheft",
        "Rabattgutscheine für Aussteller",
        "Digitaler Messekalender"
      ],
      color: "border-dkm-lime/30 bg-dkm-lime/5"
    }
  ];

  const participationPrizes = [
    {
      icon: <Gift className="text-dkm-navy" size={32} />,
      title: "Alle Teilnehmer",
      description: "Exklusiver 10% Rabattcode für DKM 2025 Tickets"
    },
    {
      icon: <Star className="text-dkm-turquoise" size={32} />,
      title: "5+ Punkte",
      description: "DKM 2025 Digital-Paket mit Wallpapern und Infos"
    },
    {
      icon: <Zap className="text-dkm-yellow" size={32} />,
      title: "7 Punkte",
      description: "Zusätzlich: Chance auf Sonderverlosung Premium-Paket"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-encode font-black text-5xl md:text-6xl text-dkm-navy mb-6">
              Preise & Gewinne
            </h1>
            <p className="font-encode text-xl text-gray-600 max-w-2xl mx-auto">
              Zeige dein DKM-Wissen und gewinne fantastische Preise für die Deutsche Kraftfahrzeug-Messe 2025!
            </p>
          </div>

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
                    {prize.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-dkm-turquoise rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <p className="font-encode text-sm text-gray-700">{detail}</p>
                      </div>
                    ))}
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
                  <p className="font-encode text-gray-600">
                    {prize.description}
                  </p>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    1
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Anmelden</h3>
                  <p className="font-encode text-gray-600">Registriere dich mit Name und E-Mail</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-turquoise rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    2
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Challenge spielen</h3>
                  <p className="font-encode text-gray-600">Beantworte 7 Fragen über die DKM</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-lime rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    3
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Punkte sammeln</h3>
                  <p className="font-encode text-gray-600">Erreiche möglichst viele Punkte</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-navy rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    4
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Gewinnen</h3>
                  <p className="font-encode text-gray-600">Sichere dir fantastische Preise</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Teilnahmebedingungen */}
          <Card className="p-8 mb-16 border-2 border-gray-200">
            <h2 className="font-encode font-black text-2xl text-dkm-navy mb-6">
              Wichtige Hinweise
            </h2>
            <div className="space-y-4 font-encode text-gray-700">
              <p>
                🏆 <strong>Gewinnbenachrichtigung:</strong> Die Gewinner werden per E-Mail benachrichtigt.
              </p>
              <p>
                📅 <strong>Gültigkeit:</strong> Alle Preise sind gültig für die DKM 2025 (26.-27. März 2025, Dortmund).
              </p>
              <p>
                🎫 <strong>Einlösung:</strong> Tickets und Gutscheine werden digital zugesendet.
              </p>
              <p>
                ⚖️ <strong>Rechtsweg:</strong> Der Rechtsweg ist ausgeschlossen. Barauszahlung ist nicht möglich.
              </p>
              <p>
                📧 <strong>Kontakt:</strong> Fragen zu den Preisen? Schreibe uns an gewinnspiel@dkm2025.de
              </p>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="font-encode font-black text-3xl text-dkm-navy mb-4">
              Worauf wartest du noch?
            </h3>
            <p className="font-encode text-lg text-gray-600 mb-8">
              Starte jetzt die Challenge und sichere dir deine Chance auf fantastische Preise!
            </p>
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => window.location.href = "/"}
              className="text-xl px-12 py-6"
            >
              Jetzt Challenge starten
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Preise;