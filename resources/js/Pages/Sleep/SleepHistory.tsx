import { SleepEntry } from "./SleepUtils";
import { format } from "date-fns";
import { formatMinutes, getSleepScoreCategory } from "./SleepUtils";

export default function SleepHistory({
    sleepData,
}: {
    sleepData: SleepEntry[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sleepData.map((entry) => (
                <div
                    key={entry.id}
                    className="bg-white border rounded shadow p-4"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="font-semibold text-lg">
                                {format(new Date(entry.date), "MMMM d, yyyy")}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Bed: {entry.bed_time} – Wake: {entry.wake_time}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold">
                                {entry.sleep_score}/100
                            </p>
                            <p className="text-xs text-gray-400">
                                {getSleepScoreCategory(entry.sleep_score)}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                        <p>
                            <strong>Time in Bed:</strong>{" "}
                            {entry.time_in_bed_minutes}
                        </p>
                        <p>
                            <strong>Actual Sleep:</strong>{" "}
                            {formatMinutes(entry.actual_sleep_minutes)}
                        </p>
                        <p>
                            <strong>Sleep Cycles:</strong> Awake{" "}
                            {entry.awake_minutes}m, REM {entry.rem_minutes}m,
                            Light {entry.light_minutes}m, Deep{" "}
                            {entry.deep_minutes}m
                        </p>
                        {entry.notes && (
                            <p>
                                <strong>Notes:</strong> {entry.notes}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
