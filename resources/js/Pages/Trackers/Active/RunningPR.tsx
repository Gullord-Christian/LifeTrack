import {
    RunEntry,
    getTotalMinutes,
    formatPaceDisplay,
    formatDuration,
    getZone,
} from "./Utils/RunUtils";

export default function RunningPR({ runs }: { runs: RunEntry[] }) {
    if (runs.length === 0) return null;

    const getFastestForDistance = (target: number, tolerance = 0.1) => {
        return runs
            .filter(
                (run) =>
                    Math.abs(parseFloat(run.distance) - target) <= tolerance
            )
            .sort(
                (a, b) =>
                    getTotalMinutes(a.duration) / parseFloat(a.distance) -
                    getTotalMinutes(b.duration) / parseFloat(b.distance)
            )[0];
    };

    const oneMile = getFastestForDistance(1);
    const fiveK = getFastestForDistance(3.1);
    const tenK = getFastestForDistance(6.2);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <PRCard label="1 Mile" run={oneMile} />
            <PRCard label="5K" run={fiveK} />
            <PRCard label="10K" run={tenK} />
        </div>
    );
}
function PRCard({ label, run }: { label: string; run?: RunEntry }) {
    if (!run) {
        return (
            <div className="bg-white border rounded shadow p-4 min-h-[100px]">
                <h3 className="text-sm text-gray-500 mb-1">🏅 {label} PR</h3>
                <p className="text-sm text-gray-400 italic">No run logged</p>
            </div>
        );
    }

    const totalTime = formatDuration(run?.duration);
    const pace = formatPaceDisplay(
        getTotalMinutes(run?.duration),
        parseFloat(run.distance)
    );
    const zone = getZone(parseFloat(run.avgHr));

    return (
        <div className="bg-white border rounded shadow p-4">
            <h3 className="text-sm text-gray-500 mb-1">🏅 {label} PR</h3>
            <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{totalTime}</span>{" "}
                total
            </p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">{pace}</span> pace
            </p>
            <p className="text-sm text-gray-500">
                <span
                    className={`inline-block px-1 py-1 rounded text-xs font-medium mt-1 ${zone.color}`}
                >
                    Z{zone.zone} - {zone.label}
                </span>
            </p>
            <p className="text-xs text-gray-400 mt-2">{run.date}</p>
        </div>
    );
}
