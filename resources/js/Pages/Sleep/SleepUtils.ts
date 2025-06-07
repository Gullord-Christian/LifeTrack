export type SleepCycleType = "Awake" | "REM" | "Light" | "Deep";

export interface SleepCycle {
    type: SleepCycleType;
    durationMinutes: number;
}

export interface SleepEntry {
    id: number;
    date: string;
    bed_time: string;
    wake_time: string;
    time_in_bed_minutes?: number;
    actual_sleep_minutes: number;
    sleep_score: number;
    awake_minutes: number;
    rem_minutes: number;
    light_minutes: number;
    deep_minutes: number;
    notes?: string;
}

// Format score into a label
export function getSleepScoreCategory(
    score: number
): "Needs Attention" | "Fair" | "Good" | "Excellent" {
    if (score < 60) return "Needs Attention";
    if (score < 75) return "Fair";
    if (score < 85) return "Good";
    return "Excellent";
}

// Format minutes as `Xh Ym`
export function formatMinutes(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}
