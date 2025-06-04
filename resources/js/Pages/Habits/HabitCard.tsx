import axios from "axios";
import {
    Habit,
    isStreakActive,
    getDaysSinceLastCompletion,
    getWeeklyCompletions,
} from "./HabitUtils";
import { Trash2 } from "lucide-react";

export default function HabitCard({
    habit,
    onDelete,
}: {
    habit: Habit;
    onDelete: () => void;
}) {
    const active = isStreakActive(habit.last_completed_at, habit.frequency);
    const daysSince = getDaysSinceLastCompletion(habit.last_completed_at);

    const now = new Date();
    const day = now.getDay();
    const startOfWeek = new Date(now.setDate(now.getDate() - day));
    const weekDates = [...Array(7)].map((_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return d;
    });

    const handleDelete = async () => {
        if (
            confirm(
                `Are you sure you want to delete the habit "${habit.name}"?`
            )
        ) {
            await axios.delete(`/api/habits/${habit.id}`);
            onDelete(); // Refresh parent
        }
    };

    const weeklyCount = getWeeklyCompletions(habit, weekDates);
    const progress = habit.weekly_target
        ? Math.min((weeklyCount / habit.weekly_target) * 100, 100)
        : 0;

    const barColor =
        progress === 100
            ? "bg-green-500"
            : progress >= 50
            ? "bg-yellow-400"
            : "bg-red-400";

    return (
        <div className="bg-white border rounded p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex gap-2">
                        <h3 className="font-semibold">{habit.name}</h3>
                        <button
                            onClick={handleDelete}
                            className=" text-red-500 hover:text-red-700"
                            title="Delete Habit"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">
                        {habit.frequency} – {habit.streak} day streak
                    </p>
                </div>

                <div className="w-24 h-2 rounded bg-gray-200 overflow-hidden">
                    <div
                        className={`${barColor} h-full transition-all`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
