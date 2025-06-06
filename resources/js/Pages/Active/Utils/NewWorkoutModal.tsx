import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Modal from "@/Components/Modal";
import { Workout } from "./WorkoutUtils";

interface Props {
    onClose: () => void;
    onSaved: (workout: Workout) => void;
}

export default function NewWorkoutModal({ onClose, onSaved }: Props) {
    const [form, setForm] = useState({
        name: "",
        date: new Date().toISOString().slice(0, 10),
        notes: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/lifting/workouts", form);
            onSaved(res.data);
            onClose();
        } catch (err) {
            console.error("Failed to save workout", err);
        }
    };

    return (
        <Modal show onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Log New Workout</h2>

                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Notes</label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border px-3 py-2 rounded"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-lifeTrack-primary text-white rounded"
                    >
                        Save Workout
                    </button>
                </div>
            </form>
        </Modal>
    );
}
