export interface Habit {
    id: number;
    name: string;
    notes?: string;
    frequency: "daily" | "weekly";
    lastCompleted: string | null; // ISO date
    streak: number;
    createdAt: string;
}

export function getDaysSinceLastCompletion(date: string | null): number {
    if (!date) return Infinity;
    const last = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - last.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function isStreakActive(
    lastCompleted: string | null,
    frequency: "daily" | "weekly"
): boolean {
    const days = getDaysSinceLastCompletion(lastCompleted);
    if (frequency === "daily") return days <= 1;
    if (frequency === "weekly") return days <= 7;
    return false;
}
