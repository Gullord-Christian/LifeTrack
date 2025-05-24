import { useState } from "react";
import { RunEntry } from "./Utils/RunUtils";

interface RunFormData {
    date: string;
    durationMinutes: string;
    durationSeconds: string;
    distance: string;
    avgHr: string;
    notes: string;
}

export default function RunLogger({
    onClose,
    onSave,
    existingRun,
}: {
    onClose: () => void;
    onSave: (run: RunEntry) => void;
    existingRun?: RunEntry | null;
}) {
    const [form, setForm] = useState<RunFormData>(() => {
        if (existingRun) {
            return {
                date: existingRun.date,
                durationMinutes: String(existingRun.duration.minutes),
                durationSeconds: String(existingRun.duration.seconds),
                distance: existingRun.distance,
                avgHr: existingRun.avgHr,
                notes: existingRun.notes,
            };
        }

        return {
            date: "",
            durationMinutes: "",
            durationSeconds: "",
            distance: "",
            avgHr: "",
            notes: "",
        };
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const minutes = parseInt(form.durationMinutes || "0");
        const seconds = parseInt(form.durationSeconds || "0");

        const newRun: RunEntry = {
            ...(existingRun?.id ? { id: existingRun.id } : {}),
            date: form.date,
            duration: { minutes, seconds },
            distance: form.distance,
            avgHr: form.avgHr,
            notes: form.notes,
        };
        onSave(newRun);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-2">Log a New Run</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Duration
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            name="durationMinutes"
                            value={form.durationMinutes}
                            onChange={handleChange}
                            className="w-20 border px-2 py-1 rounded"
                            placeholder="Min"
                        />
                        <span>:</span>
                        <input
                            type="number"
                            name="durationSeconds"
                            value={form.durationSeconds}
                            onChange={handleChange}
                            className="w-20 border px-2 py-1 rounded"
                            placeholder="Sec"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Distance (mi)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="distance"
                        value={form.distance}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Avg HR</label>
                    <input
                        type="number"
                        name="avgHr"
                        value={form.avgHr}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                    name="notes"
                    rows={2}
                    value={form.notes}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="text-sm bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                >
                    Save Run
                </button>
            </div>
        </form>
    );
}
