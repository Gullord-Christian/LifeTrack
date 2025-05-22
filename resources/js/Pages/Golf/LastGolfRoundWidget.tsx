import { useEffect, useState } from "react";
import axios from "axios";

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

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Last Round</h3>
            {!round ? (
                <p className="text-gray-400 italic text-sm">
                    No rounds logged yet
                </p>
            ) : (
                <div className="space-y-1 text-sm text-gray-700">
                    <p>
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(round.date).toLocaleDateString()}
                    </p>
                    <p>
                        <span className="font-semibold">Score:</span>{" "}
                        {round.score}
                    </p>
                    {round.course && (
                        <p>
                            <span className="font-semibold">Course:</span>{" "}
                            {round.course}
                        </p>
                    )}
                    {round.greens_in_regulation !== undefined && (
                        <p>
                            <span className="font-semibold">GIR:</span>{" "}
                            {round.greens_in_regulation}/18
                        </p>
                    )}
                    {round.fairways_in_regulation !== undefined && (
                        <p>
                            <span className="font-semibold">FIR:</span>{" "}
                            {round.fairways_in_regulation}/14
                        </p>
                    )}
                    {round.course_rating && (
                        <p>
                            <span className="font-semibold">Rating:</span>{" "}
                            {round.course_rating}
                        </p>
                    )}
                    {round.course_slope && (
                        <p>
                            <span className="font-semibold">Slope:</span>{" "}
                            {round.course_slope}
                        </p>
                    )}
                    {round.yardage && (
                        <p>
                            <span className="font-semibold">Yardage:</span>{" "}
                            {round.yardage} yds
                        </p>
                    )}
                    {round.notes && (
                        <p>
                            <span className="font-semibold">Notes:</span>{" "}
                            {round.notes}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
