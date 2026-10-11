# DWDM Snake & Ladder Quiz — Boys vs Girls 🏆🪜

An engaging, production-grade educational quiz competition web application built for college **Activity-Based Learning (ABL)** sessions. The game brings Data Warehousing & Data Mining (DWDM) concepts to life through a gamified two-team contest between **Boys** and **Girls** on an authentic 100-square serpentine board featuring **Ladders Only (No Snakes!)**.

---

## 🎯 Key Features & Rules

1. **Two-Team Competition (Boys vs Girls):**
   - Single shared 100-square board with two independent, simultaneously visible cursors.
   - **Girls take the first turn by default**, followed by alternating turns.
   - **Random distinct team cursor colors** assigned dynamically at the start of each match (no hardcoded blue/red assignment).
2. **Game Mechanics:**
   - **Ladders Only:** Landing on the base of any ladder transports the team up to its top. No snakes exist on the board!
   - **Exact Roll Requirement:** Reaching square 100 requires an exact dice roll; an overshoot leaves the cursor in its current place.
   - **Independent Marks vs Movement:**
     - Each question is randomly assigned a value between **1 and 6 marks**.
     - Answering correctly awards the question's marks and unlocks the **1–6 dice roll**.
     - Marks earned **never** dictate squares moved — movement is determined solely by the dice roll.
   - **Wrong Answer / Time Expired:** Awards 0 marks, the team's cursor stays in place, and the correct answer with an educational explanation is revealed.
3. **Question Bank (160 Verified Questions):**
   - Curated across 22 core syllabus modules:
     - Data Warehousing Architecture, Inmon vs Kimball, OLAP vs OLTP (ROLAP, MOLAP, HOLAP)
     - Schemas: Star, Snowflake, Fact Constellation, Conformed Dimensions, SCD Types
     - Multidimensional Models & Data Cubes (Roll-up, Drill-down, Slice, Dice, Pivot)
     - ETL & ELT, Staging, CDC, Surrogate Keys
     - Data Preprocessing, Cleaning, Binning, Normalization (Min-Max, Z-score, Decimal scaling)
     - Data Reduction, Discretization, PCA, Wavelets
     - Data Mining Tasks (Descriptive vs Predictive)
     - Classification: Decision Trees (ID3, C4.5, CART, Entropy, Gini, Pruning), Naive Bayes
     - Association Rules: Support, Confidence, Lift, Apriori Property, FP-Growth
     - Clustering: K-Means, K-Medoids (PAM), Hierarchical (Single/Complete/Ward), DBSCAN
     - Outlier Analysis (Boxplots, Grubbs' test, LOF)
     - Model Evaluation: Confusion Matrix, Accuracy, Precision, Recall, F1-Score, ROC/AUC, Cross-Validation
   - Stored modularly in `src/data/dwdmQuestions.ts` with verified answers and explanations.
4. **Local Zero-Dependency Audio & Persistence:**
   - Real-time Web Audio API synthesizer for sound effects (dice rattling, step hops, correct chime, wrong buzz, ladder harp ascent, victory fanfare).
   - Auto-saves active match to `localStorage` to survive accidental page refreshes.
   - Match duration timer with automatic winner determination on timeout (most advanced position wins; tiebreaker by total marks).

---

## 📁 Complete Project Directory Structure

```text
├── index.html                   # HTML entry point with metadata & responsive viewport
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project dependencies & build scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Setup, Windows PowerShell commands & deployment guide
├── src/
│   ├── App.tsx                  # Main game state orchestrator & lifecycle loop
│   ├── index.css                # Global Tailwind CSS imports & base styles
│   ├── main.tsx                 # React DOM mount point
│   ├── components/
│   │   ├── DiceRoller.tsx       # 3D animated dice with realistic dots & roll logic
│   │   ├── GameBoard.tsx        # 10x10 Serpentine board with dual cursors & badges
│   │   ├── Header.tsx           # Match countdown, sound toggle, pause & reset modal
│   │   ├── LadderOverlay.tsx    # Crisp SVG ladder rendering with rungs & climb glow
│   │   ├── QuestionCard.tsx     # MCQ options, text input, timer bar & explanations
│   │   ├── ResultsModal.tsx     # Confetti celebration, winner stats & topic breakdown
│   │   ├── ScoreBoard.tsx       # Independent scorecards for Girls and Boys
│   │   └── WelcomeScreen.tsx    # Game start screen, color reroll & timer settings
│   ├── data/
│   │   ├── dwdmQuestions.ts     # 160 curated & syllabus-verified DWDM questions
│   │   └── ladders.ts           # Ladder coordinates across the 100-square board
│   ├── types/
│   │   └── game.ts              # TypeScript interfaces for teams, questions & turns
│   └── utils/
│       ├── audio.ts             # 100% offline Web Audio API sound synthesizer
│       ├── boardUtils.ts        # Serpentine coordinate & square color calculation
│       └── colors.ts            # Palette of vibrant, high-contrast cursor colors
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # Vercel deployment & SPA route rewrite configuration
└── vite.config.ts               # Vite build configuration with Tailwind CSS plugin
```

---

## 💻 Local Setup & Development (Windows PowerShell)

Open **Windows PowerShell** in your preferred projects folder and run the following commands:

### 1. Clone or Extract Project
```powershell
# Navigate into the project directory
Set-Location -Path "dwdm-snake-ladder-quiz"
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```
> The local development server will start at `http://localhost:3000` (or `http://localhost:5173`). Open this URL in any browser.

### 4. Build for Production
```powershell
npm run build
```
> This bundles the application into the `dist/` directory.

### 5. Preview Production Build
```powershell
npm run preview
```

---

## 🚀 Deployment to Vercel

### Option A: Via GitHub (Recommended)

1. **Initialize Git and Commit Files:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: DWDM Snake & Ladder Quiz game"
   ```

2. **Push to a New GitHub Repository:**
   ```powershell
   # Create a repository on github.com, then link it:
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Log in to [vercel.com](https://vercel.com).
   - Click **"Add New..."** ➔ **"Project"**.
   - Select your GitHub repository.
   - Configure the build settings (Vercel auto-detects Vite):
     - **Framework Preset:** `Vite`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`
   - Click **"Deploy"**. Your live URL will be ready in under 60 seconds!

### Option B: Via Vercel CLI (Direct PowerShell Deployment)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Deploy directly from PowerShell
vercel
```

---

## 📋 Deployed Website Testing Checklist

Verify all items on your deployed URL:

- [x] **Serpentine Board Layout:**
  - Square 1 is at the bottom-left.
  - Square 10 is at bottom-right; Square 11 is directly above Square 10.
  - Square 100 is at the top-left with the golden trophy finish line.
- [x] **Ladders Only (No Snakes):**
  - Ladders are rendered cleanly between start and end squares.
  - Landing on square 4 ascends to 25; landing on 12 ascends to 33, etc.
  - No snakes are present anywhere on the board.
- [x] **Team Turns & Colors:**
  - Girls take the first turn by default.
  - Distinct random cursor colors are assigned each new match without fixed red/blue assignments.
  - Reroll Colors button works on the welcome screen.
- [x] **Question & Marks Validation:**
  - Questions display randomly assigned marks (1 to 6).
  - MCQ selection validates immediately against the verified answer.
  - Correct answers award marks and display the dice roll button.
  - Incorrect answers award 0 marks, maintain existing cursor position, and reveal the educational explanation.
- [x] **Dice Movement & Exact 100 Rule:**
  - Movement hops square by square with audio feedback.
  - If a team is on Square 98 and rolls a 4 (overshoot to 102), the cursor stays on Square 98 with feedback.
- [x] **Offline Sound Synthesizer:**
  - Audio chimes, rolls, hops, and fanfares work with zero external network downloads.
  - Sound can be toggled on or off at any time.
- [x] **Local State Persistence:**
  - Refreshing the browser mid-game preserves team scores, positions, and history.
  - Reset button features a confirmation modal to avoid accidental loss.
- [x] **Match Results & Debrief:**
  - Shows final board positions, total marks, accuracy percentage, and topic mastery breakdown.
  - Expandable match history allows instructors to review all questions answered in class.
