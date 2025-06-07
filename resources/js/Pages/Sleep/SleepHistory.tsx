import { format } from "date-fns";
import { formatMinutes, getSleepScoreCategory } from "./SleepUtils";

interface Props {
    sleepData: {
        id: number;
        date: string;
        bed_time: string;
        wake_time: string;
        time_in_bed_minutes: number;
        actual_sleep_minutes: number;
        sleep_score: number;
        awake_minutes: number;
        rem_minutes: number;
        light_minutes: number;
        deep_minutes: number;
        notes?: string;
    }[];
}

export default function SleepHistory({ sleepData }: Props) {
    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Sleep History</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Bed Time</th>
                            <th className="px-4 py-2">Wake Time</th>
                            <th className="px-4 py-2">Time in Bed</th>
                            <th className="px-4 py-2">Actual Sleep</th>
                            <th className="px-4 py-2">Awake</th>
                            <th className="px-4 py-2">REM</th>
                            <th className="px-4 py-2">Light</th>
                            <th className="px-4 py-2">Deep</th>
                            <th className="px-4 py-2">Score</th>
                            <th className="px-4 py-2">Notes</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(sleepData) && sleepData.length > 0 ? (
                            sleepData.map((entry) => (
                                <tr key={entry.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {format(
                                            new Date(entry.date),
                                            "MMM d, yyyy"
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {format(
                                            new Date(entry.bed_time),
                                            "h:mm a"
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {format(
                                            new Date(entry.wake_time),
                                            "h:mm a"
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(
                                            entry.time_in_bed_minutes
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(
                                            entry.actual_sleep_minutes
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(entry.awake_minutes)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(entry.rem_minutes)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(entry.light_minutes)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatMinutes(entry.deep_minutes)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {entry.sleep_score}{" "}
                                        <span className="text-xs text-gray-500">
                                            (
                                            {getSleepScoreCategory(
                                                entry.sleep_score
                                            )}
                                            )
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {entry.notes || (
                                            <span className="text-gray-400 italic">
                                                —
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {/* <button
                                            onClick={() => onDelete(entry.id)}
                                            className="text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button> */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={12}
                                    className="px-4 py-4 text-center text-gray-500 italic"
                                >
                                    No sleep data logged yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
