export interface Completion {
    completed_date: string;
}

export interface Habit {
    id: number;
    name: string;
    frequency: "daily" | "weekly";
    notes?: string;
    streak: number;
    last_completed_at: string | null;
    completions?: Completion[];
    weekly_target?: number;
}

export function getDaysSinceLastCompletion(date: string | null): number {
    if (!date) return 0;
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

export function getDaysSince(dateString: string | null): number {
    if (!dateString) return 0;
    const then = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - then.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getWeeklyCompletions(habit: Habit, weekDates: Date[]): number {
    if (!habit.completions) return 0;

    const targetDates = new Set(
        weekDates.map((d) => d.toISOString().slice(0, 10))
    );

    return habit.completions.filter((c) => targetDates.has(c.completed_date))
        .length;
}
