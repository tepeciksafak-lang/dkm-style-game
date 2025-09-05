import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Challenge from "@/components/Quiz";
import heroBg from "@/assets/hero-dkm-background.jpg";
import landingStadium from "@/assets/landing-stadium-sunset.jpg";
import tunnelEntrance from "@/assets/tunnel-entrance.jpg";
import trophyCelebration from "@/assets/trophy-celebration.jpg";
import box1Kickoff from "@/assets/box1-kickoff.jpg";
import box2Halftime from "@/assets/box2-halftime.jpg";
import box3FinalWhistle from "@/assets/box3-final-whistle.jpg";
import box4LiveChallenge from "@/assets/box4-live-challenge.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [gameState, setGameState] = useState<"start" | "register" | "challenge" | "result">("start");
  const [playerName, setPlayerName] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if URL contains #register to automatically show registration
    if (window.location.hash === '#register') {
      setGameState("register");
    }
  }, []);

  const handleStartChallenge = () => {
    setGameState("register");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && email.trim()) {
      setIsSubmitting(true);
      
      try {
        // Check if email already exists in database for round 1
        if (roundNumber === 1) {
          const { data: existingUser, error } = await supabase
            .from("ok")
            .select("Mailadresse, Rundenr")
            .eq("Mailadresse", email.trim())
            .eq("Rundenr", "1")
            .maybeSingle();
          
          if (error) {
            console.error("Database query error:", error);
            toast({
              title: "Fehler",
              description: "Es gab ein Problem bei der Überprüfung. Bitte versuche es erneut.",
              variant: "destructive",
            });
            return;
          }
          
          if (existingUser) {
            toast({
              title: "E-Mail bereits registriert",
              description: "Diese E-Mail-Adresse wurde bereits für Runde 1 verwendet. Bitte nutze eine andere E-Mail-Adresse.",
              variant: "destructive",
            });
            return;
          }
        }
        
        setGameState("challenge");
      } catch (error) {
        console.error("Registration error:", error);
        toast({
          title: "Fehler",
          description: "Es gab ein Problem bei der Registrierung. Bitte versuche es erneut.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

const handleChallengeComplete = async (finalScore: number) => {
  setScore(finalScore);
  try {
    await supabase.from("ok").insert({
      Username: playerName,
      Mailadresse: email,
      Rundenr: String(roundNumber),
      Punkte: String(finalScore),
    });
  } catch (e) {
    console.error("Supabase insert error", e);
  } finally {
    // Redirect to leaderboard with player name
    navigate(`/leaderboard?player=${encodeURIComponent(playerName)}`);
  }
};

  if (gameState === "challenge") {
    return <Challenge playerName={playerName} onComplete={handleChallengeComplete} />;
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
              <h1 className="font-encode font-black text-5xl md:text-7xl text-white mb-8">
                DKM sucht den Supermakler 2025
              </h1>
              <p className="font-encode text-xl text-white mb-16">
                Stellen Sie Ihr Wissen über die DKM und Ihr Können auf der DKM unter Beweis
              </p>
              
              <Button 
                variant="dkm" 
                size="lg"
                onClick={handleStartChallenge}
                className="text-xl px-12 py-6 mb-16 bg-dkm-yellow hover:bg-dkm-yellow/90 text-dkm-navy font-bold"
              >
                Anpiff
              </Button>
            </div>
            
            {/* Wellenform unten */}
            <div className="absolute bottom-0 left-0 right-0 h-32 dkm-wave-bottom"></div>
          </section>

          {/* Challenge Milestone Section */}
          <section className="py-20 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Level 1: Kickoff */}
                <Card className="overflow-hidden border-2 border-dkm-turquoise/20 hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${box1Kickoff})` }}
                  >
                    <div className="absolute inset-0 bg-dkm-navy/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-encode font-bold text-lg text-white mb-1">Anpfiff</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-encode text-dkm-navy font-semibold text-sm">
                      Der Schiedsrichter pfeift an – stellen Sie sich der ersten Runde und sichern Sie sich den perfekten Start!
                    </p>
                  </div>
                </Card>
                
                {/* Level 2: Halftime */}
                <Card className="overflow-hidden border-2 border-dkm-yellow/20 hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${box2Halftime})` }}
                  >
                    <div className="absolute inset-0 bg-dkm-navy/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-encode font-bold text-lg text-white mb-1">Kurz vor der Halbzeit</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-encode text-dkm-navy font-semibold text-sm">
                      Bleiben Sie konzentriert – die Pause naht, jetzt zählt jeder Punkt!
                    </p>
                  </div>
                </Card>
                
                {/* Level 3: Final Whistle */}
                <Card className="overflow-hidden border-2 border-dkm-lime/20 hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${box3FinalWhistle})` }}
                  >
                    <div className="absolute inset-0 bg-dkm-navy/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-encode font-bold text-lg text-white mb-1">Zweite Halbzeit</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-encode text-dkm-navy font-semibold text-sm">
                      Jetzt wird's spannend – geben Sie noch einmal alles, das Finale ist zum Greifen nah!
                    </p>
                  </div>
                </Card>
                
                {/* Live Challenge */}
                <Card className="overflow-hidden border-2 border-dkm-turquoise/20 hover:shadow-lg transition-shadow duration-300">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${box4LiveChallenge})` }}
                  >
                    <div className="absolute inset-0 bg-dkm-navy/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-encode font-bold text-lg text-white mb-1">Schlussminuten</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-encode text-dkm-navy font-semibold text-sm mb-3">
                      Zeigen Sie Ihr Können Live in der Salevium Arena auf der DKM Messe
                    </p>
                    <p className="font-encode text-xs text-gray-600">
                      Fragen? <a href="mailto:dkm@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">dkm@salevium.de</a>
                    </p>
                  </div>
                </Card>
              </div>
              
              {/* Second CTA Button */}
              <div className="text-center mt-16">
                <Button 
                  variant="dkm" 
                  size="lg"
                  onClick={handleStartChallenge}
                  className="text-xl px-12 py-6 bg-dkm-yellow hover:bg-dkm-yellow/90 text-dkm-navy font-bold"
                >
                  Anpiff
                </Button>
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
                Ziehen Sie Ihr Trikot an
              </h2>
              <p className="font-encode text-gray-600">
                Bitte geben Sie Ihre Daten ein, um an der Challenge teilzunehmen.
              </p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-encode font-bold text-dkm-navy">
                  Ihr Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                  className="mt-2 border-2 border-gray-200 focus:border-dkm-turquoise rounded-xl"
                  placeholder="Wie heißen Sie?"
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
                  placeholder="ihre@email.de"
                />
</div>

<div>
  <Label className="font-encode font-bold text-dkm-navy">
    Runde
  </Label>
  <RadioGroup
    value={String(roundNumber)}
    onValueChange={(val) => setRoundNumber(parseInt(val))}
    className="mt-2"
  >
    <div className="grid grid-cols-3 gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1" id="round1" />
        <Label htmlFor="round1" className="font-encode">Runde 1</Label>
      </div>
      <div className="flex items-center space-x-2 opacity-60">
        <RadioGroupItem value="2" id="round2" disabled />
        <Label htmlFor="round2" className="font-encode">Runde 2</Label>
      </div>
      <div className="flex items-center space-x-2 opacity-60">
        <RadioGroupItem value="3" id="round3" disabled />
        <Label htmlFor="round3" className="font-encode">Runde 3</Label>
      </div>
    </div>
  </RadioGroup>
  <p className="mt-1 text-sm text-gray-600">Runden 2 und 3 sind sichtbar, aber noch nicht auswählbar.</p>
</div>

                <Button 
                  type="submit" 
                  variant="dkm" 
                  size="lg"
                  className="w-full"
                  disabled={!playerName.trim() || !email.trim() || isSubmitting}
                >
                  {isSubmitting ? "Wird überprüft..." : "Los geht's!"}
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