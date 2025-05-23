import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Modal from "@/Components/Modal";

import api from "@/lib/api";
import GolfLogger from "./GolfLog";
import GolfHistory from "./GolfHistory";
import { GolfEntry } from "./GolfUtils";
import LastGolfRoundWidget from "./LastGolfRoundWidget";
import GolfPBCard from "./GolfPBCard";

export default function GolfPage() {
    const [showModal, setShowModal] = useState(false);
    const [rounds, setRounds] = useState<GolfEntry[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const addRound = (round: GolfEntry) => {
        api.post("/golf", round).then((res) => {
            setRounds((prev) => [res.data, ...prev]);
        });
    };

    const handleDelete = async (id: number) => {
        await api.delete(`/golf/${id}`);
        setRounds((prev) => prev.filter((r) => r.id !== id));
    };

    useEffect(() => {
        api.get("/golf").then((res) => {
            setRounds(res.data);
        });
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Golf Tracker" />
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Golf Tracker</h1>
                        <p className="text-sm text-gray-600">
                            Track your rounds, stats, and performance over time.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Round
                    </button>
                </div>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="2xl"
                >
                    <GolfLogger
                        onClose={() => setShowModal(false)}
                        onSave={addRound}
                    />
                </Modal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <LastGolfRoundWidget />
                    <GolfPBCard round={null} />
                </div>

                <GolfHistory rounds={rounds} onDelete={handleDelete} />
            </div>
        </AuthenticatedLayout>
    );
}
