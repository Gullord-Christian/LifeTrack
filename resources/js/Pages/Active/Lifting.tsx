import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Workout } from "./Utils/WorkoutUtils";
import NewWorkoutModal from "./Utils/NewWorkoutModal";

export default function Lifting() {
    const [showWorkoutModal, setShowWorkoutModal] = useState(false);
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    return (
        <AuthenticatedLayout>
            <Head title="Lifting Tracker" />
            <h1 className="text-2xl font-bold">Lifting Tracker</h1>
            <p className="text-gray-600 mt-2">
                This is the lifting tracker page.
            </p>

            <button
                className="mt-6 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-primary transition"
                onClick={() => setShowWorkoutModal(true)}
            >
                + New Workout
            </button>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Recent Workouts</h2>
                {workouts.length === 0 ? (
                    <div className="bg-white rounded shadow p-4 text-gray-600 italic">
                        No workouts logged yet.
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {workouts.map((workout) => (
                            <li
                                key={workout.id}
                                className="bg-white border rounded shadow p-4"
                            >
                                <h3 className="font-semibold text-lg">
                                    {workout.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(
                                        workout.date
                                    ).toLocaleDateString()}
                                </p>
                                <p className="mt-1 text-gray-700">
                                    {workout.notes}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showWorkoutModal && (
                <NewWorkoutModal
                    onClose={() => setShowWorkoutModal(false)}
                    onSaved={(newWorkout: Workout) =>
                        setWorkouts((prev) => [newWorkout, ...prev])
                    }
                />
            )}
        </AuthenticatedLayout>
    );
}
