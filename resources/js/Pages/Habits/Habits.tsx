import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PageProps } from "@/types/gen";
import { Habit, getDaysSince } from "./HabitUtils";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";
import WeeklyHabitGrid from "./WeeklyHabitGrid";
import axios from "axios";

export default function Habits() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get("/api/habits").then((res) => {
            setHabits(res.data); // ✅ make sure the API returns an array!
        });
    }, []);

    const fetchHabits = async () => {
        const res = await axios.get("/api/habits");
        setHabits(res.data);
    };

    const sobrietyDates: Record<string, string> = {
        alcohol: "2025-05-13",
        adderall: "2025-05-11",
        weed: "2025-06-04",
        caffeine: "2025-06-04",
    };

    return (
        <AuthenticatedLayout>
            <Head title="Habits Tracker" />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Habits Tracker</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-primary transition"
                    >
                        New Habit
                    </button>
                </div>

                {/* Sobriety Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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

                {/* Weekly Grid */}
                <WeeklyHabitGrid habits={habits} onRefresh={fetchHabits} />

                {/* Habit Cards */}
                {Array.isArray(habits) && habits.length === 0 ? (
                    <div className="mt-10 text-center text-gray-600 italic">
                        No habits yet. Start building your routine!
                    </div>
                ) : Array.isArray(habits) ? (
                    <div className="space-y-3 mt-6">
                        {habits.map((habit) => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onDelete={fetchHabits}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mt-10 text-center text-red-500 text-sm">
                        Unable to load habits.
                    </div>
                )}

                {/* Habit Form */}
                {showForm && (
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-2">
                            Add New Habit
                        </h2>
                        <HabitForm
                            onClose={() => {
                                setShowForm(false);
                                fetchHabits();
                            }}
                        />
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
