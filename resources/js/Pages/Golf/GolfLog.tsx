import { useState } from "react";
import { GolfEntry } from "./GolfUtils";

export default function GolfLog({
    onClose,
    onSave,
}: {
    onClose: () => void;
    onSave: (entry: GolfEntry) => void;
}) {
    const [form, setForm] = useState<GolfEntry>({
        date: "",
        score: "",
        course: "",
        greensInReg: "",
        fairwaysInReg: "",
        rating: "",
        slope: "",
        yardage: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-2">Log a Golf Round</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Date"
                />
                <input
                    name="course"
                    type="text"
                    value={form.course}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Course"
                />
                <input
                    name="score"
                    type="number"
                    value={form.score}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Score"
                />
                <input
                    name="greensInReg"
                    type="number"
                    value={form.greensInReg}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="GIR (0–18)"
                />
                <input
                    name="fairwaysInReg"
                    type="number"
                    value={form.fairwaysInReg}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="FIR (0–14)"
                />
                <input
                    name="rating"
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Rating"
                />
                <input
                    name="slope"
                    type="number"
                    value={form.slope}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Slope"
                />
                <input
                    name="yardage"
                    type="number"
                    value={form.yardage}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                    placeholder="Yardage"
                />
            </div>

            <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full border px-3 py-2 rounded"
                placeholder="Notes"
            />

            <div className="flex justify-end gap-2">
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
                    Save Round
                </button>
            </div>
        </form>
    );
}
