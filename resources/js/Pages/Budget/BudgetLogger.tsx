import { useState } from "react";
import { BudgetEntry } from "./BudgetUtils";

export default function BudgetLogger({
    onClose,
    onSave,
}: {
    onClose: () => void;
    onSave: (entry: BudgetEntry) => void;
}) {
    const [form, setForm] = useState<BudgetEntry>({
        date: "",
        description: "",
        category: "",
        amount: "",
        type: "expense",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-2">Add Budget Entry</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                />
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded"
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
            </div>

            <textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                className="w-full border px-3 py-2 rounded"
            />

            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="text-sm bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
