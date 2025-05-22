import { GolfEntry } from "./GolfUtils";
import { Trash2 } from "lucide-react";

export default function GolfHistory({
    rounds,
    onDelete,
}: {
    rounds: GolfEntry[];
    onDelete: (id: number) => void;
}) {
    if (rounds.length === 0) {
        return (
            <p className="mt-6 text-gray-500 text-sm italic">
                No rounds logged yet.
            </p>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
                ⛳ Golf Round History
            </h2>
            <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Score</th>
                        <th className="p-2 border">Course</th>
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
                            <td className="p-2 border">{round.score}</td>
                            <td className="p-2 border">{round.course}</td>
                            <td className="p-2 border">
                                {round.greensInReg || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.fairwaysInReg || "-"}
                            </td>
                            <td className="p-2 border">
                                {round.rating || "-"}
                            </td>
                            <td className="p-2 border">{round.slope || "-"}</td>
                            <td className="p-2 border">
                                {round.yardage || "-"}
                            </td>
                            <td className="p-2 border text-gray-600 italic">
                                {round.notes || "-"}
                            </td>
                            <td className="p-2 border text-center">
                                {round.id && (
                                    <button
                                        onClick={() => onDelete(round.id!)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
