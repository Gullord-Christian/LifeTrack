import { SleepEntry } from "./SleepUtils";
import { format, differenceInDays, parseISO } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { formatMinutes, getSleepScoreCategory } from "./SleepUtils";

export default function SleepCard({ sleepData }: { sleepData: SleepEntry[] }) {
    if (!sleepData.length) return null;

    const lastNight = sleepData[0];
    const bestSleep = [...sleepData].sort(
        (a, b) => b.sleep_score - a.sleep_score
    )[0];

    console.log(
        "bed_time original:",
        lastNight.bed_time,
        "parsed:",
        new Date(lastNight.bed_time),
        "formatted:",
        formatInTimeZone(lastNight.bed_time, "America/Los_Angeles", "h:mm a")
    );

    const timeZone = "America/Los_Angeles";

    const sevenDays = sleepData.filter((entry) => {
        const daysAgo = differenceInDays(new Date(), parseISO(entry.date));
        return daysAgo <= 6;
    });

    const averageSleepMinutes =
        sevenDays.reduce((acc, entry) => acc + entry.actual_sleep_minutes, 0) /
        (sevenDays.length || 1);

    const avgHours = Math.floor(averageSleepMinutes / 60);
    const avgMinutes = Math.round(averageSleepMinutes % 60);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Last Night */}
            <div className="bg-white p-4 shadow rounded border">
                <h3 className="text-sm text-gray-500">Last Night</h3>
                <p className="text-lg font-semibold">
                    {lastNight?.date
                        ? format(new Date(lastNight.date), "MMM d")
                        : "Invalid Date"}
                </p>
                <p className="text-sm text-gray-600">
                    Bed:{" "}
                    {formatInTimeZone(
                        lastNight.bed_time,
                        "America/Los_Angeles",
                        "h:mm a"
                    )}
                </p>
                <p className="text-sm text-gray-600">
                    Wake:{" "}
                    {formatInTimeZone(
                        lastNight.wake_time,
                        "America/Los_Angeles",
                        "h:mm a"
                    )}
                </p>

                <p className="text-sm text-gray-600">
                    Sleep Duration:{" "}
                    {formatMinutes(lastNight.actual_sleep_minutes)}
                </p>
                <p className="text-sm text-gray-600">
                    Sleep Score: {lastNight.sleep_score} (
                    {getSleepScoreCategory(lastNight.sleep_score)})
                </p>
            </div>

            {/* Best Score */}
            {/* <div className="bg-white p-4 shadow rounded border">
                <h3 className="text-sm text-gray-500">Best Score</h3>
                <p className="text-lg font-semibold">
                    {bestSleep?.date
                        ? format(new Date(bestSleep.date), "MMM d")
                        : "Invalid Date"}
                </p>
                <p className="text-sm text-gray-600">
                    Bed: {format(new Date(bestSleep.bed_time), "h:mm a")}
                </p>
                <p className="text-sm text-gray-600">
                    Wake: {format(new Date(bestSleep.wake_time), "h:mm a")}
                </p>
                <p className="text-sm text-gray-600">
                    Sleep Duration:{" "}
                    {formatMinutes(lastNight.actual_sleep_minutes)}
                </p>
                <p className="text-sm text-gray-600">
                    Sleep Score: {bestSleep.sleep_score} (
                    {getSleepScoreCategory(bestSleep.sleep_score)})
                </p>
            </div> */}

            {/* Average Weekly Sleep */}
            <div className="bg-white p-4 shadow rounded border">
                <h3 className="text-sm text-gray-500">Avg Sleep (7 days)</h3>
                <p className="text-lg font-semibold">
                    {avgHours}h {avgMinutes}m
                </p>
                <p className="text-sm text-gray-600 text-nowrap">
                    Based on {sevenDays.length} night
                    {sevenDays.length !== 1 ? "s" : ""}
                </p>
            </div>
        </div>
    );
}
