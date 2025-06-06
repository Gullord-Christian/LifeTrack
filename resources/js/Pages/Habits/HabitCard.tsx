import axios from "axios";
import {
    Habit,
    isStreakActive,
    getDaysSinceLastCompletion,
    getWeeklyCompletions,
} from "./HabitUtils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "@/Components/Modal";
import toast from "react-hot-toast";

export default function HabitCard({
    habit,
    onDelete,
}: {
    habit: Habit;
    onDelete: () => void;
}) {
    const [showModal, setShowModal] = useState(false);

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
        try {
            await axios.delete(`/api/habits/${habit.id}`);
            toast.success(`"${habit.name}" deleted`);
            onDelete();
            setShowModal(false);
        } catch (err) {
            toast.error("Failed to delete habit.");
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
                            onClick={() => setShowModal(true)}
                            className=" text-red-500 hover:text-red-700"
                            title="Delete Habit"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    {habit.notes && (
                        <p className="font-italic text-xs mt-2">
                            {habit.notes}
                        </p>
                    )}
                </div>

                <div className="w-24 h-2 rounded bg-gray-200 overflow-hidden">
                    <div
                        className={`${barColor} h-full transition-all`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Delete Habit</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Are you sure you want to delete the habit{" "}
                        <span className="font-semibold">{habit.name}</span>?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
