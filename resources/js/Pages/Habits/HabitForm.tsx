import { FormEvent, useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

export default function HabitForm({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({
        name: "",
        notes: "",
        frequency: "daily",
        start_date: new Date().toISOString().slice(0, 10), // today's date
        weekly_target: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("/api/habits", form);
            setForm({
                name: "",
                notes: "",
                frequency: "daily",
                start_date: new Date().toISOString().slice(0, 10),
                weekly_target: "",
            });
            onClose();
        } catch (error) {
            console.error("Error creating habit:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Habit Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Notes (optional)
                </label>
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    rows={2}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Frequency
                </label>
                <select
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>

            {/* Only show this if "weekly" is selected */}
            {form.frequency === "weekly" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Weekly Target (1–7)
                    </label>
                    <input
                        type="number"
                        name="weekly_target"
                        min={1}
                        max={7}
                        value={form.weekly_target}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-lifeTrack-primary text-white rounded hover:bg-lifeTrack-light"
                >
                    Add Habit
                </button>
            </div>
        </form>
    );
}
