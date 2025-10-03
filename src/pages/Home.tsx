import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [score, setScore] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResultSubmitted, setIsResultSubmitted] = useState(false);

  // Test user authorization
  const TEST_USERS = ['safak.t@gmx.de', 'info@salevium.de'];
  
  const isTestUser = (emailAddress: string): boolean => {
    return TEST_USERS.includes(emailAddress.trim().toLowerCase());
  };

  // Test webhook wurde entfernt - jetzt Live-Betrieb

  // Enhanced fail-safe mechanisms
  const [submissionAttempts, setSubmissionAttempts] = useState<Map<string, number>>(new Map());
  const MAX_ATTEMPTS_PER_EMAIL_ROUND = 3;
  const SUBMISSION_COOLDOWN = 300000; // 5 minutes
  
  const checkRateLimit = () => {
    const now = Date.now();
    const rateLimitKey = 'webhook_rate_limit';
    const rateLimitData = localStorage.getItem(rateLimitKey);
    
    let requests: number[] = [];
    if (rateLimitData) {
      try {
        requests = JSON.parse(rateLimitData);
      } catch (e) {
        console.error("Error parsing rate limit data:", e);
      }
    }
    
    // Entferne Requests älter als 1 Minute (60000ms)
    const oneMinuteAgo = now - 60000;
    requests = requests.filter(timestamp => timestamp > oneMinuteAgo);
    
    // Prüfe ob Limit erreicht ist
    if (requests.length >= 10) {
      console.warn("Rate limit reached: 10 requests per minute exceeded");
      toast({
        title: "Rate Limit erreicht",
        description: "Zu viele Anfragen. Versuchen Sie es in einer Minute erneut.",
        variant: "destructive",
      });
      return false;
    }
    
    // Füge aktuelle Request hinzu
    requests.push(now);
    localStorage.setItem(rateLimitKey, JSON.stringify(requests));
    
    return true;
  };

  const checkSubmissionLimit = (email: string, round: string): boolean => {
    const key = `${email}_${round}`;
    const attempts = submissionAttempts.get(key) || 0;
    const lastAttemptKey = `last_attempt_${key}`;
    const lastAttempt = localStorage.getItem(lastAttemptKey);
    
    if (lastAttempt) {
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt);
      if (attempts >= MAX_ATTEMPTS_PER_EMAIL_ROUND && timeSinceLastAttempt < SUBMISSION_COOLDOWN) {
        const remainingTime = Math.ceil((SUBMISSION_COOLDOWN - timeSinceLastAttempt) / 60000);
        toast({
          title: "Submission Limit erreicht",
          description: `Bitte warten Sie ${remainingTime} Minuten, bevor Sie es erneut versuchen.`,
          variant: "destructive",
        });
        return false;
      }
      
      // Reset attempts if cooldown period has passed
      if (timeSinceLastAttempt >= SUBMISSION_COOLDOWN) {
        setSubmissionAttempts(prev => new Map(prev.set(key, 0)));
        localStorage.removeItem(lastAttemptKey);
      }
    }
    
    return attempts < MAX_ATTEMPTS_PER_EMAIL_ROUND;
  };

  const incrementSubmissionAttempt = (email: string, round: string): void => {
    const key = `${email}_${round}`;
    const currentAttempts = submissionAttempts.get(key) || 0;
    const newAttempts = currentAttempts + 1;
    setSubmissionAttempts(prev => new Map(prev.set(key, newAttempts)));
    localStorage.setItem(`last_attempt_${key}`, Date.now().toString());
  };

  const generateRequestId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

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
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !gender.trim()) {
      toast({
        title: "Bitte alle Felder ausfüllen",
        description: "Vor- und Nachname, E-Mail-Adresse und Geschlecht sind erforderlich.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Check if this is a test user - if yes, bypass all restrictions
      if (isTestUser(email)) {
        console.log("Test user detected, bypassing all restrictions");
        setGameState("challenge");
        setIsSubmitting(false);
        return;
      }

      // First, check if email already exists for the current round
      const { data: existingRoundData, error: existingRoundError } = await supabase
        .from("ok")
        .select("Mailadresse, Rundenr")
        .eq("Mailadresse", email.trim().toLowerCase())
        .eq("Rundenr", String(roundNumber))
        .maybeSingle();
        
      if (existingRoundError) {
        console.warn("Skipping duplicate check due to insufficient SELECT permissions:", existingRoundError);
      } else if (existingRoundData) {
        toast({
          title: "E-Mail bereits verwendet",
          description: `Diese E-Mail-Adresse wurde bereits für Runde ${roundNumber} verwendet. Bitte nutzen Sie eine andere E-Mail-Adresse.`,
          variant: "destructive",
        });
        return;
      }


      let missingRounds: string[] = [];
      
      if (roundNumber === 1) {
        // Round 1 can proceed directly after email check
      } else if (roundNumber === 2) {
        // Prüfe ob Runde 1 abgeschlossen ist
        const { data: round1Data, error: round1Error } = await supabase
          .from("ok")
          .select("Mailadresse, Rundenr")
          .eq("Mailadresse", email.trim().toLowerCase())
          .eq("Rundenr", "1")
          .maybeSingle();
          
        if (round1Error) {
          console.warn("Skipping prerequisite check for Runde 1 due to insufficient SELECT permissions:", round1Error);
        }
        
        // Only enforce if we could check and found no record
        if (!round1Error && !round1Data) {
          missingRounds.push("Runde 1");
        }

      } else if (roundNumber === 3) {
        // Prüfe ob Runde 1 und 2 abgeschlossen sind
        const { data: completedRounds, error: roundsError } = await supabase
          .from("ok")
          .select("Rundenr")
          .eq("Mailadresse", email.trim().toLowerCase())
          .in("Rundenr", ["1", "2"]);
          
        if (roundsError) {
          console.warn("Skipping prerequisite check for Runden 1 und 2 due to insufficient SELECT permissions:", roundsError);
        } else {
          const completedRoundNumbers = completedRounds?.map(r => r.Rundenr) || [];
          if (!completedRoundNumbers.includes("1")) {
            missingRounds.push("Runde 1");
          }
          if (!completedRoundNumbers.includes("2")) {
            missingRounds.push("Runde 2");
          }
        }

      }
      
      if (missingRounds.length > 0) {
        toast({
          title: "Voraussetzungen nicht erfüllt",
          description: `Sie müssen zuerst ${missingRounds.join(" und ")} abschließen, bevor Sie an Runde ${roundNumber} teilnehmen können.`,
          variant: "destructive",
        });
        return;
      }
      
      // Alle Prüfungen bestanden - weiter zur Challenge
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
  };

const handleChallengeComplete = async (finalScore: number) => {
  // Prevent multiple submissions
  if (isResultSubmitted) {
    console.log("Result already submitted, skipping...");
    return;
  }
  
  // Check submission limits
  if (!checkSubmissionLimit(email, String(roundNumber))) {
    return;
  }
  
  setIsResultSubmitted(true);
  setScore(finalScore);
  const newTotalScore = totalScore + finalScore;
  setTotalScore(newTotalScore);
  
  const fullName = `${firstName} ${lastName}`;
  const requestId = generateRequestId();
  
  try {
    // Enhanced database insert with better error handling
    console.log('Attempting Supabase insert:', {
      Username: fullName,
      Mailadresse: email,
      Rundenr: String(roundNumber),
      Punkte: String(finalScore),
    });
    
    const { error: insertError } = await supabase
      .from("ok")
      .insert({
        Username: fullName,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        Mailadresse: email.trim().toLowerCase(),
        Rundenr: String(roundNumber),
        Punkte: String(finalScore),
      });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      
      // Handle unique constraint violation - check for both possible constraint names
      if (insertError.message?.includes('unique_email_round') || 
          insertError.message?.includes('ok_mailadresse_rundenr_key') ||
          insertError.message?.includes('duplicate key value violates unique constraint')) {
        toast({
          title: "Bereits teilgenommen",
          description: "Sie haben bereits an dieser Runde teilgenommen.",
          variant: "destructive",
        });
        return;
      }
      
      // Show general error for other database issues
      toast({
        title: "Datenbankfehler",
        description: `Fehler beim Speichern: ${insertError.message}`,
        variant: "destructive",
      });
      throw insertError;
    }
    
    console.log('Supabase insert successful');

    // Increment submission attempt counter
    incrementSubmissionAttempt(email, String(roundNumber));

    // Send results to n8n webhook with enhanced safety
    if (!checkRateLimit()) {
      console.log("Webhook not sent due to rate limit");
      // Continue without webhook - database entry was successful
      return;
    }

    const webhookParams = new URLSearchParams({
      email: email,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      roundNumber: String(roundNumber),
      roundScore: String(finalScore),
      totalScore: String(newTotalScore),
      timestamp: new Date().toISOString(),
      requestId: requestId,
      supabaseId: 'unknown'
    });

    const productionUrl = `https://safakt.app.n8n.cloud/webhook/aca1f101-205e-4171-8321-3a2f421c5251?${webhookParams}`;

    try {
      const webhookResponse = await fetch(productionUrl, {
        method: "GET",
        headers: {
          'X-Request-ID': requestId,
          'X-Idempotency-Key': `${email}_${roundNumber}_${Date.now()}`
        }
      });
      
      if (webhookResponse.ok) {
        console.log("Live webhook sent successfully");
      } else {
        console.warn("Webhook returned non-OK status:", webhookResponse.status);
      }
    } catch (webhookError) {
      console.error("Webhook error:", webhookError);
      // Continue without webhook failure affecting user experience
    }

  } catch (e) {
    console.error("Supabase insert error", e);
    setIsResultSubmitted(false); // Reset on error to allow retry
    toast({
      title: "Fehler beim Speichern",
      description: "Es gab ein Problem beim Speichern Ihres Ergebnisses. Bitte versuchen Sie es erneut.",
      variant: "destructive",
    });
    return;
  }
  
  // Navigation will be handled by the Quiz component countdown
};

  if (gameState === "challenge") {
    return <Challenge playerName={`${firstName} ${lastName}`} roundNumber={roundNumber} onComplete={handleChallengeComplete} />;
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
              Herzlichen Glückwunsch, {firstName} {lastName}!
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
              Wir freuen uns darauf, dich auf der DKM 2025 vom 28.-29. Oktober in Dortmund zu begrüßen!
            </p>
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => {
                setGameState("start");
                setFirstName("");
                setLastName("");
                setEmail("");
                setScore(0);
                setTotalScore(0);
                setIsResultSubmitted(false);
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
                Anpfiff
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
                      Fragen? <a href="mailto:Supermakler-challenge@salevium.de" className="text-dkm-turquoise hover:text-dkm-yellow transition-colors">Supermakler-challenge@salevium.de</a>
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
                  Anpfiff
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
                <Label htmlFor="firstName" className="font-encode font-bold text-dkm-navy">
                  Vorname *
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-2 border-2 border-gray-200 focus:border-dkm-turquoise rounded-xl"
                  placeholder="Ihr Vorname"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="font-encode font-bold text-dkm-navy">
                  Nachname *
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-2 border-2 border-gray-200 focus:border-dkm-turquoise rounded-xl"
                  placeholder="Ihr Nachname"
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
                  Geschlecht *
                </Label>
                <RadioGroup
                  value={gender}
                  onValueChange={setGender}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="männlich" id="male" />
                    <Label htmlFor="male" className="font-encode">Männlich</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weiblich" id="female" />
                    <Label htmlFor="female" className="font-encode">Weiblich</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="divers" id="diverse" />
                    <Label htmlFor="diverse" className="font-encode">Divers</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Email confirmation notice */}
              <Alert className="bg-dkm-turquoise/10 border-dkm-turquoise/30">
                <AlertDescription className="font-encode text-dkm-navy">
                  <span className="flex items-center">
                    ✉️ <span className="ml-2">Hinweis: Nach Beendigung des Quiz erhalten Sie eine Bestätigungsmail mit Ihren Ergebnissen. Bitte schauen Sie danach auch in Ihren SPAM-Ordner.</span>
                  </span>
                </AlertDescription>
              </Alert>

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
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="2" id="round2" />
        <Label htmlFor="round2" className="font-encode">Runde 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3" id="round3" />
        <Label htmlFor="round3" className="font-encode">Runde 3</Label>
      </div>
    </div>
  </RadioGroup>
  {roundNumber > 1 && (
    <p className="mt-1 text-sm text-blue-600 font-medium">
      Runde {roundNumber} ist noch nicht freigeschaltet und wird in den kommenden Wochen verfügbar sein.
    </p>
  )}
</div>

                <Button 
                  type="submit" 
                  variant="dkm" 
                  size="lg"
                  className="w-full"
                  disabled={!firstName.trim() || !lastName.trim() || !email.trim() || isSubmitting}
                >
                  {isSubmitting ? "Wird überprüft..." : "Challenge starten"}
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