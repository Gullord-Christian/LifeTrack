import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import RunLogger from "./RunLogger";
import { useState, useEffect } from "react";
import { PlusCircle, Upload } from "lucide-react";
import Modal from "@/Components/Modal";
import RunningPR from "./RunningPR";
import RunHistory from "./RunHistory";
import { RunEntry } from "./Utils/RunUtils";
import { getMileageSummary } from "./Utils/RunUtils";
import api from "@/lib/api";
import axios from "axios";

function FileUploadModal({
    show,
    onClose,
    onUpload,
}: {
    show: boolean;
    onClose: () => void;
    onUpload: (file: File) => void;
}) {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            setError("Please upload a valid .csv file.");
            return;
        }

        setError(null);
        onUpload(file);
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-bold mb-4">
                    📤 Import Runs from CSV
                </h2>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleChange}
                    className="block w-full border rounded p-2"
                />
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-500 text-sm hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default function Running() {
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [runs, setRuns] = useState<RunEntry[]>([]);

    const mileage = getMileageSummary(runs);

    const addRun = (run: RunEntry) => {
        api.post("/runs", run).then((res) => {
            setRuns((prev) => [res.data, ...prev]);
        });
    };

    const refreshRuns = () => {
        api.get("/runs").then((res) => {
            setRuns(res.data);
        });
    };

    useEffect(() => {
        refreshRuns();
    }, []);

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("/runs/import", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });

            alert("File uploaded!");
            // optionally refresh your run list
        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        }
    };
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
                        <div>
                            <h1 className="text-2xl font-bold">
                                Running Tracker
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Track your runs, pace, and heart rate here.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark transition"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Add Run
                            </button>
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                <Upload className="w-5 h-5" />
                                Import CSV
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

                {/* Run Logger Modal */}
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

                {/* File Upload Modal */}
                <FileUploadModal
                    show={showUploadModal}
                    onClose={() => setShowUploadModal(false)}
                    onUpload={handleUpload}
                />

                {/* History */}
                <RunHistory runs={runs} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
}
