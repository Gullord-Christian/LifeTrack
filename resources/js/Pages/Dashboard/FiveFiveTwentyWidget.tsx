import { useState } from "react";

export default function FiveFiveTwentyWidget() {
    const [goals, setGoals] = useState(["", "", "", "", ""]);
    const [gratitudes, setGratitudes] = useState(["", "", "", "", ""]);
    const [repsDone, setRepsDone] = useState(false);

    return (
        <div className="bg-white border rounded p-4 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">🧘 5-5-20 Tracker</h2>

            <div className="mb-3">
                <h3 className="font-medium mb-1">🎯 5 Goals</h3>
                {goals.map((goal, i) => (
                    <input
                        key={i}
                        value={goal}
                        onChange={(e) =>
                            setGoals((prev) => {
                                const updated = [...prev];
                                updated[i] = e.target.value;
                                return updated;
                            })
                        }
                        placeholder={`Goal ${i + 1}`}
                        className="block w-full border rounded px-3 py-1 mb-1 text-sm"
                    />
                ))}
            </div>

            <div className="mb-3">
                <h3 className="font-medium mb-1">🙏 5 Gratitudes</h3>
                {gratitudes.map((g, i) => (
                    <input
                        key={i}
                        value={g}
                        onChange={(e) =>
                            setGratitudes((prev) => {
                                const updated = [...prev];
                                updated[i] = e.target.value;
                                return updated;
                            })
                        }
                        placeholder={`Gratitude ${i + 1}`}
                        className="block w-full border rounded px-3 py-1 mb-1 text-sm"
                    />
                ))}
            </div>

            <div>
                <label className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        checked={repsDone}
                        onChange={() => setRepsDone(!repsDone)}
                    />
                    ✅ Completed 20 reps
                </label>
            </div>
        </div>
    );
}
