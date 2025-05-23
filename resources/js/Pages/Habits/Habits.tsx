import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Habit } from "./HabitUtils";
import HabitCard from "./HabitCard";

export default function Habits() {
    const { habits } = usePage().props as { habits: Habit[] };
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">🧠 Habits Tracker</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-lifeTrack-primary text-white px-4 py-2 rounded hover:bg-lifeTrack-light transition"
                >
                    + New Habit
                </button>
            </div>

            {habits.length === 0 ? (
                <p className="text-gray-600 italic">
                    No habits yet. Start building your routine!
                </p>
            ) : (
                <div className="space-y-3">
                    {habits.map((habit) => (
                        <div
                            key={habit.id}
                            className="bg-white p-4 border rounded shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {habit.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {habit.frequency} — streak:{" "}
                                        {habit.streak}
                                    </p>
                                    {habit.notes && (
                                        <p className="text-sm text-gray-600 mt-1 italic">
                                            {habit.notes}
                                        </p>
                                    )}
                                </div>
                                <span className="text-xs text-gray-400">
                                    Last done:{" "}
                                    {habit.lastCompleted
                                        ? new Date(
                                              habit.lastCompleted
                                          ).toLocaleDateString()
                                        : "Never"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="mt-8">
                    <h2 className="text-lg font-semibold mb-2">
                        Add New Habit
                    </h2>
                    {/* We'll build this next */}
                </div>
            )}
        </div>
    );
}
