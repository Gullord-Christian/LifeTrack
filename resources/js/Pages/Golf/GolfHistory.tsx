import { useState } from "react";
import { GolfEntry } from "./GolfUtils";
import { Trash2 } from "lucide-react";
import DeleteConfirmModal from "@/Components/DeleteConfirmationModal";

export default function GolfHistory({
    rounds,
    onDelete,
}: {
    rounds: GolfEntry[];
    onDelete: (id: number) => void;
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const handleConfirmDelete = () => {
        if (deleteID !== null) {
            onDelete(deleteID);
            setDeleteID(null);
        }
    };

    if (rounds.length === 0) {
        return (
            <p className="mt-6 text-gray-500 text-sm italic">
                No rounds logged yet.
            </p>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Golf Round History</h2>
            <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Course</th>
                        <th className="p-2 border">Par</th>
                        <th className="p-2 border">Score</th>
                        <th className="p-2 border">Over/Under</th>
                        <th className="p-2 border">GIR</th>
                        <th className="p-2 border">FIR</th>
                        <th className="p-2 border">Rating</th>
                        <th className="p-2 border">Slope</th>
                        <th className="p-2 border">Yardage</th>
                        <th className="p-2 border">Notes</th>
                        <th className="p-2 border">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {rounds.map((round) => (
                        <tr key={round.id} className="border-t">
                            <td className="p-2 border">{round.date}</td>
                            <td className="p-2 border">{round.course}</td>
                            <td className="p-2 border">{round.par}</td>
                            <td className="p-2 border">{round.score}</td>
                            <td className="p-2 border">
                                +{round.strokes_over_par}
                            </td>
                            <td className="p-2 border">
                                {round.greens_in_regulation || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.fairways_in_regulation || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.course_rating || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.course_slope || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.yardage || "-"}
                            </td>
                            <td className="p-2 border text-gray-600 italic">
                                {round.notes || "-"}
                            </td>
                            <td className="p-2 border text-center">
                                <button
                                    onClick={() => {
                                        setDeleteID(round.id!);
                                        setShowDeleteModal(true);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setDeleteID(null);
                }}
                onConfirm={handleConfirmDelete}
                itemLabel="this golf round"
            />
        </div>
    );
}
