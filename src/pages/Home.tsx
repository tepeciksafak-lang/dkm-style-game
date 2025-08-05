import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import heroBg from "@/assets/hero-dkm-background.jpg";
import landingStadium from "@/assets/landing-stadium-sunset.jpg";
import tunnelEntrance from "@/assets/tunnel-entrance.jpg";
import trophyCelebration from "@/assets/trophy-celebration.jpg";

const Home = () => {
  const [gameState, setGameState] = useState<"start" | "register" | "quiz" | "result">("start");
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setGameState("register");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && email.trim()) {
      setGameState("quiz");
    }
  };

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setGameState("result");
  };

  if (gameState === "quiz") {
    return <Quiz playerName={playerName} onComplete={handleQuizComplete} />;
  }

  if (gameState === "result") {
    return (
      <div 
        className="min-h-screen py-16 px-4 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${trophyCelebration})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <div className="mb-8">
            <h1 className="font-encode font-black text-4xl md:text-6xl text-white mb-6">
              Herzlichen Glückwunsch, {playerName}!
            </h1>
            <div className="text-6xl md:text-8xl font-encode font-black text-dkm-yellow mb-6">
              {score}/7
            </div>
            <p className="font-encode text-xl text-white mb-8">
              {score >= 6 
                ? "Wow! Du bist ein echter DKM-Experte! 🏆" 
                : score >= 4 
                ? "Sehr gut! Du kennst dich schon gut mit der DKM aus! 👏"
                : "Nicht schlecht! Schau gerne bei der DKM 2025 vorbei und lerne mehr! 💼"
              }
            </p>
            <p className="font-encode text-lg text-white/90 mb-8">
              Wir freuen uns darauf, dich auf der DKM 2025 vom 26.-27. März in Dortmund zu begrüßen!
            </p>
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => {
                setGameState("start");
                setPlayerName("");
                setEmail("");
                setScore(0);
              }}
              className="mr-4"
            >
              Zurück zum Start
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {gameState === "start" && (
        <>
          {/* Hero Section */}
          <section 
            className="relative py-32 px-4 min-h-[80vh] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${landingStadium})` }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-dkm-navy/70"></div>
            
            <div className="container mx-auto max-w-4xl text-center relative z-10">
              <h1 className="font-encode font-black text-5xl md:text-7xl text-white mb-6">
                DKM 2025 Quiz
              </h1>
              <p className="font-encode text-lg text-white/90 mb-4">
                Die Leitmesse für die Finanz- und Versicherungswirtschaft
              </p>
              <p className="font-encode font-semibold text-xl md:text-2xl text-white mb-16 max-w-2xl mx-auto leading-relaxed">
                Teste dein Wissen über die DKM und gewinne tolle Preise!
              </p>
              
              <Button 
                variant="dkm" 
                size="lg"
                onClick={handleStartQuiz}
                className="text-xl px-12 py-6 mb-16 bg-dkm-yellow hover:bg-dkm-yellow/90 text-dkm-navy font-bold"
              >
                Quiz starten
              </Button>
            </div>
            
            {/* Wellenform unten */}
            <div className="absolute bottom-0 left-0 right-0 h-32 dkm-wave-bottom"></div>
          </section>

          {/* Info Section */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8 text-center border-2 border-dkm-turquoise/20">
                  <div className="font-encode font-black text-4xl text-dkm-turquoise mb-4">7</div>
                  <h3 className="font-encode font-bold text-xl text-dkm-navy mb-2">Fragen</h3>
                  <p className="font-encode text-gray-600">Spannende Wahr/Falsch-Fragen rund um die DKM</p>
                </Card>
                
                <Card className="p-8 text-center border-2 border-dkm-yellow/20">
                  <div className="font-encode font-black text-4xl text-dkm-yellow mb-4">2</div>
                  <h3 className="font-encode font-bold text-xl text-dkm-navy mb-2">Tage</h3>
                  <p className="font-encode text-gray-600">Die DKM 2025 am 26.-27. März in Dortmund</p>
                </Card>
                
                <Card className="p-8 text-center border-2 border-dkm-lime/20">
                  <div className="font-encode font-black text-4xl text-dkm-lime mb-4">∞</div>
                  <h3 className="font-encode font-bold text-xl text-dkm-navy mb-2">Expertise</h3>
                  <p className="font-encode text-gray-600">Entdecke die Finanz- und Versicherungswelt</p>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      {gameState === "register" && (
        <section 
          className="min-h-screen flex items-center justify-center py-16 px-4 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${tunnelEntrance})` }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black/50"></div>
          <Card className="w-full max-w-md p-8 border-2 border-dkm-turquoise/20 shadow-[var(--shadow-smooth)] relative z-10 bg-white/95 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="font-encode font-black text-3xl text-dkm-navy mb-2">
                Fast geschafft!
              </h2>
              <p className="font-encode text-gray-600">
                Bitte gib deine Daten ein, um am Quiz teilzunehmen.
              </p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-encode font-bold text-dkm-navy">
                  Dein Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                  className="mt-2 border-2 border-gray-200 focus:border-dkm-turquoise rounded-xl"
                  placeholder="Wie heißt du?"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="font-encode font-bold text-dkm-navy">
                  E-Mail-Adresse *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 border-2 border-gray-200 focus:border-dkm-turquoise rounded-xl"
                  placeholder="deine@email.de"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="dkm" 
                size="lg"
                className="w-full"
                disabled={!playerName.trim() || !email.trim()}
              >
                Los geht's!
              </Button>
            </form>
          </Card>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Home;