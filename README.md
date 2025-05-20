# 🧭 LifeTrack – Project Overview & Feature Tracker

LifeTrack is a personal dashboard for managing and visualizing various aspects of life including fitness, health, productivity, and personal goals. This README serves as a central guide for development.

---

## 🎨 Color Theme

| Name     | Color     | Usage                        |
| -------- | --------- | ---------------------------- |
| Lightest | `#DFF2EB` | Backgrounds, soft cards      |
| Light    | `#B9E5E8` | Accent, secondary background |
| Primary  | `#7AB2D3` | Buttons, highlights          |
| Dark     | `#4A628A` | Sidebar, headings, nav       |

All accessible via Tailwind as `tracklife-lightest`, `tracklife-primary`, etc.

---

## 🧱 Tech Stack

| Layer    | Tool                 |
| -------- | -------------------- |
| Frontend | React + Inertia.js   |
| Backend  | Laravel 11           |
| Styling  | Tailwind CSS         |
| Auth     | Laravel Breeze       |
| DB       | SQLite (dev)         |
| Charts   | Recharts or Chart.js |

---

## 📂 Pages & Features

### 🏠 Home

-   **Description:** Landing page after login
-   **Features:**
    -   Welcome message or quote
    -   Quick overview / widgets
    -   "Logged in as..." status

---

### 🏋️‍♂️ Active

-   **Description:** Parent tab for physical activity tracking (Lifting, Running, Basketball)
-   **Features:**
    -   Collapsible child nav items
    -   Aggregate view (optional)

#### 🔩 Lifting

-   Track exercises, sets, reps, weights
-   Visualize strength progress over time
-   Personal records for key lifts (squat, bench, deadlift, etc.)

#### 🏃‍♂️ Running

-   Log distance, time, pace, average HR (BPM)
-   View runs by week, month, year
-   Highlight personal bests (5K, 10K, longest distance, etc.)
-   Zone 2 vs Zone 5 training tracking
-   Charts: pace over time, HR zones, mileage progression

#### 🏀 Basketball

-   Track game days, minutes played
-   Notes for performance review
-   Option to log stats (points, assists, etc.)

---

### 🏌️ Golf

-   Log rounds played with date/location
-   Track score, birdies, pars, bogeys, double+
-   FIR (fairways in regulation), GIR (greens), putts
-   Stats by round or aggregate
-   Best score tracking and trends

---

### 💰 Budgeting

-   Track income, expenses, debt
-   Monthly budget planning
-   Expense categories (Food, Rent, Travel, etc.)
-   Visual debt payoff progress
-   Savings goal tracking

---

### 😴 Sleep

-   Log hours slept each night
-   Rate sleep quality (1–5)
-   Track patterns over weeks/months
-   Average sleep graph

---

### 🔁 Habits

-   Create daily/weekly habits
-   Track streaks and consistency
-   Habit calendar view
-   Reminders and motivational notes

---

### 📅 Calendar

-   Unified view of runs, habits, events
-   View by day/week/month
-   Optional integration with reminders

---

### 🗒 Notes/Ideas

-   Freeform text entries
-   Categorize by tags (e.g., idea, log, reminder)
-   Markdown support (optional)
-   Journaling feature

---

### 💼 Job Tracking

-   Track job applications and statuses
-   Fields: Company, Position, Date Applied, Follow-up Notes
-   Upcoming interviews section
-   Resume links and notes

---

## 🔜 Future Enhancements

-   User settings (units: miles/km, dark mode)
-   Charts & graphs (d3 or chart.js)
-   Export/import data (CSV, JSON)
-   Notifications/reminders
-   Mobile-friendly layout

---
