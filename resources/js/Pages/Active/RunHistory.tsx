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
    const [year, setYear] = useState("");
    const [distanceFilter, setDistanceFilter] = useState("");
    const [minTime, setMinTime] = useState("");
    const [maxTime, setMaxTime] = useState("");
    const [hrZone, setHrZone] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const runsPerPage = 15;

    const distanceMap: Record<string, number> = {
        "1 Mile": 1.0,
        "2 Mile": 2.0,
        "5K": 3.1,
        "10K": 6.2,
    };

    const filteredRuns = runs.filter((run) => {
        const runYear = new Date(run.date).getFullYear().toString();
        const totalMin = getTotalMinutes(run.duration);
        const zone = getZone(run.avgHr);

        return (
            (year === "" || runYear === year) &&
            (distanceFilter === "" ||
                Math.abs(
                    parseFloat(run.distance) - distanceMap[distanceFilter]
                ) < 0.2) &&
            (minTime === "" || totalMin >= parseFloat(minTime)) &&
            (maxTime === "" || totalMin <= parseFloat(maxTime)) &&
            (hrZone === "" || `Z${zone.zone}` === hrZone)
        );
    });

    const totalPages = Math.ceil(filteredRuns.length / runsPerPage);
    const indexOfLast = currentPage * runsPerPage;
    const indexOfFirst = indexOfLast - runsPerPage;
    const currentRuns = filteredRuns.slice(indexOfFirst, indexOfLast);

    const handleConfirmDelete = () => {
        if (deleteID !== null) {
            onDelete(deleteID);
            setDeleteID(null);
        }
    };

    return (
        <div className="mt-6">
            <>
                <div className="mx-auto mb-4 max-w-lg bg-white border rounded-lg shadow p-6">
                    <h3 className="font-semibold text-base mb-4 text-center text-gray-800">
                        Heart Rate Zone Key
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-700">
                        <ul className="space-y-2">
                            <li>
                                <span className="inline-block w-10 text-center font-semibold text-blue-800 bg-blue-100 rounded px-2 py-1 mr-2">
                                    Z1
                                </span>
                                Low Intensity
                                <br />
                                <span className="text-xs text-gray-500">
                                    95–114 bpm (50–60%)
                                </span>
                            </li>
                            <li>
                                <span className="inline-block w-10 text-center font-semibold text-green-800 bg-green-100 rounded px-2 py-1 mr-2">
                                    Z2
                                </span>
                                Base Training
                                <br />
                                <span className="text-xs text-gray-500">
                                    114–133 bpm (60–70%)
                                </span>
                            </li>
                            <li>
                                <span className="inline-block w-10 text-center font-semibold text-yellow-800 bg-yellow-100 rounded px-2 py-1 mr-2">
                                    Z3
                                </span>
                                Aerobic
                                <br />
                                <span className="text-xs text-gray-500">
                                    133–152 bpm (70–80%)
                                </span>
                            </li>
                        </ul>

                        <ul className="space-y-2">
                            <li>
                                <span className="inline-block w-10 text-center font-semibold text-orange-800 bg-orange-200 rounded px-2 py-1 mr-2">
                                    Z4
                                </span>
                                Anaerobic
                                <br />
                                <span className="text-xs text-gray-500">
                                    152–171 bpm (80–90%)
                                </span>
                            </li>
                            <li>
                                <span className="inline-block w-10 text-center font-semibold text-white bg-red-500 rounded px-2 py-1 mr-2">
                                    Z5
                                </span>
                                Max Effort
                                <br />
                                <span className="text-xs text-gray-500">
                                    171–190 bpm (90–100%)
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Filter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {/* your filter inputs here... */}
                </div>
            </>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Years</option>
                    {[
                        ...new Set(
                            runs.map((r) => new Date(r.date).getFullYear())
                        ),
                    ].map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>

                <select
                    value={distanceFilter}
                    onChange={(e) => setDistanceFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Distances</option>
                    {Object.keys(distanceMap).map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>

                {/* <input
                    type="number"
                    placeholder="Min Time (min)"
                    value={minTime}
                    onChange={(e) => setMinTime(e.target.value)}
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    placeholder="Max Time (min)"
                    value={maxTime}
                    onChange={(e) => setMaxTime(e.target.value)}
                    className="border p-2 rounded"
                /> */}

                <select
                    value={hrZone}
                    onChange={(e) => setHrZone(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All HR Zones</option>
                    {["Z1", "Z2", "Z3", "Z4", "Z5"].map((z) => (
                        <option key={z} value={z}>
                            {z}
                        </option>
                    ))}
                </select>
            </div>

            {filteredRuns.length === 0 ? (
                <p className="text-gray-500 text-sm italic">
                    No matching runs found.
                </p>
            ) : (
                <>
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
                            {currentRuns.map((run) => {
                                const durationInMin = getTotalMinutes(
                                    run.duration
                                );
                                const pace = formatPaceDisplay(
                                    durationInMin,
                                    parseFloat(run.distance)
                                );
                                const zone = getZone(run.avgHr);

                                return (
                                    <tr key={run.id} className="border-t">
                                        <td className="p-2 border">
                                            {run.date}
                                        </td>
                                        <td className="p-2 border">
                                            {parseFloat(run.distance).toFixed(
                                                2
                                            )}
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

                    {/* Pagination */}
                    <div className="mt-4 flex justify-center gap-2">
                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

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
