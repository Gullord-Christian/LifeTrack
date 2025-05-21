export interface ProjectPage {
    name: string;
    description: string;
    features: string[];
}

export const projectPages: ProjectPage[] = [
    {
        name: "Home",
        description:
            "Landing page after login with welcome message and user status.",
        features: [
            "Today's Run: Distance, pace, HR zone (if logged)",
            "Last Golf Round: Score, notes",
            "Budget Overview: This month's spend vs budget",
            "Habit Streak: Consecutive days meeting habit goals",
            "Run Streak: Consecutive days with a run logged",
            "Sleep Goal Streak: Consecutive nights meeting sleep target",
            "Spending Control Streak: Days without overspending",
            "Quote of the Day: Rotating motivational quote",
            "Progress Milestone: e.g. 'You’ve logged 100 miles this year!'",
            "1 Mile PR: Fastest recorded time",
            "5K PR: Fastest recorded time",
            "10K PR: Fastest recorded time",
            "Recent PR Badge: Indicator if a new PR was set recently",
            "Weekly Goal – Runs: Target and current progress",
            "Weekly Goal – Budget Tracking: Target and current progress",
            "Weekly Goal – Sleep Logging: Target and current progress",
            "Quick Add – Run: Add a new run entry",
            "Quick Add – Golf Round: Add a new golf round",
            "Quick Add – Budget Entry: Add a new budget item",
            "Quick Add – Note: Add a new personal note",
            "Activity Calendar: Highlight days with logged activity",
        ],
    },
    {
        name: "Running",
        description: "Track runs with distance, pace, HR zones, and progress.",
        features: [
            "Input distance, time, pace, avg HR",
            "Track weekly/monthly mileage",
            "Highlight personal bests",
            "Chart progress & HR zones",
        ],
    },
    {
        name: "Lifting",
        description: "Track strength workouts and performance.",
        features: [
            "Log exercises, sets, reps, weights",
            "Track PRs for key lifts",
            "View progress over time",
        ],
    },
    {
        name: "Basketball",
        description: "Track court sessions, performance, and notes.",
        features: [
            "Track game days & minutes",
            "Performance notes",
            "Optional stats tracking (points, assists)",
            "Optional stats tracking (points, assists)",
        ],
    },
    {
        name: "Golf",
        description: "Log golf rounds and performance details.",
        features: [
            "Score, birdies, pars, bogeys",
            "FIR, GIR, putts",
            "Stats over time & trends",
            "Best rounds tracking",
        ],
    },
    {
        name: "Budgeting",
        description: "Track income, expenses, debt and savings.",
        features: [
            "Monthly budget view",
            "Expense categories",
            "Debt payoff visualizer",
            "Savings goal tracking",
        ],
    },
    {
        name: "Sleep",
        description: "Track sleep hours and quality over time.",
        features: [
            "Log sleep hours",
            "Rate sleep quality",
            "Track weekly/monthly averages",
            "Visualize sleep patterns",
        ],
    },
    {
        name: "Habits",
        description: "Track habits and build streaks.",
        features: [
            "Create recurring habits",
            "Streak & consistency tracking",
            "Calendar view",
            "Reminders/motivation",
        ],
    },
    {
        name: "Calendar",
        description: "Visual calendar for events, habits, and workouts.",
        features: ["Day/week/month view", "Show habits/runs", "Event notes"],
    },
    {
        name: "Notes/Ideas",
        description: "Journaling and idea capture space.",
        features: [
            "Freeform entries",
            "Tagging & categorization",
            "Markdown support (optional)",
            "Journaling tools",
        ],
    },
    {
        name: "Job Tracking",
        description: "Track applications, interviews, and notes.",
        features: [
            "Application list",
            "Company/position/date",
            "Interview status tracking",
            "Resume notes & links",
        ],
    },
];
