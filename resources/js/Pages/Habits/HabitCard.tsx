import {
    Habit,
    isStreakActive,
    getDaysSinceLastCompletion,
} from "./HabitUtils";

export default function HabitCard({ habit }: { habit: Habit }) {
    const active = isStreakActive(habit.last_completed_at, habit.frequency);
    const daysSince = getDaysSinceLastCompletion(habit.last_completed_at);

    return (
        <div className="bg-white border rounded p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">{habit.name}</h3>
                    <p className="text-xs text-gray-500">
                        {habit.frequency} – {habit.streak} day streak
                    </p>
                </div>
                <div className="text-right">
                    <span
                        className={`text-sm px-2 py-1 rounded ${
                            active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {active ? "On Track" : `${daysSince} days missed`}
                    </span>
                </div>
            </div>
        </div>
    );
}
