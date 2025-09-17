import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import centerCircleCrowd from "@/assets/center-circle-crowd.jpg";
import runningToGoal from "@/assets/running-to-goal.jpg";
import penaltyKick from "@/assets/penalty-kick.jpg";
import stadiumAerialNight from "@/assets/stadium-aerial-night.jpg";
import trophyCelebration from "@/assets/trophy-celebration.jpg";

interface ChallengeQuestion {
  id: number;
  question: string;
  answer: boolean;
}

// Runde 1 Fragen
const challengeQuestions: ChallengeQuestion[] = [
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

interface ChallengeProps {
  playerName: string;
  onComplete: (score: number) => void;
}

const Challenge = ({ playerName, onComplete }: ChallengeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Countdown-Timer für automatische Weiterleitung
  useEffect(() => {
    if (showResult && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showResult && countdown === 0) {
      // Nach 10 Sekunden: Challenge beenden
      const score = answers.reduce((total, userAnswer, index) => {
        const questionPoints = (index + 1) * 7; // Q1=7, Q2=14, Q3=21, etc.
        return total + (userAnswer === challengeQuestions[index].answer ? questionPoints : 0);
      }, 0);
      onComplete(score);
    }
  }, [showResult, countdown, answers, onComplete]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < challengeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Challenge beendet - Ergebnis anzeigen
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion) / challengeQuestions.length) * 100;

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
      return total + (userAnswer === challengeQuestions[index].answer ? questionPoints : 0);
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
              Frage {currentQuestion + 1} von {challengeQuestions.length}
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
            <h2 className="font-encode font-black text-2xl md:text-3xl text-dkm-navy mb-12">
              {challengeQuestions[currentQuestion].question}
            </h2>
            
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Challenge;