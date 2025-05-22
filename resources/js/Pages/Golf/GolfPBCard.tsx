import { GolfEntry } from "./GolfUtils";

export default function GolfPBCard({ round }: { round: GolfEntry | null }) {
    if (!round) {
        return (
            <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
                <h3 className="text-sm text-gray-500 mb-1">Lowest Round</h3>
                <p className="text-gray-400 italic text-sm">No rounds yet</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-1">Personal Best</h3>
            <div className="space-y-1 text-sm text-gray-700">
                <p>
                    <span className="font-semibold">Score:</span> {round.score}
                </p>
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
            </div>
        </div>
    );
}
