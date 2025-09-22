import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info, Trophy, Users } from "lucide-react";
import refereeExplainingRules from "@/assets/referee-explaining-rules.jpg";
import challengeCtaBackground from "@/assets/challenge-cta-background.jpg";

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
              Alles was Sie über die DKM 2025 Challenge wissen müssen
            </p>
          </div>
        </div>
      </div>
      
      <main className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">

          {/* Spielregeln Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Teilnahme */}
            <Card className="p-8 border-2 border-dkm-navy/20">
              <div className="flex items-center mb-4">
                <Users className="text-dkm-navy mr-3" size={32} />
                <h2 className="font-encode font-black text-2xl text-dkm-navy">
                  Ihre Teilnahme
                </h2>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Jeder kann sich einfach anmelden und loslegen.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Antworten können nicht geändert werden.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Anonyme Teilnahme ist nicht möglich.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Eine Person kann pro Runde nur einmal teilnehmen.</p>
                </div>
              </div>
            </Card>

            {/* Challenge-Ablauf */}
            <Card className="p-8 border-2 border-orange-200">
              <div className="flex items-center mb-4">
                <Info className="text-orange-600 mr-3" size={32} />
                <h2 className="font-encode font-black text-2xl text-dkm-navy">
                  Challenge-Ablauf
                </h2>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-orange-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Sie absolvieren online 3 Wissens-Challenges und sammeln Supermakler-Punkte.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-orange-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Multiplizieren Sie auf der DKM am Stand von SALEVIUM Ihre Punkte, indem sie Ihr Können mit der SALES MATCH Master Box unter Beweis stellen (Halle 4, Stand C-16).</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-orange-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Jeder Teilnehmer erhält zwei Preise und hat die Chance auf weitere Preise im Gesamtwert von über 100.000 Euro.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-orange-600 mr-2 mt-1 flex-shrink-0" size={16} />
                  <p><a href="https://www.die-leitmesse.de/verlosungen" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-dkm-navy transition-colors underline">Alle Verlosungen auf die-leitmesse.de</a></p>
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
                  <p>Die Challenges unterliegen einer dynamischen Punktevergabe.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Die maximale Punktzahl liegt bei 2.688 Punkten.</p>
                </div>
              </div>
              <div className="space-y-4 font-encode text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Das Gesamtergebnis wird im Leaderboard sofort angezeigt.</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-dkm-navy mr-2 mt-1 flex-shrink-0" size={16} />
                  <p>Nach jeder Wissens-Challenge erhalten Sie einen individualisierten Supermakler-Prompt.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Rundenübersicht */}
          <Card className="p-8 mb-16 border-2 border-dkm-navy/20">
            <div className="flex items-center mb-6">
              <Info className="text-dkm-navy mr-3" size={32} />
              <h2 className="font-encode font-black text-2xl text-dkm-navy">
                Die 4 Runden im Überblick
              </h2>
            </div>
            <p className="font-encode text-lg text-gray-700 mb-8 text-center">
              Insgesamt erwarten Sie Online <strong>3 Wissens-Challenges</strong> und <strong>1 Kompetenz-Challenge</strong> direkt in der SALEVIUM Arena (Halle 4, Stand C-16) auf der DKM Messe 2025 in Dortmund!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Runde 1: Anpfiff */}
              <div className="text-center p-4 bg-dkm-navy/5 rounded-lg border border-dkm-navy/20">
                <div className="w-12 h-12 bg-dkm-navy/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-dkm-navy">1</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Anpfiff</h3>
                <p className="font-encode text-sm text-gray-600">
                 Der Schiedsrichter pfeift an – stellen Sie sich der ersten Runde und sichern Sie sich den perfekten Start!
                </p>
              </div>
              
              {/* Runde 2: Halbzeit */}
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-orange-600">2</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Kurz vor der Halbzeit</h3>
                <p className="font-encode text-sm text-gray-600">
                 Bleiben Sie konzentriert – die Pause naht, jetzt zählt jeder Punkt!
                </p>
              </div>
              
              {/* Runde 3: Zweite Halbzeit */}
              <div className="text-center p-4 bg-dkm-navy/5 rounded-lg border border-dkm-navy/20">
                <div className="w-12 h-12 bg-dkm-navy/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-dkm-navy">3</span>
                </div>
                <h3 className="font-encode font-bold text-dkm-navy mb-2">Zweite Halbzeit</h3>
                <p className="font-encode text-sm text-gray-600">
                 Jetzt wird's spannend – geben Sie noch einmal alles, das Finale ist zum Greifen nah!
                </p>
              </div>
              
              {/* Kompetenz-Challenge */}
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-encode font-black text-orange-600">🏆</span>
                </div>
                <h3 className="font-encode font-bold text-orange-600 mb-2">Schlussminuten</h3>
                <p className="font-encode text-sm text-gray-600">
                 Zeigen Sie Ihr Können live in der SALEVIUM Arena auf der DKM (Halle 4, Stand C-16)!
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-encode text-sm text-gray-600">
                Fragen zur Supermakler-Challenge? <a href="mailto:dkm@salevium.de" className="text-orange-600 hover:text-dkm-navy transition-colors">dkm@salevium.de</a>
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
                Der Rechtsweg ist ausgeschlossen. Mitarbeitende von SALEVIUM und der bbg Betriebsberatungs GmbH sind von der Challenge ausgeschlossen.
              </p>
              <p>
                ✅ <strong>Fairplay:</strong> Die Challenge basiert auf öffentlich verfügbaren Informationen zur DKM 2025.
              </p>
              <p>
                ✅ <strong>Technische Anforderungen:</strong> Die Challenge funktioniert auf allen modernen Browsern und Geräten.
              </p>
              <p>
                 ✅ <strong>Support:</strong> Bei technischen Problemen wenden Sie sich an unser Support-Team.
              </p>
            </div>
          </Card>

        </div>
      </main>

      {/* CTA with Full Width Background */}
      <div 
        className="relative py-32 px-8 text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${challengeCtaBackground})`
        }}
      >
        <div className="relative z-10">
          <h3 className="font-encode font-black text-4xl text-white mb-6">
            Bereit für die Challenge?
          </h3>
          <p className="font-encode text-xl text-white mb-12 max-w-2xl mx-auto">
            Werden Sie der erste DKM Supermakler!
          </p>
          <Button 
            variant="dkm" 
            size="lg"
            onClick={() => window.location.href = "/#register"}
            className="text-xl px-16 py-8"
          >
            Zur Challenge
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Spielregeln;