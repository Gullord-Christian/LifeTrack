import { GolfEntry, getOverUnderStyleAndText } from "./GolfUtils";

export default function GolfPBCard({ round }: { round: GolfEntry | null }) {
    if (!round) {
        return (
            <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
                <h3 className="text-sm text-gray-500 mb-1">Lowest Round</h3>
                <p className="text-gray-400 italic text-sm">No rounds yet</p>
            </div>
        );
    }

    const overUnder =
        round.par && round.score
            ? parseInt(round.score.toString()) - parseInt(round.par.toString())
            : null;

    const { text: overUnderText, style: badgeStyle } =
        getOverUnderStyleAndText(overUnder);

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Personal Best</h3>
            <div className="space-y-1 text-sm text-gray-700">
                <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(round.date).toLocaleDateString()}
                </p>
                {round.course && (
                    <p>
                        <span className="font-semibold">Course:</span>{" "}
                        {round.course}
                    </p>
                )}
                {round.par && (
                    <p>
                        <span className="font-semibold">Par:</span> {round.par}
                    </p>
                )}
                <p>
                    <span className="font-semibold">Score:</span> {round.score}
                </p>
                {overUnderText && (
                    <p>
                        <span className="font-semibold">+/-:</span>{" "}
                        <span className={badgeStyle}>{overUnderText}</span>
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
                {round.putts !== undefined && (
                    <p>
                        <span className="font-semibold">Putts:</span>{" "}
                        {round.putts}
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
        </div>
    );
}
