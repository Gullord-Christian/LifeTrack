import { useEffect, useState } from "react";
import axios from "axios";
import { getOverUnderStyleAndText } from "./GolfUtils";
import GolfRoundSummaryCard from "./GolfRoundSummaryCard";

interface GolfRound {
    id: number;
    date: string;
    score: number;
    course?: string;
    notes?: string;
    greens_in_regulation?: number;
    fairways_in_regulation?: number;
    course_rating?: number;
    course_slope?: number;
    yardage?: number;
    par: string;
    putts?: number;
}

export default function LastGolfRoundWidget() {
    const [round, setRound] = useState<GolfRound | null>(null);

    useEffect(() => {
        axios
            .get("/api/golf/last")
            .then((res) => {
                if (res.data) setRound(res.data);
            })
            .catch(() => setRound(null));
    }, []);

    const overUnder =
        round?.par && round?.score ? round.score - parseInt(round.par) : null;

    const { text: overUnderText, style: badgeStyle } =
        getOverUnderStyleAndText(overUnder);

    return (
        <div>
            {!round ? (
                <p className="text-gray-400 italic text-sm">
                    No rounds logged yet
                </p>
            ) : (
                <GolfRoundSummaryCard title={"Last Round"} round={round} />
            )}
        </div>
    );
}
