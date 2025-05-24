import { useState } from "react";
import {
    RunEntry,
    getZone,
    getTotalMinutes,
    formatDuration,
    formatPaceDisplay,
} from "./Utils/RunUtils";
import { Trash2 } from "lucide-react";
import DeleteConfirmationModal from "@/Components/DeleteConfirmationModal";

export default function RunHistory({
    runs,
    onDelete,
}: {
    runs: RunEntry[];
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

    if (runs.length === 0) {
        return (
            <div className="mt-6 text-gray-500 text-sm italic">
                No runs logged yet.
            </div>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">📋 Run History</h2>
            <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Distance (mi)</th>
                        <th className="p-2 border">Time (min)</th>
                        <th className="p-2 border">Pace (/mi)</th>
                        <th className="p-2 border">HR Zone</th>
                        <th className="p-2 border">Notes</th>
                        <th className="p-2 border">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {runs.map((run) => {
                        const durationInMin = getTotalMinutes(run.duration);
                        const pace = formatPaceDisplay(
                            durationInMin,
                            parseFloat(run.distance)
                        );
                        const avgHr = parseFloat(run.avgHr);
                        const zone = getZone(avgHr);

                        return (
                            <tr key={run.id} className="border-t">
                                <td className="p-2 border">{run.date}</td>
                                <td className="p-2 border">
                                    {parseFloat(run.distance).toFixed(2)}
                                </td>
                                <td className="p-2 border">
                                    {formatDuration(run.duration)}
                                </td>
                                <td className="p-2 border">{pace}</td>
                                <td className="p-2 border">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${zone.color}`}
                                    >
                                        Z{zone.zone} - {zone.label}
                                    </span>
                                </td>
                                <td className="p-2 border text-gray-600 italic">
                                    {run.notes || "-"}
                                </td>
                                <td className="p-2 border text-center">
                                    <button
                                        onClick={() => {
                                            setDeleteID(run.id!);
                                            setShowDeleteModal(true);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                        title="Delete run"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setDeleteID(null);
                }}
                onConfirm={handleConfirmDelete}
                itemLabel="this run"
            />
        </div>
    );
}
