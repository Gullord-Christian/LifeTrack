export interface GolfEntry {
    id?: number;
    date: string;
    score: string;
    course: string;
    greensInReg?: string;
    fairwaysInReg?: string;
    rating?: string;
    slope?: string;
    yardage?: string;
    notes: string;
}

export function getGolfPB(rounds: GolfEntry[]) {
    if (rounds.length === 0) return null;
    return [...rounds].sort((a, b) => parseInt(a.score) - parseInt(b.score))[0];
}

export function getLastGolfRound(rounds: GolfEntry[]) {
    if (rounds.length === 0) return null;
    return [...rounds].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
}
