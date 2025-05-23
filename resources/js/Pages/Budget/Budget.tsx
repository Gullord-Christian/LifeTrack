import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import Modal from "@/Components/Modal";

import { BudgetEntry } from "./BudgetUtils";
import BudgetLogger from "./BudgetLogger";
import BudgetPieChart from "./BudgetPieChart";
// import BudgetHistory from "./BudgetHistory";
import api from "@/lib/api";

export default function Budget() {
    const [entries, setEntries] = useState<BudgetEntry[]>([]);
    const [showModal, setShowModal] = useState(false);

    const addEntry = (entry: BudgetEntry) => {
        api.post("/budget", entry).then((res) => {
            setEntries((prev) => [res.data, ...prev]);
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this entry?")) return;
        await api.delete(`/budget/${id}`);
        setEntries((prev) => prev.filter((e) => e.id !== id));
    };

    useEffect(() => {
        api.get("/budget").then((res) => {
            setEntries(res.data);
        });
    }, []);

    const incomeTotal = entries
        .filter((e) => e.type === "income")
        .reduce((sum, e) => sum + parseFloat(e.amount), 0);

    const expenseTotal = entries
        .filter((e) => e.type === "expense")
        .reduce((sum, e) => sum + parseFloat(e.amount), 0);

    const balance = incomeTotal - expenseTotal;

    return (
        <AuthenticatedLayout>
            <Head title="Budget Tracker" />
            <div className="p-6 max-w-5xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Budget Tracker</h1>
                        <p className="text-sm text-gray-600">
                            Track income, expenses, and your net balance.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Entry
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">Income</h3>
                        <p className="text-xl font-semibold text-green-600">
                            ${incomeTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">Expenses</h3>
                        <p className="text-xl font-semibold text-red-500">
                            ${expenseTotal.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">Net Balance</h3>
                        <p className="text-xl font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}">
                            ${balance.toFixed(2)}
                        </p>
                    </div>
                </div>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    maxWidth="2xl"
                >
                    <BudgetLogger
                        onClose={() => setShowModal(false)}
                        onSave={addEntry}
                    />
                </Modal>
                <BudgetPieChart entries={entries} />

                {/* <BudgetHistory entries={entries} onDelete={handleDelete} /> */}
            </div>
        </AuthenticatedLayout>
    );
}
