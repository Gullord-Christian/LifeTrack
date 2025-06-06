import { SleepEntry } from "./SleepUtils";
import { format } from "date-fns";
import { formatMinutes, getSleepScoreCategory } from "./SleepUtils";

export default function SleepCard({ sleepData }: { sleepData: SleepEntry[] }) {
    if (!sleepData.length) return null;

    const lastNight = sleepData[0];
    const bestSleep = [...sleepData].sort(
        (a, b) => b.sleep_score - a.sleep_score
    )[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 shadow rounded border">
                <h3 className="text-sm text-gray-500">Last Night</h3>
                <p className="text-lg font-semibold">
                    {format(new Date(lastNight.date), "MMM d")}
                </p>
                <p className="text-sm text-gray-600">
                    Sleep Score: {lastNight.sleep_score} (
                    {getSleepScoreCategory(lastNight.sleep_score)})
                </p>
                <p className="text-sm text-gray-600">
                    Sleep Duration:{" "}
                    {formatMinutes(lastNight.actual_sleep_minutes)}
                </p>
            </div>

            <div className="bg-white p-4 shadow rounded border">
                <h3 className="text-sm text-gray-500">Best Score</h3>
                <p className="text-lg font-semibold">
                    {bestSleep.sleep_score}/100
                </p>
                <p className="text-sm text-gray-600">
                    {format(new Date(bestSleep.date), "MMM d")}
                </p>
                <p className="text-sm text-gray-600">
                    {getSleepScoreCategory(bestSleep.sleep_score)}
                </p>
            </div>
        </div>
    );
}
