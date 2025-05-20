import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
// import {logo} from "@/";

interface ProjectPage {
    name: string;
    description: string;
    features: string[];
}

const projectPages: ProjectPage[] = [
    {
        name: "Home",
        description:
            "Landing page after login with welcome message and user status.",
        features: [
            "Welcome message, quote",
            "Quick overview / widgets",
            '"Logged in as..." status',
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

export default function ProjectOverview() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [checkedFeatures, setCheckedFeatures] = useState<
        Record<string, boolean[]>
    >(() => {
        const stored = localStorage.getItem("lifetrack_project_progress");
        if (stored) return JSON.parse(stored);

        const initial: Record<string, boolean[]> = {};
        projectPages.forEach((page) => {
            initial[page.name] = new Array(page.features.length).fill(false);
        });
        return initial;
    });

    useEffect(() => {
        localStorage.setItem(
            "lifetrack_project_progress",
            JSON.stringify(checkedFeatures)
        );
    }, [checkedFeatures]);

    const toggleExpand = (name: string) => {
        setExpanded((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const toggleFeature = (pageName: string, index: number) => {
        setCheckedFeatures((prev) => ({
            ...prev,
            [pageName]: prev[pageName].map((checked, i) =>
                i === index ? !checked : checked
            ),
        }));
    };

    const getStatus = (checks: boolean[]) => {
        if (checks.every(Boolean)) return "Complete";
        if (checks.some(Boolean)) return "In Progress";
        return "Not Started";
    };

    const statusBadge = (status: string) => {
        const base = "text-xs px-2 py-1 rounded font-semibold";
        switch (status) {
            case "Complete":
                return `${base} bg-green-100 text-green-700`;
            case "In Progress":
                return `${base} bg-yellow-100 text-yellow-700`;
            case "Not Started":
            default:
                return `${base} bg-gray-100 text-gray-700`;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">🛠 Project Overview</h1>
                <Link href="/dashboard" className="hover:opacity-80 transition">
                    <img
                        src="/images/alien_life_track_logo.png"
                        alt="LifeTrack Logo"
                        className="h-24 w-auto"
                        title="Back to Home"
                    />
                </Link>
            </div>

            <div className="space-y-4">
                {projectPages.map((page) => {
                    const isOpen = expanded[page.name] ?? false;
                    const checks = checkedFeatures[page.name] || [];
                    const status = getStatus(checks);

                    return (
                        <div
                            key={page.name}
                            className="border border-gray-200 rounded"
                        >
                            <button
                                onClick={() => toggleExpand(page.name)}
                                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="font-semibold text-left">
                                    {page.name}
                                    <div className="text-sm text-gray-500">
                                        {page.description}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={statusBadge(status)}>
                                        {status}
                                    </span>
                                    {isOpen ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-6 py-4">
                                    <ul className="space-y-2 text-sm">
                                        {page.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        checkedFeatures[
                                                            page.name
                                                        ]?.[i] || false
                                                    }
                                                    onChange={() =>
                                                        toggleFeature(
                                                            page.name,
                                                            i
                                                        )
                                                    }
                                                />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
