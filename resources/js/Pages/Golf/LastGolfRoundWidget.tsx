interface GolfRound {
    id: number;
    date: string;
    score: number;
    notes?: string;
    course?: string;
    greens_in_regulation?: number;
    fairways_in_regulation?: number;
    course_rating?: number;
    course_slope?: number;
    yardage?: number;
}

import { useEffect, useState } from "react";
import axios from "axios";

interface GolfRound {
    id: number;
    date: string;
    score: number;
    notes?: string;
    course?: string;
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

    if (!round) {
        return (
            <div>
                <h3 className="text-sm text-gray-500 mb-1">Last Golf Round</h3>
                <p className="text-gray-400 italic">No rounds logged yet</p>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-sm text-gray-500 mb-1">Last Golf Round</h3>
            <div className="space-y-1 text-sm">
                <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(round.date).toLocaleDateString()}
                </p>
                <p>
                    <span className="font-semibold">Score:</span> {round.score}
                </p>
                {round.course && (
                    <p>
                        <span className="font-semibold">Course:</span>{" "}
                        {round.course}
                    </p>
                )}
                {round.notes && (
                    <p>
                        <span className="font-semibold">Notes:</span>{" "}
                        {round.notes}
                    </p>
                )}
            </div>
        </div>
    );
}
