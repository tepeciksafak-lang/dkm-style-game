import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info, Trophy, Users } from "lucide-react";

const Spielregeln = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-encode font-black text-5xl md:text-6xl text-dkm-navy mb-6">
              Ablauf
            </h1>
            <p className="font-encode text-xl text-gray-600 max-w-2xl mx-auto">
              Alles was du über die DKM 2025 Challenge wissen musst – einfach, fair und transparent.
            </p>
          </div>

          {/* Spielregeln Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Teilnahme */}
            <Card className="p-8 border-2 border-dkm-turquoise/20">
              <div className="flex items-center mb-4">
                <Users className="text-dkm-turquoise mr-3" size={32} />
                <h2 className="font-encode font-black text-2xl text-dkm-navy">
                  Teilnahme
                </h2>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-turquoise mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Vollständige Registrierung mit Name und E-Mail-Adresse erforderlich</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-turquoise mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Anonyme Teilnahme ist nicht möglich</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-turquoise mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Eine Person kann mehrmals teilnehmen</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-turquoise mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Teilnahme ab 16 Jahren</p>
                </div>
              </div>
            </Card>

            {/* Challenge-Ablauf */}
            <Card className="p-8 border-2 border-dkm-yellow/20">
              <div className="flex items-center mb-4">
                <Info className="text-dkm-yellow mr-3" size={32} />
                <h2 className="font-encode font-black text-2xl text-dkm-navy">
                  Challenge-Ablauf
                </h2>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-yellow mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Insgesamt 7 Wahr/Falsch-Fragen</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-yellow mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Keine Zeitbegrenzung pro Frage</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-yellow mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Antworten können nicht geändert werden</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-yellow mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Progressbar zeigt den Fortschritt</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Bewertung */}
          <Card className="p-8 mb-16 border-2 border-dkm-lime/20">
            <div className="flex items-center mb-6">
              <Trophy className="text-dkm-lime mr-3" size={32} />
              <h2 className="font-encode font-black text-2xl text-dkm-navy">
                Bewertung & Ergebnis
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Jede richtige Antwort gibt 1 Punkt</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Maximum: 7 von 7 Punkten</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Keine Einzelergebnisse sichtbar</p>
                </div>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Sofortige Anzeige des Gesamtergebnisses</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Personalisierte Erfolgsmeldung</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-lime mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Motivationstext je nach Leistung</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Wichtige Hinweise */}
          <Card className="p-8 mb-16 bg-gray-50 border-2 border-gray-200">
            <h2 className="font-encode font-black text-2xl text-dkm-navy mb-6">
              Wichtige Hinweise
            </h2>
            <div className="space-y-4 font-encode text-gray-700">
              <p>
                ✅ <strong>Fairplay:</strong> Die Challenge basiert auf öffentlich verfügbaren Informationen zur DKM 2025.
              </p>
              <p>
                ✅ <strong>Datenschutz:</strong> Deine Daten werden nur für die Challenge-Teilnahme verwendet und nicht an Dritte weitergegeben.
              </p>
              <p>
                ✅ <strong>Technische Anforderungen:</strong> Die Challenge funktioniert auf allen modernen Browsern und Geräten.
              </p>
              <p>
                ✅ <strong>Support:</strong> Bei technischen Problemen wende dich an unser Support-Team.
              </p>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h3 className="font-encode font-black text-3xl text-dkm-navy mb-4">
              Bereit für die Challenge?
            </h3>
            <p className="font-encode text-lg text-gray-600 mb-8">
              Teste jetzt dein Wissen über die DKM 2025!
            </p>
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => window.location.href = "/"}
              className="text-xl px-12 py-6"
            >
              Zur Challenge
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Spielregeln;