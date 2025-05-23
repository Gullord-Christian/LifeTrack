import { router } from "@inertiajs/react";
import { Habit } from "./HabitUtils";
import { useMemo } from "react";

interface Props {
    habits: Habit[];
}

export default function WeeklyHabitGrid({ habits }: Props) {
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

    const handleToggle = (habitID: number, date: Date, isChecked: boolean) => {
        const dateStr = date.toISOString().slice(0, 10);

        if (isChecked) {
            router.post(`/habits/${habitID}/complete`, {
                completed_date: dateStr,
            });
        } else {
            router.delete(`/habits/${habitID}/complete`, {
                data: { completed_date: dateStr },
            });
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
                        habits.map((habit) => (
                            <tr key={habit.id}>
                                <td className="p-2 border font-medium">
                                    {habit.name}
                                </td>
                                {startOfWeek.map((date) => {
                                    const dateStr = date
                                        .toISOString()
                                        .slice(0, 10);
                                    const isChecked = habit.completions?.some(
                                        (c) => c.completed_date === dateStr
                                    );

                                    return (
                                        <td
                                            key={dateStr}
                                            className="p-2 border text-center"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={!!isChecked}
                                                onChange={(e) =>
                                                    handleToggle(
                                                        habit.id,
                                                        date,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
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
