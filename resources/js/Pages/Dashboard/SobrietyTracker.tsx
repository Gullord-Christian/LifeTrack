import { getDaysSince } from "@/Pages/Habits/HabitUtils";

const sobrietyDates: Record<string, string> = {
    alcohol: "2025-05-13",
    adderall: "2025-05-11",
    weed: "2025-05-22",
    caffeine: "2025-05-23",
};

export default function SobrietyTracker() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(sobrietyDates).map(([label, date]) => (
                <div
                    key={label}
                    className="bg-white border rounded shadow p-4 text-center"
                >
                    <h3 className="text-sm font-semibold capitalize text-gray-600">
                        {label}
                    </h3>
                    <p className="text-xl font-bold text-lifeTrack-primary">
                        {getDaysSince(date)} days
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        since {new Date(date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
