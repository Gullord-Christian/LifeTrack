import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import RunLogger from "./RunLogger";
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Modal from "@/Components/Modal";
import RunningPR from "./RunningPR";
import RunHistory from "./RunHistory";
import { RunEntry } from "./Utils/RunUtils";
import { getMileageSummary } from "./Utils/RunUtils";

import api from "@/lib/api";

export default function Running() {
    const [showModal, setShowModal] = useState(false);
    const [runs, setRuns] = useState<RunEntry[]>([]);

    const mileage = getMileageSummary(runs);

    const addRun = (run: RunEntry) => {
        api.post("/runs", run).then((res) => {
            setRuns((prev) => [res.data, ...prev]);
        });
    };

    useEffect(() => {
        api.get("/runs").then((res) => {
            setRuns(res.data);
        });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/runs/${id}`);
            setRuns((prev) => prev.filter((run) => run.id !== id));
        } catch (err) {
            alert("Failed to delete run.");
            console.error(err);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Running Tracker" />
            <div className="p-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        {/* Left: Title + Subtext */}
                        <div>
                            <h1 className="text-2xl font-bold">
                                Running Tracker
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Track your runs, pace, and heart rate here.
                            </p>
                        </div>

                        {/* Right: Add Button */}
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark transition"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Add Run
                            </button>
                        </div>
                    </div>

                    {/* Mileage Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white shadow p-4 rounded border">
                            <h3 className="text-sm text-gray-500">
                                Weekly Miles
                            </h3>
                            <p className="text-xl font-semibold">
                                {mileage.week} mi
                            </p>
                        </div>
                        <div className="bg-white shadow p-4 rounded border">
                            <h3 className="text-sm text-gray-500">
                                Monthly Miles
                            </h3>
                            <p className="text-xl font-semibold">
                                {mileage.month} mi
                            </p>
                        </div>
                        <div className="bg-white shadow p-4 rounded border">
                            <h3 className="text-sm text-gray-500">
                                Yearly Miles
                            </h3>
                            <p className="text-xl font-semibold">
                                {mileage.year} mi
                            </p>
                        </div>
                    </div>
                </div>

                {/* PR boxes */}
                <RunningPR runs={runs} />

                {/* Modal */}
                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="2xl"
                >
                    <RunLogger
                        onClose={() => setShowModal(false)}
                        onSave={addRun}
                    />
                </Modal>

                {/* History */}
                <RunHistory runs={runs} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
}
