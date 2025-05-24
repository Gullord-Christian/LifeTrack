export interface GolfEntry {
    id?: number;
    date: string;
    score: number;
    course: string;
    greens_in_regulation?: string;
    fairways_in_regulation?: string;
    course_rating?: string;
    course_slope?: string;
    yardage?: string;
    par?: string;
    putts: string;
    strokes_over_par?: number;
    notes: string;
}

export function getGolfPB(rounds: GolfEntry[]) {
    if (rounds.length === 0) return null;
    return [...rounds].sort((a, b) => a.score - b.score)[0];
}

export function getLastGolfRound(rounds: GolfEntry[]) {
    if (rounds.length === 0) return null;
    return [...rounds].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
}

export function getOverUnderStyleAndText(overUnder: number | null): {
    text: string | null;
    style: string;
} {
    if (overUnder === null || isNaN(overUnder)) {
        return { text: null, style: "text-gray-500" };
    }

    if (overUnder > 0) {
        return {
            text: `+${overUnder}`,
            style: "text-red-600 font-semibold",
        };
    }

    if (overUnder < 0) {
        return {
            text: `${overUnder}`,
            style: "text-green-600 font-semibold",
        };
    }

    return { text: "Even par", style: "text-yellow-600 font-semibold" };
}
