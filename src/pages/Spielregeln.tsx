import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info, Trophy, Users } from "lucide-react";
import refereeExplainingRules from "@/assets/referee-explaining-rules.jpg";

const Spielregeln = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section mit Referee Bild */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${refereeExplainingRules})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-encode font-black text-4xl md:text-6xl mb-4">
              Ablauf
            </h1>
            <p className="font-encode text-lg md:text-xl max-w-2xl">
              Alles was du über die DKM 2025 Challenge wissen musst
            </p>
          </div>
        </div>
      </div>
      
      <main className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">

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
                  <p>Eine Person kann pro Runde nur einmal teilnehmen</p>
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
          <Card className="p-8 mb-16 border-2 border-dkm-navy/20">
            <div className="flex items-center mb-6">
              <Trophy className="text-dkm-navy mr-3" size={32} />
              <h2 className="font-encode font-black text-2xl text-dkm-navy">
                Bewertung & Ergebnis
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Jede richtige Antwort gibt 1 Punkt</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Maximum: 7 von 7 Punkten</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Keine Einzelergebnisse sichtbar</p>
                </div>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Sofortige Anzeige des Gesamtergebnisses</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Personalisierte Erfolgsmeldung</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Motivationstext je nach Leistung</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Rundenübersicht */}
          <Card className="p-8 mb-16 border-2 border-dkm-turquoise/20">
            <div className="flex items-center mb-6">
              <Info className="text-dkm-turquoise mr-3" size={32} />
              <h2 className="font-encode font-black text-2xl text-dkm-navy">
                Die 4 Runden im Überblick
              </h2>
            </div>
            <p className="font-encode text-lg text-gray-700 mb-8 text-center">
              Insgesamt erwarten dich <strong>3 Online-Quizrunden</strong> und <strong>1 Live-Runde</strong> direkt auf der DKM 2025 in Dortmund!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Runde 1: Anpfiff */}
              <div className="text-center p-4 bg-dkm-turquoise/5 rounded-lg border border-dkm-turquoise/20">
                <div className="w-12 h-12 bg-dkm-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-dkm-turquoise">1</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Anpfiff</h3>
                <p className="font-encode text-sm text-gray-600">
                  Der Schiedsrichter pfeift an – stelle dich der ersten Runde und sichere dir den perfekten Start!
                </p>
              </div>
              
              {/* Runde 2: Halbzeit */}
              <div className="text-center p-4 bg-dkm-yellow/5 rounded-lg border border-dkm-yellow/20">
                <div className="w-12 h-12 bg-dkm-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-dkm-yellow">2</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Kurz vor der Halbzeit</h3>
                <p className="font-encode text-sm text-gray-600">
                  Bleib konzentriert – die Pause naht, jetzt zählt jeder Punkt!
                </p>
              </div>
              
              {/* Runde 3: Zweite Halbzeit */}
              <div className="text-center p-4 bg-dkm-navy/5 rounded-lg border border-dkm-navy/20">
                <div className="w-12 h-12 bg-dkm-navy/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-dkm-navy">3</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Zweite Halbzeit</h3>
                <p className="font-encode text-sm text-gray-600">
                  Jetzt wird's spannend – gib noch einmal alles, das Finale ist zum Greifen nah!
                </p>
              </div>
              
              {/* Live-Runde */}
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-orange-600">🏆</span>
                </div>
                <h3 className="font-encode font-bold text-orange-600 mb-2">Finale am Spielfeldrand</h3>
                <p className="font-encode text-sm text-gray-600">
                  Zeig dein Können live am Salevium-Stand auf der Messe – exklusive Preise warten auf dich!
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-encode text-sm text-gray-600">
                Fragen zur Live-Runde? <a href="mailto:dkm@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">dkm@salevium.de</a>
              </p>
            </div>
          </Card>

          {/* Wichtige Hinweise */}
          <Card className="p-8 mb-16 bg-orange-50 border-2 border-orange-200">
            <h2 className="font-encode font-black text-2xl text-orange-600 mb-6">
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