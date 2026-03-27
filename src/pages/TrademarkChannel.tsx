import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type TrademarkModule, type TrademarkQuestion, pickTrademarkQuestions, TM_MODULE_META } from "@/data/trademark-questions";
import { PAGE_BG, type Step } from "@/components/trademark/constants";
import { LandingStep } from "@/components/trademark/LandingStep";
import { IdentifyStep } from "@/components/trademark/IdentifyStep";
import { ModulesStep } from "@/components/trademark/ModulesStep";
import { AssessmentStep } from "@/components/trademark/AssessmentStep";
import { JokeStep } from "@/components/trademark/JokeStep";
import { AnalyzingStep } from "@/components/trademark/AnalyzingStep";
import { ResultsStep } from "@/components/trademark/ResultsStep";
import { ReviewStep } from "@/components/trademark/ReviewStep";
import { ContactStep } from "@/components/trademark/ContactStep";

const TrademarkChannel = () => {
  const [step, setStep] = useState<Step>("landing");
  const [identity, setIdentity] = useState("");
  const [currentModule, setCurrentModule] = useState<TrademarkModule>("beginner");
  const [questions, setQuestions] = useState<TrademarkQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [completedModules, setCompletedModules] = useState<Record<TrademarkModule, { passed: boolean; score: number; total: number } | null>>({
    beginner: null, intermediate: null, expert: null,
  });

  const startModule = useCallback((m: TrademarkModule) => {
    const picked = pickTrademarkQuestions(m, TM_MODULE_META[m].questions);
    setCurrentModule(m);
    setQuestions(picked);
    setAnswers(Array(picked.length).fill(null));
    setQuestionIndex(0);
    setScore(0);
    setStep("assessment");
  }, []);

  const handleAnswer = useCallback((optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        const finalScore = newAnswers.reduce((acc, a, i) => acc + (a === questions[i].correctIndex ? 1 : 0), 0);
        setScore(finalScore);
        const pct = finalScore / questions.length;
        const passed = pct >= 0.7;
        setCompletedModules((prev) => ({ ...prev, [currentModule]: { passed, score: finalScore, total: questions.length } }));
        setStep("analyzing");
        setTimeout(() => setStep("results"), 5000);
      }
    }, 400);
  }, [answers, questionIndex, questions, currentModule]);

  const handleAssessmentBack = useCallback(() => {
    if (questionIndex > 0) setQuestionIndex((prev) => prev - 1);
    else setStep("modules");
  }, [questionIndex]);

  const passed = score / (questions.length || 1) >= 0.7;
  const nextModuleMap: Record<TrademarkModule, TrademarkModule | null> = { beginner: "intermediate", intermediate: "expert", expert: null };
  const nextModule = nextModuleMap[currentModule];

  return (
    <>
      <SEOHead
        title="The Trademark Channel — IP Intelligence Assessment"
        description="Test your trademark knowledge across 3 progressive modules. From Trademark Student to Trademark Titan — prove your expertise with The Trademark Channel."
        path="/trademark-channel"
      />
      <Navbar />
      <div className="overflow-hidden pt-16 lg:pt-20" style={{ background: PAGE_BG }}>
        <AnimatePresence mode="wait">
          {step === "landing" && <LandingStep key="landing" onEnter={() => setStep("identify")} />}
          {step === "identify" && (
            <IdentifyStep key="identify" onSelect={(id) => { setIdentity(id); setStep("modules"); }} onBack={() => setStep("landing")} />
          )}
          {step === "modules" && (
            <ModulesStep key="modules" onSelect={startModule} onBack={() => setStep("identify")} completedModules={completedModules} />
          )}
          {step === "assessment" && questions.length > 0 && (
            <AssessmentStep key={`assess-${questionIndex}`} questions={questions} questionIndex={questionIndex}
              answers={answers} onAnswer={handleAnswer} onBack={handleAssessmentBack} currentModule={currentModule}
              onJoke={() => setStep("joke")} />
          )}
          {step === "joke" && <JokeStep key="joke" onBack={() => setStep("assessment")} />}
          {step === "analyzing" && <AnalyzingStep key="analyzing" currentModule={currentModule} />}
          {step === "results" && (
            <ResultsStep key="results" score={score} questions={questions} answers={answers}
              currentModule={currentModule} passed={passed}
              onReview={() => setStep("review")}
              onRetake={() => startModule(currentModule)}
              onNextModule={passed && nextModule ? () => startModule(nextModule) : null}
              onContact={() => setStep("contact")} />
          )}
          {step === "review" && (
            <ReviewStep key="review" questions={questions} answers={answers}
              currentModule={currentModule} onBack={() => setStep("results")} />
          )}
          {step === "contact" && <ContactStep key="contact" onBack={() => setStep("results")} />}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default TrademarkChannel;
