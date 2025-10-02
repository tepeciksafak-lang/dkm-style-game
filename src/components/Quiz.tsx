import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import centerCircleCrowd from "@/assets/center-circle-crowd.jpg";
import runningToGoal from "@/assets/running-to-goal.jpg";
import penaltyKick from "@/assets/penalty-kick.jpg";
import stadiumAerialNight from "@/assets/stadium-aerial-night.jpg";
import trophyCelebration from "@/assets/trophy-celebration.jpg";
import { Check, AlertCircle, X } from "lucide-react";

// Number Input Sorting Component
interface NumberInputSortingProps {
  items: { id: string; text: string }[];
  onSubmit: (orderedIds: string[]) => void;
}

const NumberInputSorting = ({ items, onSubmit }: NumberInputSortingProps) => {
  const { toast } = useToast();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Initialize empty values
  useEffect(() => {
    const initialValues: Record<string, string> = {};
    items.forEach(item => {
      initialValues[item.id] = "";
    });
    setInputValues(initialValues);
  }, [items]);

  const handleInputChange = (itemId: string, value: string) => {
    // Only allow numbers 1-7 or empty
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) >= 1 && parseInt(value) <= 7)) {
      setInputValues(prev => ({
        ...prev,
        [itemId]: value
      }));
    }
  };

  // Get validation status for each input
  const getInputStatus = (itemId: string) => {
    const value = inputValues[itemId];
    if (!value) return "empty";
    
    const num = parseInt(value);
    if (num < 1 || num > 7) return "invalid";
    
    // Check for duplicates
    const values = Object.entries(inputValues)
      .filter(([id]) => id !== itemId)
      .map(([, val]) => val);
    
    if (values.includes(value)) return "duplicate";
    
    return "valid";
  };

  const validateAndSubmit = () => {
    const values = Object.values(inputValues);
    
    // Check if all fields are filled
    if (values.some(v => !v)) {
      toast({
        title: "Unvollständig",
        description: "Bitte fülle alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    // Check if all numbers 1-7 are used
    const numbers = values.map(v => parseInt(v)).sort();
    const expectedNumbers = [1, 2, 3, 4, 5, 6, 7];
    
    if (JSON.stringify(numbers) !== JSON.stringify(expectedNumbers)) {
      // Find duplicates
      const duplicates = numbers.filter((num, index) => numbers.indexOf(num) !== index);
      
      if (duplicates.length > 0) {
        toast({
          title: "Doppelte Zahlen",
          description: `Jede Zahl von 1-7 muss genau einmal verwendet werden. Doppelt: ${[...new Set(duplicates)].join(", ")}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Ungültige Eingabe",
          description: "Jede Zahl von 1-7 muss genau einmal verwendet werden.",
          variant: "destructive",
        });
      }
      return;
    }

    // Create ordered array based on input values
    const orderedItems = items.map(item => ({
      ...item,
      position: parseInt(inputValues[item.id])
    })).sort((a, b) => a.position - b.position);

    onSubmit(orderedItems.map(item => item.id));
  };

  // Get which numbers are already used
  const usedNumbers = Object.values(inputValues)
    .filter(v => v)
    .map(v => parseInt(v))
    .sort((a, b) => a - b);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <div className="space-y-2 mb-6">
          <h3 className="font-encode font-bold text-dkm-navy text-lg">
            Gib für jedes Element eine Position von 1-7 ein:
          </h3>
          <p className="text-sm text-dkm-navy/70 font-encode">
            Bereits vergeben: {usedNumbers.length > 0 ? usedNumbers.join(", ") : "keine"}
          </p>
        </div>

        {items.map((item, index) => {
          const status = getInputStatus(item.id);
          
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-dkm-turquoise/10 border-2 border-dkm-turquoise/30 rounded-lg"
            >
              <div className="flex-1 font-encode text-dkm-navy">
                {item.text}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={inputValues[item.id] || ""}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="1-7"
                  className={`w-20 text-center text-lg font-bold ${
                    status === "valid" 
                      ? "border-green-500 bg-green-50" 
                      : status === "duplicate" || status === "invalid"
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                />
                {status === "valid" && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                {status === "duplicate" && (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
                {status === "invalid" && (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          variant="dkm"
          size="lg"
          onClick={validateAndSubmit}
          className="w-full sm:w-auto"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

// Number Matching Input Component for Question 3 (specific numbers)
interface NumberMatchingInputProps {
  items: { id: string; text: string }[];
  validNumbers: string[];
  correctAnswers: Record<string, string>;
  onSubmit: (answers: Record<string, string>) => void;
}

const NumberMatchingInput = ({ items, validNumbers, correctAnswers, onSubmit }: NumberMatchingInputProps) => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleInputChange = (itemId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [itemId]: value }));
  };

  const getInputStatus = (itemId: string, value: string): "valid" | "invalid" | "duplicate" | "empty" => {
    if (!value) return "empty";
    if (!validNumbers.includes(value)) return "invalid";
    
    // Count how many times this value is used
    const usageCount = Object.entries(inputs).filter(([key, val]) => val === value).length;
    
    // Count how many times this value should be used
    const expectedCount = Object.values(correctAnswers).filter((ans) => ans === value).length;
    
    if (usageCount > expectedCount) return "duplicate";
    return "valid";
  };

  const validateAndSubmit = () => {
    // Check if all fields are filled
    const allFilled = items.every((item) => inputs[item.id]?.trim());
    if (!allFilled) {
      toast({
        title: "Unvollständig",
        description: "Bitte fülle alle Felder aus.",
        variant: "destructive",
      });
      return;
    }

    // Check for invalid numbers
    const hasInvalid = items.some((item) => !validNumbers.includes(inputs[item.id]));
    if (hasInvalid) {
      toast({
        title: "Ungültige Zahl",
        description: "Bitte verwende nur die vorgegebenen Zahlen.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicates (considering that some numbers can be used multiple times)
    const valueCounts: Record<string, number> = {};
    Object.values(inputs).forEach((val) => {
      valueCounts[val] = (valueCounts[val] || 0) + 1;
    });

    const expectedCounts: Record<string, number> = {};
    Object.values(correctAnswers).forEach((val) => {
      expectedCounts[val] = (expectedCounts[val] || 0) + 1;
    });

    const hasDuplicateError = Object.entries(valueCounts).some(
      ([val, count]) => count > (expectedCounts[val] || 1)
    );

    if (hasDuplicateError) {
      toast({
        title: "Duplikat gefunden",
        description: "Einige Zahlen wurden zu oft verwendet.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(inputs);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="space-y-2 mb-6">
        <h3 className="font-encode font-bold text-dkm-navy text-lg">
          Verfügbare Zahlen: {validNumbers.join(", ")}
        </h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const value = inputs[item.id] || "";
          const status = getInputStatus(item.id, value);
          
          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-dkm-turquoise/10 border-2 border-dkm-turquoise/30 rounded-lg"
            >
              <div className="flex-1 font-encode text-dkm-navy">
                {item.text}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="Zahl"
                  className={`w-32 text-center text-lg font-bold ${
                    status === "valid" 
                      ? "border-green-500 bg-green-50" 
                      : status === "duplicate" || status === "invalid"
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                />
                {status === "valid" && <Check className="w-5 h-5 text-green-500" />}
                {status === "duplicate" && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                {status === "invalid" && <X className="w-5 h-5 text-red-500" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          variant="dkm"
          size="lg"
          onClick={validateAndSubmit}
          className="w-full sm:w-auto"
        >
          Weiter
        </Button>
      </div>
    </div>
  );
};

interface ChallengeQuestion {
  id: number;
  question: string;
  answer: boolean;
}

interface SortingQuestion {
  id: number;
  question: string;
  items: { id: string; text: string }[];
  correctOrder?: string[]; // Optional for position-based sorting
  type?: "position-sorting" | "number-matching"; // Type of sorting question
  correctAnswers?: Record<string, string>; // For number-matching questions
  validNumbers?: string[]; // Valid numbers for number-matching
}

// Runde 1 Fragen (True/False)
const challengeQuestionsRound1: ChallengeQuestion[] = [
  {
    id: 1,
    question: "Die DKM ist eine eingetragene Marke, die sich aus dem Wort 'Deckungskonzeptmesse' heraus entwickelt hat.",
    answer: true,
  },
  {
    id: 2,
    question: "Die DKM hat schon immer in den Westfallenhallen in Dortmund stattgefunden.",
    answer: false,
  },
  {
    id: 3,
    question: "Die DKM beginnt online bereits Wochen vor dem Präsenz-Event?",
    answer: true,
  },
  {
    id: 4,
    question: "2025 gibt es genau vier Themenparks.",
    answer: true,
  },
  {
    id: 5,
    question: "Die Messe-App heißt DKM365?",
    answer: true,
  },
  {
    id: 6,
    question: "Ex-Bundespräsident Christian Wulff ist 2025 im Speaker's Corner angekündigt.",
    answer: true,
  },
  {
    id: 7,
    question: "Die letzte Aktion am Mittwoch ist die Vermittlertombola.",
    answer: true,
  },
];

// Runde 2 Fragen (Drag & Drop Sorting)
const challengeQuestionsRound2: SortingQuestion[] = [
  {
    id: 1,
    question: "Bringe die DKM-Events in die korrekte zeitliche Reihenfolge (früh bis spät):",
    items: [
      { id: "streaming", text: "DKM Streaming-Days (Online-Serie)" },
      { id: "pressekonferenz", text: "Pressekonferenz des Veranstalters" },
      { id: "oeffnung", text: "Öffnung der Messetore (1. Messetag)" },
      { id: "speakers", text: "Speaker's Corner – Keynote / Kongress-Sessions" },
      { id: "meetup", text: "Meet-up (Abendveranstaltung, Day 1)" },
      { id: "tombola", text: "Vermittlertombola (Finale, Day 2)" },
      { id: "schliessung", text: "Schließung der Messe (Ende 2. Messetag)" }
    ],
    correctOrder: ["streaming", "pressekonferenz", "oeffnung", "speakers", "meetup", "tombola", "schliessung"]
  },
  {
    id: 2,
    question: "Sortiere das Netzwerk-Erlebnis von \"früh erlebt\" bis \"Abend-Highlight\":",
    items: [
      { id: "coffee", text: "Coffee, please! (Early-Bird-Frühstück)" },
      { id: "laecheln", text: "Erstes Lächeln am Stand (begrüßender Small-Talk)" },
      { id: "stempel", text: "\"Gut beraten\"-Weiterbildungs-Stempel ergattern" },
      { id: "foto", text: "Fotosession mit dem Maskottchen" },
      { id: "lounge", text: "Me-Time in der Entscheider-Lounge" },
      { id: "weinbar", text: "Weinbar-Genuss (Meet-Up)" },
      { id: "dance", text: "Tanzschritte auf dem Dance-Floor" }
    ],
    correctOrder: ["coffee", "laecheln", "stempel", "foto", "lounge", "weinbar", "dance"]
  },
    {
      id: 3,
      type: "number-matching",
      question: "Ordne die Zahlen richtig zu",
      items: [
        { id: "kongresse", text: "Kongresse" },
        { id: "themenparks", text: "Themenparks" },
        { id: "programm", text: "Live-Programmpunkte" },
        { id: "aussteller", text: "Aussteller" },
        { id: "besucher", text: "Besucher" },
        { id: "speaker", text: "Speaker" },
        { id: "partner", text: "Aussteller & Partner" }
      ],
      correctAnswers: {
        kongresse: "16",
        themenparks: "4",
        programm: "221",
        aussteller: "256",
        besucher: "14.127",
        speaker: "200+",
        partner: "200+"
      },
      validNumbers: ["16", "4", "221", "256", "14.127", "200+"]
    }
];

interface ChallengeProps {
  playerName: string;
  roundNumber: number;
  onComplete: (score: number) => void;
}

const Challenge = ({ playerName, roundNumber, onComplete }: ChallengeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | string[] | Record<string, string>)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Get current question set based on round
  const isRound1 = roundNumber === 1;
  const currentQuestions = isRound1 ? challengeQuestionsRound1 : challengeQuestionsRound2;
  const totalQuestions = currentQuestions.length;

  // Countdown-Timer nur für automatische Weiterleitung zur Leaderboard
  useEffect(() => {
    if (showResult && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showResult && countdown === 0) {
      // Nach 10 Sekunden: Zur Leaderboard weiterleitung
      window.location.href = "/leaderboard";
    }
  }, [showResult, countdown]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Challenge beendet - Ergebnis anzeigen und sofort Punkte speichern
      setShowResult(true);
      // Punkte sofort berechnen und speichern
      const score = newAnswers.reduce((total, userAnswer, index) => {
        const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
        const currentQ = currentQuestions[index] as ChallengeQuestion;
        return total + (userAnswer === currentQ.answer ? questionPoints : 0);
      }, 0);
      onComplete(score);
    }
  };

  // Calculate sorting score - points per correctly placed block
  const calculateSortingScore = (userOrder: string[], correctOrder: string[], questionNumber: number) => {
    const pointsPerBlock = questionNumber === 1 ? 10 : questionNumber === 2 ? 20 : 30;
    let score = 0;
    
    userOrder.forEach((item, index) => {
      if (correctOrder[index] === item) {
        score += pointsPerBlock;
      }
    });
    
    return score;
  };

  const handleSortingAnswer = (sortedItemIds: string[]) => {
    const newAnswers = [...answers, sortedItemIds];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Challenge beendet - Ergebnis anzeigen und sofort Punkte speichern
      setShowResult(true);
      // Punkte für Sortier-Aufgaben berechnen
      const score = newAnswers.reduce((total, userAnswer, index) => {
        if (isRound1) {
          const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
          const currentQ = currentQuestions[index] as ChallengeQuestion;
          return total + (userAnswer === currentQ.answer ? questionPoints : 0);
        } else {
          const currentQ = currentQuestions[index] as SortingQuestion;
          const userOrder = userAnswer as string[];
          return total + calculateSortingScore(userOrder, currentQ.correctOrder!, index + 1);
        }
      }, 0);
      onComplete(score);
    }
  };

  const handleNumberMatchingAnswer = (userAnswers: Record<string, string>) => {
    const currentQ = currentQuestions[currentQuestion] as SortingQuestion;
    const newAnswers = [...answers, userAnswers];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Challenge beendet - Ergebnis anzeigen und sofort Punkte speichern
      setShowResult(true);
      // Punkte für Sortier-Aufgaben berechnen
      const score = newAnswers.reduce((total, userAnswer, index) => {
        if (isRound1) {
          const questionPoints = (index + 1) * 7;
          const currentQ = currentQuestions[index] as ChallengeQuestion;
          return total + (userAnswer === currentQ.answer ? questionPoints : 0);
        } else {
          const currentQ = currentQuestions[index] as SortingQuestion;
          
          if (currentQ.type === "number-matching") {
            // For number-matching questions
            const userAnswers = userAnswer as Record<string, string>;
            let points = 0;
            Object.entries(userAnswers).forEach(([itemId, userValue]) => {
              if (currentQ.correctAnswers![itemId] === userValue) {
                points += 30; // 30 points per correct match
              }
            });
            return total + points;
          } else {
            // For position-sorting questions
            const userOrder = userAnswer as string[];
            return total + calculateSortingScore(userOrder, currentQ.correctOrder!, index + 1);
          }
        }
      }, 0);
      onComplete(score);
    }
  };

  const progress = ((currentQuestion) / totalQuestions) * 100;

  // Get background image for current question
  const getBackgroundImage = () => {
    if (currentQuestion < 2) return centerCircleCrowd;
    if (currentQuestion < 4) return runningToGoal;
    if (currentQuestion < 6) return penaltyKick;
    return stadiumAerialNight; // For the last question
  };

  if (showResult) {
    const score = answers.reduce((total, userAnswer, index) => {
      if (isRound1) {
        const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
        const currentQ = currentQuestions[index] as ChallengeQuestion;
        return total + (userAnswer === currentQ.answer ? questionPoints : 0);
      } else {
          const currentQ = currentQuestions[index] as SortingQuestion;
          
          if (currentQ.type === "number-matching") {
            // For number-matching questions
            if (typeof userAnswer === 'object' && !Array.isArray(userAnswer)) {
              const userAnswers = userAnswer as Record<string, string>;
              let points = 0;
              Object.entries(userAnswers).forEach(([itemId, userValue]) => {
                if (currentQ.correctAnswers![itemId] === userValue) {
                  points += 30;
                }
              });
              return total + points;
            }
            return total;
          } else {
            // For position-sorting questions
            const userOrder = userAnswer as string[];
            return total + calculateSortingScore(userOrder, currentQ.correctOrder!, index + 1);
          }
      }
    }, 0);

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
              {score}/{isRound1 ? 196 : 420}
            </div>
            <p className="font-encode text-xl text-white mb-8">
              {isRound1 ? (
                score >= 140 
                  ? "Wow! Sie sind ein echter DKM-Experte! 🏆" 
                  : score >= 98 
                  ? "Sehr gut! Sie kennen sich schon gut mit der DKM aus! 👏"
                  : "Nicht schlecht! Schauen Sie gerne bei der DKM 2025 vorbei und lernen Sie mehr! 💼"
              ) : (
                score >= 300 
                  ? "Wow! Sie sind ein echter DKM-Experte! 🏆" 
                  : score >= 200 
                  ? "Sehr gut! Sie kennen sich schon gut mit der DKM aus! 👏"
                  : "Nicht schlecht! Schauen Sie gerne bei der DKM 2025 vorbei und lernen Sie mehr! 💼"
              )}
            </p>
            <p className="font-encode text-lg text-white/90 mb-4">
              Wir freuen uns darauf, Sie auf der DKM 2025 vom 28.-29. Oktober in Dortmund zu begrüßen!
            </p>
            
            {/* Countdown und Hinweise */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8">
              <Alert className="bg-white/30 border-white/50 mb-4">
                <AlertDescription className="font-encode text-white">
                  <span className="flex items-center justify-center">
                    ✉️ <span className="ml-2">Sie erhalten in Kürze eine E-Mail mit Ihren Ergebnissen.</span>
                  </span>
                  <span className="flex items-center justify-center mt-2">
                    ⚠️ <span className="ml-2 font-bold">Bitte prüfen Sie auch Ihren SPAM-Ordner!</span>
                  </span>
                </AlertDescription>
              </Alert>
              <p className="font-encode text-lg text-dkm-yellow font-bold">
                ⏰ Automatische Weiterleitung in {countdown} Sekunden...
              </p>
            </div>
            
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => window.location.href = "/leaderboard"}
              className="mr-4"
            >
              Leaderboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-16 px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-encode font-bold text-white">
              Frage {currentQuestion + 1} von {totalQuestions}
            </span>
            <span className="font-encode font-bold text-dkm-yellow">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 border-2 border-dkm-turquoise/20 shadow-[var(--shadow-smooth)] bg-white/95 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="font-encode font-black text-2xl md:text-3xl text-dkm-navy mb-12 break-words hyphens-auto">
              {currentQuestions[currentQuestion].question}
            </h2>
            
            {isRound1 ? (
              // Round 1: True/False Questions
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  variant="dkm-true"
                  size="lg"
                  onClick={() => handleAnswer(true)}
                  className="text-xl py-6 px-12"
                >
                  Wahr
                </Button>
                <Button
                  variant="dkm-false"
                  size="lg"
                  onClick={() => handleAnswer(false)}
                  className="text-xl py-6 px-12"
                >
                  Falsch
                </Button>
              </div>
            ) : (
              // Round 2: Sorting Questions (Number Input or Number Matching)
              (() => {
                const currentSortingQ = currentQuestions[currentQuestion] as SortingQuestion;
                return currentSortingQ.type === "number-matching" ? (
                  <NumberMatchingInput
                    items={currentSortingQ.items}
                    validNumbers={currentSortingQ.validNumbers!}
                    correctAnswers={currentSortingQ.correctAnswers!}
                    onSubmit={handleNumberMatchingAnswer}
                  />
                ) : (
                  <NumberInputSorting
                    items={currentSortingQ.items}
                    onSubmit={handleSortingAnswer}
                  />
                );
              })()
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Challenge;