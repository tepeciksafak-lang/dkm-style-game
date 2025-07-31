import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: number;
  question: string;
  answer: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Die DKM 2025 findet in Dortmund statt.",
    answer: true,
  },
  {
    id: 2,
    question: "Die DKM ist die Leitmesse für die Finanz- und Versicherungswirtschaft.",
    answer: true,
  },
  {
    id: 3,
    question: "Encode Sans ist die offizielle Schrift für die DKM 2025.",
    answer: true,
  },
  {
    id: 4,
    question: "Ein Quizteilnehmer kann anonym teilnehmen.",
    answer: false,
  },
  {
    id: 5,
    question: "Die Hauptfarbe des DKM-Buttons ist Gelb.",
    answer: true,
  },
  {
    id: 6,
    question: "Die DKM 2025 läuft zwei Tage.",
    answer: true,
  },
  {
    id: 7,
    question: "Das DKM-Logo enthält einen Leuchtturm.",
    answer: true,
  },
];

interface QuizProps {
  playerName: string;
  onComplete: (score: number) => void;
}

const Quiz = ({ playerName, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz beendet - Score berechnen
      const score = newAnswers.reduce((total, userAnswer, index) => {
        return total + (userAnswer === quizQuestions[index].answer ? 1 : 0);
      }, 0);
      
      setShowResult(true);
      onComplete(score);
    }
  };

  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  if (showResult) {
    const score = answers.reduce((total, userAnswer, index) => {
      return total + (userAnswer === quizQuestions[index].answer ? 1 : 0);
    }, 0);

    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <h1 className="font-encode font-black text-4xl md:text-6xl text-dkm-navy mb-6">
              Herzlichen Glückwunsch, {playerName}!
            </h1>
            <div className="text-6xl md:text-8xl font-encode font-black text-dkm-turquoise mb-6">
              {score}/7
            </div>
            <p className="font-encode text-xl text-dkm-navy mb-8">
              {score >= 6 
                ? "Wow! Du bist ein echter DKM-Experte! 🏆" 
                : score >= 4 
                ? "Sehr gut! Du kennst dich schon gut mit der DKM aus! 👏"
                : "Nicht schlecht! Schau gerne bei der DKM 2025 vorbei und lerne mehr! 💼"
              }
            </p>
            <p className="font-encode text-lg text-gray-600 mb-8">
              Wir freuen uns darauf, dich auf der DKM 2025 vom 26.-27. März in Dortmund zu begrüßen!
            </p>
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
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-encode font-bold text-dkm-navy">
              Frage {currentQuestion + 1} von {quizQuestions.length}
            </span>
            <span className="font-encode font-bold text-dkm-turquoise">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 border-2 border-dkm-turquoise/20 shadow-[var(--shadow-smooth)]">
          <div className="text-center">
            <h2 className="font-encode font-black text-2xl md:text-3xl text-dkm-navy mb-12">
              {quizQuestions[currentQuestion].question}
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

export default Quiz;