"use client";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import questionsData from "./data";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800"] });

export default function Page() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = () => {
    setShuffledQuestions(shuffleArray(questionsData));
    setStarted(true);
    setFinished(false);
    setScore(0);
    setCurrentIndex(0);
    setSelectedOption(null);
  };

  const handleAnswer = (idx) => {
    setSelectedOption(idx);
    if (idx === shuffledQuestions[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < shuffledQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const handleRestart = () => {
    startQuiz();
  };

  const getOptionStyle = (idx) => {
    if (selectedOption === null)
      return isDarkMode
        ? "bg-gray-700 text-gray-100 hover:bg-blue-900"
        : "bg-white/80 text-gray-900 hover:bg-blue-100";
    if (idx === shuffledQuestions[currentIndex].answer)
      return "bg-green-500 text-white";
    if (idx === selectedOption && idx !== shuffledQuestions[currentIndex].answer)
      return "bg-red-500 text-white";
    return isDarkMode
      ? "bg-gray-700 text-gray-100 opacity-60"
      : "bg-white/80 text-gray-900 opacity-60";
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4 py-8 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-800"
            : "bg-gradient-to-br from-white/70 via-blue-100/30 to-blue-300/40"
        } backdrop-blur-md`}
      />
      <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-3xl gap-6 md:gap-8">
        <header className="flex items-center justify-center text-center mt-6 mb-6">
          <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl dark:bg-gray-800/80 transition-all duration-300 ease-in-out">
            <img
              src="http://docs.gensyn.ai/~gitbook/image?url=https%3A%2F%2F2916085587-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FmXxwuH5Uhn5ALglWay9Z%252Fsites%252Fsite_T5u2i%252Ficon%252FIR5mqCvRIiHD1KF8Py06%252FGensyn-logo-anim_2_compressed.gif%3Falt%3Dmedia%26token%3D30b5b212-ebbb-4400-a340-73386974e8a4&width=32&dpr=4&quality=100&sign=3c0c39ab&sv=2"
              alt="Gensyn Logo"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md animate-pulse-blink transition-all duration-500"
            />
            <h1
              className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-extrabold`}
            >
              Gensyn Quiz
            </h1>
          </div>
        </header>

        <div className="w-full flex flex-col items-center justify-center">
          {!started ? (
            <div
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white/85 text-gray-900"
              } backdrop-blur-xl border border-blue-100/40 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-center text-center transition-all duration-500 ease-in-out`}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                Welcome to the Gensyn Quiz!
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                Test your knowledge on Gensyn and its decentralized AI compute
                protocol. You’ll answer {questionsData.length} questions. Ready?
              </p>
              <button
                onClick={startQuiz}
                className="px-6 py-2 md:px-8 md:py-3 text-white text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-700 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                🚀 Start Quiz
              </button>
            </div>
          ) : !finished ? (
            <div
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white/90 text-gray-900"
              } backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center animate-fadeIn w-full max-w-lg transition-all duration-500 ease-in-out`}
            >
              <h2
                className={`text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-center ${poppins.className}`}
              >
                {shuffledQuestions[currentIndex].question}
              </h2>
              <div className="flex flex-col gap-3 w-full">
                {shuffledQuestions[currentIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-300 ease-in-out ${getOptionStyle(
                      idx
                    )}`}
                    disabled={selectedOption !== null}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm opacity-80">
                {currentIndex + 1} / {shuffledQuestions.length}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[55vh] w-full px-4">
              <div
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white/90 text-gray-900"
                } backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center animate-fadeIn w-full max-w-lg transition-all duration-500 ease-in-out`}
              >
                <h1
                  className={`text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5 text-center ${poppins.className}`}
                >
                  Quiz Completed!
                </h1>
                <div
                  className={`text-lg sm:text-xl md:text-2xl font-extrabold mb-4 text-center ${poppins.className}`}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                    You scored {score} out of {shuffledQuestions.length}
                  </span>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-center mb-5 leading-relaxed">
                  Keep learning about <span className="font-semibold">Gensyn</span>! 🚀
                </p>
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-teal-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-6 text-xs md:text-sm text-center opacity-80">
          &copy; {new Date().getFullYear()} Gensyn Quiz - Built by Maharshi
        </footer>
      </div>
    </div>
  );
}
