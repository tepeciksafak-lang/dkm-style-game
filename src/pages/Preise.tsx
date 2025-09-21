import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Star, Crown, Award, Zap } from "lucide-react";
import championsLeagueCrowd from "@/assets/champions-league-crowd.jpg";

const Preise = () => {
  const prizes = [
    {
      icon: <Crown className="text-dkm-yellow" size={48} />,
      title: "Meister",
      subtitle: "Meistertitel",
      description: "",
      details: [
        "DKM Box im Wert von 999€",
        "1x 250€ Gutschein Möbelhaus", 
        "Employer Branding Workshop",
        "Alle Teilnahmepreise inklusive"
      ],
      color: "border-dkm-yellow/30 bg-dkm-yellow/5"
    },
    {
      icon: <Trophy className="text-dkm-turquoise" size={48} />,
      title: "Vizemeister", 
      subtitle: "Vizemeister-Paket",
      description: "",
      details: [
        "1x 250€ Gutschein",
        "Employer Branding Workshop",
        "Alle Teilnahmepreise inklusive"
      ],
      color: "border-dkm-turquoise/30 bg-dkm-turquoise/5"
    },
    {
      icon: <Award className="text-dkm-lime" size={48} />,
      title: "Pokalsieger",
      subtitle: "Pokal-Paket",
      description: "",
      details: [
        "Employer Branding Workshop",
        "Alle Teilnahmepreise inklusive"
      ],
      color: "border-dkm-lime/30 bg-dkm-lime/5"
    }
  ];

  const participationPrizes = [
    {
      icon: <Gift className="text-dkm-navy" size={32} />,
      title: "Alle Teilnehmer",
      description: "100€ Gutschein für den Salevium Shop & exklusiver Zugang zu den Top 3 Sales Training Videos von Coach Bilge"
    },
    {
      icon: <Star className="text-dkm-turquoise" size={32} />,
      title: "Erste 100 Online Teilnehmer",
      description: "KI SEO Audit im Wert von 150€"
    },
    {
      icon: <Zap className="text-dkm-yellow" size={32} />,
      title: "Erste 50 Teilnehmer am Stand",
      description: "Employer Branding Audit im Wert von 150€"
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
              Zeige dein DKM-Wissen und gewinne fantastische Preise!
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
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    1
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Anmelden</h3>
                  <p className="font-encode text-sm text-gray-600">Melde dich mit Name und E-Mail an</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-turquoise rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    2
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">3 Wissens-Challenges Online</h3>
                  <p className="font-encode text-sm text-gray-600">Beweise dein DKM-Wissen</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-yellow rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    3
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Live auf der Messe mit Kompetenz-Challenge</h3>
                  <p className="font-encode text-sm text-gray-600">Zeig dein Können vor Ort</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-lime rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-dkm-navy text-2xl">
                    4
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Hauptpreisverleihung</h3>
                  <p className="font-encode text-sm text-gray-600">Die besten werden geehrt</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dkm-navy rounded-full flex items-center justify-center mx-auto mb-4 font-encode font-black text-white text-2xl">
                    5
                  </div>
                  <h3 className="font-encode font-bold text-lg text-dkm-navy mb-2">Nachspielzeit</h3>
                  <p className="font-encode text-sm text-gray-600">Du erhältst deinen Teilnehmerpreis</p>
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
            Worauf wartest du noch?
          </h3>
          <p className="font-encode text-xl text-white mb-12 max-w-2xl mx-auto">
            Starte jetzt die Challenge und sichere dir deine Chance auf fantastische Preise!
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