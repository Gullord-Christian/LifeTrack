import { Habit } from "./HabitUtils";
import { useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getWeeklyCompletions } from "./HabitUtils";

interface Props {
    habits: Habit[];
    onRefresh: () => void;
}

export default function WeeklyHabitGrid({ habits, onRefresh }: Props) {
    const startOfWeek = useMemo(() => {
        const now = new Date();
        const day = now.getDay(); // 0 (Sun) to 6 (Sat)
        const diff = now.getDate() - day;
        const start = new Date(now.setDate(diff));
        return [...Array(7)].map((_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d;
        });
    }, []);

    const handleToggle = async (
        habitID: number,
        date: Date,
        isChecked: boolean
    ) => {
        const dateStr = date.toISOString().slice(0, 10);

        try {
            if (isChecked) {
                await axios.post(`/api/habits/${habitID}/complete`, {
                    completed_date: dateStr,
                });
            } else {
                await axios.delete(`/api/habits/${habitID}/complete`, {
                    data: { completed_date: dateStr },
                });
            }

            onRefresh();
        } catch (error) {
            console.error("Habit toggle failed:", error);
        }
    };

    return (
        <div className="overflow-x-auto mt-10">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr>
                        <th className="p-2 border text-left w-32">Habit</th>
                        {startOfWeek.map((d) => (
                            <th
                                key={d.toDateString()}
                                className="p-2 border text-center text-xs"
                            >
                                {d.toLocaleDateString("en-US", {
                                    weekday: "short",
                                })}
                                <br />
                                <span className="text-gray-400 text-[10px]">
                                    {d.getMonth() + 1}/{d.getDate()}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(habits) ? (
                        habits.map((habit) => {
                            const completionsThisWeek = getWeeklyCompletions(
                                habit,
                                startOfWeek
                            );

                            const isWeeklyComplete =
                                habit.frequency === "weekly" &&
                                habit.weekly_target &&
                                completionsThisWeek >= habit.weekly_target;

                            return (
                                <tr
                                    key={habit.id}
                                    className={`transition-all duration-300 ${
                                        isWeeklyComplete
                                            ? "bg-green-50 text-gray-500 line-through"
                                            : ""
                                    }`}
                                >
                                    <td className="p-2 border font-medium">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex flex-col items-center gap-2">
                                                {habit.name}
                                            </div>
                                        </div>
                                    </td>

                                    {startOfWeek.map((date) => {
                                        const dateStr = date
                                            .toISOString()
                                            .slice(0, 10);
                                        const isChecked =
                                            habit.completions?.some(
                                                (c) =>
                                                    c.completed_date === dateStr
                                            );

                                        return (
                                            <td
                                                key={dateStr}
                                                className="p-2 border text-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={!!isChecked}
                                                    onChange={async (e) => {
                                                        await handleToggle(
                                                            habit.id,
                                                            date,
                                                            e.target.checked
                                                        );

                                                        // Show toast if target just hit
                                                        const newCount =
                                                            isChecked
                                                                ? completionsThisWeek -
                                                                  1
                                                                : completionsThisWeek +
                                                                  1;

                                                        if (
                                                            habit.frequency ===
                                                                "weekly" &&
                                                            habit.weekly_target &&
                                                            newCount ===
                                                                habit.weekly_target
                                                        ) {
                                                            toast.success(
                                                                `"${habit.name}" goal completed for the week!`
                                                            );
                                                        }
                                                    }}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="text-center text-red-500 p-4"
                            >
                                Habit data unavailable
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
