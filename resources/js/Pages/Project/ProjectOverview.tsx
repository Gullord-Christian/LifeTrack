import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { projectPages } from "./Features";

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
