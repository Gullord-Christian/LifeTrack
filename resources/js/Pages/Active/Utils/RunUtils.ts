export interface RunEntry {
    id?: number;
    date: string;
    duration: {
        minutes: number;
        seconds: number;
    };
    distance: string;
    avgHr: string;
    notes: string;
}

// Convert duration to total minutes as float
export function getTotalMinutes(duration?: {
    minutes: number;
    seconds: number;
}) {
    if (!duration) return 0;
    return duration.minutes + duration.seconds / 60;
}

// Format to mm:ss
export function formatDuration(duration?: {
    minutes: number;
    seconds: number;
}) {
    if (!duration) return "00:00";
    const min = String(duration.minutes ?? 0).padStart(2, "0");
    const sec = String(duration.seconds ?? 0).padStart(2, "0");
    return `${min}:${sec}`;
}

// Calculate pace per mile in mm:ss
export function formatPaceDisplay(
    durationMinutes: number,
    distance: number
): string {
    if (!durationMinutes || !distance) return "-";
    const pace = durationMinutes / distance;
    const min = Math.floor(pace);
    const sec = Math.round((pace - min) * 60);
    return `${min}:${sec.toString().padStart(2, "0")} /mi`;
}

// Heart rate zone logic
export function getZone(avgHr: number): {
    zone: number;
    label: string;
    color: string;
} {
    if (avgHr >= 167)
        return { zone: 5, label: "Maximum", color: "bg-red-100 text-red-700" };
    if (avgHr >= 149)
        return {
            zone: 4,
            label: "Anaerobic",
            color: "bg-yellow-100 text-yellow-800",
        };
    if (avgHr >= 130)
        return {
            zone: 3,
            label: "Aerobic",
            color: "bg-green-100 text-green-700",
        };
    if (avgHr >= 112)
        return { zone: 2, label: "Base", color: "bg-blue-100 text-blue-700" };
    if (avgHr >= 92)
        return { zone: 1, label: "Low", color: "bg-gray-200 text-gray-700" };
    return { zone: 0, label: "N/A", color: "bg- text-gray-400" };
}

export function getMileageSummary(runs: RunEntry[]) {
    const now = new Date();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const total = {
        week: 0,
        month: 0,
        year: 0,
    };

    runs.forEach((run) => {
        const date = new Date(run.date);
        const distance = parseFloat(run.distance || "0");

        if (date >= startOfWeek) total.week += distance;
        if (date >= startOfMonth) total.month += distance;
        if (date >= startOfYear) total.year += distance;
    });

    return {
        week: total.week.toFixed(2),
        month: total.month.toFixed(2),
        year: total.year.toFixed(2),
    };
}
