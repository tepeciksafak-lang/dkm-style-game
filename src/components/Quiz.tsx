import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import centerCircleCrowd from "@/assets/center-circle-crowd.jpg";
import runningToGoal from "@/assets/running-to-goal.jpg";
import penaltyKick from "@/assets/penalty-kick.jpg";
import stadiumAerialNight from "@/assets/stadium-aerial-night.jpg";
import trophyCelebration from "@/assets/trophy-celebration.jpg";

// Drag & Drop Sorting Component
interface DragDropSortingProps {
  items: { id: string; text: string }[];
  onSort: (sortedIds: string[]) => void;
}

const DragDropSorting = ({ items, onSort }: DragDropSortingProps) => {
  const [sortedItems, setSortedItems] = useState<{ id: string; text: string }[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ id: string; text: string } | null>(null);

  const handleDragStart = (e: React.DragEvent, item: { id: string; text: string }) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newSortedItems = [...sortedItems];
    
    // Remove from current position if already in sorted list
    const currentIndex = newSortedItems.findIndex(item => item.id === draggedItem.id);
    if (currentIndex !== -1) {
      newSortedItems.splice(currentIndex, 1);
    }

    // Add to new position
    if (targetIndex !== undefined) {
      newSortedItems.splice(targetIndex, 0, draggedItem);
    } else {
      newSortedItems.push(draggedItem);
    }

    setSortedItems(newSortedItems);
    setDraggedItem(null);
  };

  const removeFromSorted = (itemId: string) => {
    setSortedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const availableItems = items.filter(item => !sortedItems.find(sorted => sorted.id === item.id));

  const handleSubmit = () => {
    if (sortedItems.length === items.length) {
      onSort(sortedItems.map(item => item.id));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Available Items */}
      <div className="space-y-4">
        <h3 className="font-encode font-bold text-dkm-navy text-lg">
          Verfügbare Elemente (ziehen Sie diese in die richtige Reihenfolge):
        </h3>
        <div className="grid gap-3">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="p-4 bg-dkm-turquoise/10 border-2 border-dkm-turquoise/30 rounded-lg cursor-move hover:bg-dkm-turquoise/20 transition-colors font-encode text-dkm-navy"
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Sorted Items */}
      <div className="space-y-4">
        <h3 className="font-encode font-bold text-dkm-navy text-lg">
          Ihre Reihenfolge ({sortedItems.length}/{items.length}):
        </h3>
        <div
          className="min-h-[200px] p-4 border-2 border-dashed border-dkm-turquoise/50 rounded-lg bg-dkm-turquoise/5"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          {sortedItems.length === 0 ? (
            <div className="text-center text-dkm-navy/60 font-encode py-8">
              Ziehen Sie die Elemente hierher, um sie zu sortieren
            </div>
          ) : (
            <div className="space-y-2">
              {sortedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="p-3 bg-white border border-dkm-turquoise/30 rounded-lg flex justify-between items-center"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <span className="font-encode text-dkm-navy flex items-center">
                    <span className="bg-dkm-turquoise text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {item.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromSorted(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          variant="dkm"
          size="lg"
          onClick={handleSubmit}
          disabled={sortedItems.length !== items.length}
          className="text-xl py-6 px-12"
        >
          Antwort bestätigen
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
  correctOrder: string[];
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
    question: "Sortiere die Messezahlen nach Größe/Ausmaß (von klein bis \"oh wow!\"):",
    items: [
      { id: "kongresse", text: "16 Kongresse" },
      { id: "themenparks", text: "4 Themenparks" },
      { id: "programm", text: "221 Live-Programmpunkte" },
      { id: "aussteller", text: "256 Aussteller" },
      { id: "besucher", text: "14.127 Besucher" },
      { id: "speaker", text: "200+ Speaker" },
      { id: "partner", text: "200+ Aussteller & Partner" }
    ],
    correctOrder: ["themenparks", "kongresse", "speaker", "partner", "programm", "aussteller", "besucher"]
  }
];

interface ChallengeProps {
  playerName: string;
  roundNumber: number;
  onComplete: (score: number) => void;
}

const Challenge = ({ playerName, roundNumber, onComplete }: ChallengeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(boolean | string[])[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [draggedItems, setDraggedItems] = useState<{ id: string; text: string }[]>([]);

  // Get current question set based on round
  const isRound1 = roundNumber === 1;
  const currentQuestions = isRound1 ? challengeQuestionsRound1 : challengeQuestionsRound2;
  const totalQuestions = currentQuestions.length;

  // Initialize dragged items for Round 2
  useEffect(() => {
    if (!isRound1 && currentQuestion < totalQuestions) {
      const sortingQuestion = currentQuestions[currentQuestion] as SortingQuestion;
      // Shuffle items for drag and drop
      const shuffled = [...sortingQuestion.items].sort(() => Math.random() - 0.5);
      setDraggedItems(shuffled);
    }
  }, [currentQuestion, isRound1, currentQuestions, totalQuestions]);

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

  const handleSortingAnswer = (sortedItems: string[]) => {
    const newAnswers = [...answers, sortedItems];
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Challenge beendet - Ergebnis anzeigen und sofort Punkte speichern
      setShowResult(true);
      // Punkte für Sortier-Aufgaben berechnen
      const score = newAnswers.reduce((total, userAnswer, index) => {
        const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
        if (isRound1) {
          const currentQ = currentQuestions[index] as ChallengeQuestion;
          return total + (userAnswer === currentQ.answer ? questionPoints : 0);
        } else {
          const currentQ = currentQuestions[index] as SortingQuestion;
          const userOrder = userAnswer as string[];
          const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentQ.correctOrder);
          return total + (isCorrect ? questionPoints : 0);
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
      const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
      if (isRound1) {
        const currentQ = currentQuestions[index] as ChallengeQuestion;
        return total + (userAnswer === currentQ.answer ? questionPoints : 0);
      } else {
        const currentQ = currentQuestions[index] as SortingQuestion;
        const userOrder = userAnswer as string[];
        const isCorrect = JSON.stringify(userOrder) === JSON.stringify(currentQ.correctOrder);
        return total + (isCorrect ? questionPoints : 0);
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
              {score}/196
            </div>
            <p className="font-encode text-xl text-white mb-8">
              {score >= 140 
                ? "Wow! Sie sind ein echter DKM-Experte! 🏆" 
                : score >= 98 
                ? "Sehr gut! Sie kennen sich schon gut mit der DKM aus! 👏"
                : "Nicht schlecht! Schauen Sie gerne bei der DKM 2025 vorbei und lernen Sie mehr! 💼"
              }
            </p>
            <p className="font-encode text-lg text-white/90 mb-4">
              Wir freuen uns darauf, Sie auf der DKM 2025 vom 28.-29. Oktober in Dortmund zu begrüßen!
            </p>
            
            {/* Countdown und Hinweise */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="font-encode text-lg text-white mb-2">
                ✉️ Sie erhalten in Kürze eine E-Mail mit Ihren Ergebnissen
              </p>
              <p className="font-encode text-lg text-dkm-yellow font-bold">
                ⏰ Automatische Weiterleitung in {countdown} Sekunden...
              </p>
            </div>
            
            <Button 
              variant="dkm" 
              size="lg"
              onClick={() => window.location.href = "/"}
              className="mr-4"
            >
              Nochmal spielen
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
              // Round 2: Drag & Drop Sorting
              <DragDropSorting
                items={draggedItems}
                onSort={(sortedIds) => handleSortingAnswer(sortedIds)}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Challenge;