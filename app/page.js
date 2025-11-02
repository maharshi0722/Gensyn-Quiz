"use client";
import { useState } from "react";
import { Poppins } from "next/font/google";
import questionsData from "./data";

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "800"] });

export default function Page() {
const [started, setStarted] = useState(false);
const [finished, setFinished] = useState(false);
const [score, setScore] = useState(0);
const [currentIndex, setCurrentIndex] = useState(0);
const [selectedOption, setSelectedOption] = useState(null);

const handleAnswer = (idx) => {
setSelectedOption(idx);
if (idx === questionsData[currentIndex].answer) {
setScore((prev) => prev + 1);
}
// Move to next question after a short delay to show feedback
setTimeout(() => {
if (currentIndex + 1 < questionsData.length) {
setCurrentIndex((prev) => prev + 1);
setSelectedOption(null);
} else {
setFinished(true);
}
}, 800);
};

const handleRestart = () => {
setScore(0);
setCurrentIndex(0);
setFinished(false);
setStarted(true);
setSelectedOption(null);
};

const getOptionStyle = (idx) => {
if (selectedOption === null) return "bg-white/80 text-gray-900 hover:bg-blue-100";
if (idx === questionsData[currentIndex].answer) return "bg-green-500 text-white";
if (idx === selectedOption && idx !== questionsData[currentIndex].answer) return "bg-red-500 text-white";
return "bg-white/80 text-gray-900 opacity-60";
};

return (
<div
className="min-h-screen flex flex-col items-center justify-start relative overflow-auto px-4 py-8"

> <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-blue-100/30 to-blue-300/40 backdrop-blur-md" />

  <div className="relative z-10 flex flex-col items-center justify-start w-full max-w-3xl gap-6 md:gap-8">
    {/* Header */}
    <header className="flex items-center justify-center text-center mt-6 mb-6">
      <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl transition-all duration-300 ease-in-out hover:shadow-blue-300/80">
        <img
          src="http://docs.gensyn.ai/~gitbook/image?url=https%3A%2F%2F2916085587-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Forganizations%252FmXxwuH5Uhn5ALglWay9Z%252Fsites%252Fsite_T5u2i%252Ficon%252FIR5mqCvRIiHD1KF8Py06%252FGensyn-logo-anim_2_compressed.gif%3Falt%3Dmedia%26token%3D30b5b212-ebbb-4400-a340-73386974e8a4&width=32&dpr=4&quality=100&sign=3c0c39ab&sv=2"
          alt="Gensyn Logo"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md animate-pulse-blink transition-all duration-500"
        />
        <h1 className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-extrabold`}>
          <span className="bg-clip-text transition-all duration-500 ease-in-out">
            Gensyn
          </span>{" "}
          <span className="bg-clip-text transition-all duration-500 ease-in-out">
            Quiz
          </span>
        </h1>
      </div>
    </header>

    <div className="w-full flex flex-col items-center justify-center">
      {!started ? (
        <div className="bg-white/85 backdrop-blur-xl border border-blue-100/40 shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col items-center text-center transition-all duration-500 ease-in-out hover:shadow-blue-200/60">
          <h2 className="text-xl md:text-2xl font-semibold text-blue-700 mb-3 transition-all duration-500 ease-in-out">
            Welcome to the Gensyn Quiz!
          </h2>
          <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed transition-all duration-500 ease-in-out">
            Test your knowledge on Gensyn and its decentralized AI compute protocol.
            <br />
            You’ll answer {questionsData.length} challenging questions.
            <br />
            Ready to push your brain?
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-2 md:px-8 md:py-3 text-white text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-700 rounded-full shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-transform duration-300 ease-in-out"
          >
            🚀 Start Quiz
          </button>
        </div>
      ) : !finished ? (
        <div className="bg-white/90 backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center animate-fadeIn w-full max-w-lg transition-all duration-500 ease-in-out hover:shadow-blue-300/50">
          <h2
            className={`text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold mb-5 text-center ${poppins.className} transition-all duration-500 ease-in-out`}
          >
            {questionsData[currentIndex].question}
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {questionsData[currentIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full px-4 py-2 font-medium rounded-lg shadow-md transition-colors duration-500 ease-in-out transform hover:scale-105 ${getOptionStyle(idx)}`}
                disabled={selectedOption !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="mt-3 text-gray-700 text-sm transition-all duration-500 ease-in-out">
            {currentIndex + 1} / {questionsData.length}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[55vh] w-full px-4">
          <div className="bg-white/90 backdrop-blur-xl border border-blue-200 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center animate-fadeIn w-full max-w-lg transition-all duration-500 ease-in-out hover:shadow-blue-300/50">
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-5 text-center drop-shadow-md ${poppins.className} transition-all duration-500 ease-in-out`}
            >
              Quiz Completed!
            </h1>
            <div
              className={`text-lg sm:text-xl md:text-2xl font-extrabold mb-4 text-center ${poppins.className} transition-all duration-500 ease-in-out`}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                You scored{" "}
                <span className="whitespace-nowrap">
                  {score} out of {questionsData.length}
                </span>
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center mb-5 leading-relaxed transition-all duration-500 ease-in-out">
              Keep learning about <span className="font-semibold text-blue-700">Gensyn</span>! 🚀
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-teal-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-blue-400/50 transition-transform duration-300 ease-in-out text-sm md:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>

    <footer className="mt-6 text-xs md:text-sm text-gray-700 text-center transition-all duration-500 ease-in-out">
      &copy; {new Date().getFullYear()} Gensyn Quiz - Built by Maharshi
    </footer>
  </div>
</div>


);
}
