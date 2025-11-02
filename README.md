Gensyn Quiz

An interactive web quiz built with Next.js, Tailwind CSS, and React, designed to test your knowledge about Gensyn — the decentralized compute protocol for machine learning.
It features smooth transitions, live scoring, and visual feedback for correct and incorrect answers.

🚀 Features

🎯 Multiple Choice Quiz — 10 curated questions about the Gensyn protocol

🌈 Dynamic UI Feedback — Green for correct answers, red for wrong ones

💫 Smooth Animations — Subtle hover, fade, and pulse effects

🔁 Restart Option — Instantly retry the quiz after completion

📱 Responsive Design — Optimized for both desktop and mobile

🧩 Tech Stack

Next.js 14+ (App Router)

React 18+

Tailwind CSS

Google Fonts (Poppins)

📂 Project Structure
/app
├── page.js # Main quiz logic + UI
├── data.js # Quiz questions & answers in JSON format
├── globals.css # Tailwind base styles

⚙️ Setup Instructions

Clone the repository

git clone https://github.com/yourusername/gensyn-quiz.git
cd gensyn-quiz

Install dependencies

npm install

Run the development server

npm run dev

Open in browser

http://localhost:3000
🧾 Data Format (data.js)

Your data.js file should export an array of question objects:

export default [
{
question: "What is Judge in the context of the Gensyn Testnet?",
options: [
"A blockchain-based payment system",
"A cryptographically verifiable runtime for reinforcement learning workloads",
"A social platform for AI researchers",
"A dataset repository for machine learning"
],
answer: 1
},
...
];
🧠 Quiz Logic Overview

Each time a user selects an answer:

The option color updates instantly:

✅ Green for correct

❌ Red for incorrect

After a short delay, the quiz auto-advances to the next question.

At the end, a summary screen displays the total score and restart option.

🧑‍💻 Author

Maharshi Patel
Built with ❤️ using Next.js + Tailwind.
