import { useEffect, useState } from "react";
import { BudgetEntry, BudgetCategory, Debt, IncomeSource } from "./BudgetUtils";
import api from "@/lib/api";
import { formatCurrency } from "./BudgetUtils";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PlusCircle } from "lucide-react";
import Modal from "@/Components/Modal";
import BudgetLogger from "./BudgetLogger";

export default function BudgetDashboard() {
    const [entries, setEntries] = useState<BudgetEntry[]>([]);
    const [categories, setCategories] = useState<BudgetCategory[]>([]);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLogger, setShowLogger] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get("/budget"),
            api.get("/categories"),
            api.get("/debts"),
            api.get("/income-sources"),
        ])
            .then(([entriesRes, categoriesRes, debtsRes, sourcesRes]) => {
                setEntries(entriesRes.data);
                setCategories(categoriesRes.data);
                setDebts(debtsRes.data);
                setIncomeSources(sourcesRes.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const totalIncome = entries
        .filter((e) => e.isIncome)
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const totalExpenses = entries
        .filter((e) => !e.isIncome)
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const netBalance = totalIncome - totalExpenses;

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <AuthenticatedLayout>
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">
                            Finance Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Visualize and manage your budget with income,
                            expenses, and debt tracking.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowLogger(true)}
                        className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Add Entry
                    </button>

                    <Modal
                        show={showLogger}
                        onClose={() => setShowLogger(false)}
                        maxWidth="2xl"
                    >
                        <BudgetLogger
                            onClose={() => setShowLogger(false)}
                            onSave={(entry) => {
                                setEntries((prev) => [entry, ...prev]);
                            }}
                        />
                    </Modal>
                </div>
                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">Total Income</h3>
                        <p className="text-xl font-semibold text-green-600">
                            {formatCurrency(totalIncome)}
                        </p>
                    </div>
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">
                            Total Expenses
                        </h3>
                        <p className="text-xl font-semibold text-red-500">
                            {formatCurrency(totalExpenses)}
                        </p>
                    </div>
                    <div className="bg-white shadow p-4 rounded border">
                        <h3 className="text-sm text-gray-500">Net Balance</h3>
                        <p
                            className={`text-xl font-semibold ${
                                netBalance >= 0
                                    ? "text-green-600"
                                    : "text-red-500"
                            }`}
                        >
                            {formatCurrency(netBalance)}
                        </p>
                    </div>
                </div>

                {/* Recent Entries */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Recent Entries
                    </h2>
                    <ul className="divide-y border rounded bg-white">
                        {entries.slice(0, 5).map((entry) => (
                            <li key={entry.id} className="p-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-medium">
                                            {entry.description ||
                                                "(No description)"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {entry.date} —{" "}
                                            {entry.category?.name ||
                                                "Uncategorized"}
                                        </p>
                                        {entry.debt && (
                                            <p className="text-xs text-gray-400">
                                                Applied to: {entry.debt.name}{" "}
                                                (Remaining:{" "}
                                                {formatCurrency(
                                                    entry.debt.remainingAmount
                                                )}
                                                )
                                            </p>
                                        )}
                                        {entry.incomeSource && (
                                            <p className="text-xs text-gray-400">
                                                Source:{" "}
                                                {entry.incomeSource.name}
                                            </p>
                                        )}
                                    </div>
                                    <p
                                        className={`font-semibold ${
                                            entry.isIncome
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {formatCurrency(Number(entry.amount))}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
