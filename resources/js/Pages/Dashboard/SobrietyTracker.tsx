import { useState } from "react";
import { getDaysSince } from "@/Pages/Habits/HabitUtils";
import Modal from "@/Components/Modal";
import toast from "react-hot-toast";
import { TimerReset } from "lucide-react";

export default function SobrietyTracker() {
    const [sobrietyDates, setSobrietyDates] = useState<Record<string, string>>({
        alcohol: "2025-05-13",
        adderall: "2025-05-11",
        weed: "2025-05-22",
        caffeine: "2025-05-23",
    });
    const [habitToReset, setHabitToReset] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const confirmReset = (habit: string) => {
        setHabitToReset(habit);
        setShowModal(true);
    };

    const handleConfirmReset = () => {
        if (!habitToReset) return;
        const today = new Date().toISOString().split("T")[0];

        setSobrietyDates((prev) => ({
            ...prev,
            [habitToReset]: today,
        }));

        toast.success(`${habitToReset} reset to today`);
        setHabitToReset(null);
        setShowModal(false);
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(sobrietyDates).map(([label, date]) => (
                    <div
                        key={label}
                        className="relative bg-white border rounded shadow p-4 text-center group"
                    >
                        <button
                            onClick={() => confirmReset(label)}
                            className="absolute top-2 right-2 text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Reset to today"
                        >
                            <TimerReset size={"16px"} />
                        </button>

                        <h3 className="text-sm font-semibold capitalize text-gray-600">
                            {label}
                        </h3>
                        <p className="text-xl font-bold text-lifeTrack-primary">
                            {getDaysSince(date)} days
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {new Date(date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                maxWidth="sm"
            >
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Reset Habit</h2>
                    <p className="text-sm text-gray-700">
                        Are you sure you want to reset{" "}
                        <strong>{habitToReset}</strong> to today?
                    </p>
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmReset}
                            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
