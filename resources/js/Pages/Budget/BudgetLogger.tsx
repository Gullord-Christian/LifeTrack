import { useState, useEffect } from "react";
import { BudgetEntry, BudgetCategory, IncomeSource, Debt } from "./BudgetUtils";
import api from "@/lib/api";
import Modal from "@/Components/Modal";

export default function BudgetLogger({
    onSave,
    onClose,
}: {
    onClose: () => void;
    onSave: (entry: BudgetEntry) => void;
}) {
    const [form, setForm] = useState<Partial<BudgetEntry>>({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: 0,
        isIncome: false,
        isRecurring: false,
        isPaid: true,
    });

    const [categories, setCategories] = useState<BudgetCategory[]>([]);
    const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get("/categories"),
            api.get("/income-sources"),
            api.get("/debts"),
        ]).then(([catRes, srcRes, debtRes]) => {
            setCategories(catRes.data);
            setIncomeSources(srcRes.data);
            setDebts(debtRes.data);
        });
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        let newValue: string | number | boolean = value;

        if (type === "checkbox") {
            newValue = (e.target as HTMLInputElement).checked;
        } else if (type === "number") {
            newValue = parseFloat(value);
        }

        setForm((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await api.post("/budget", form);
        onSave(res.data);
        setShowModal(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Description
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={form.description || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount || 0}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isIncome"
                            checked={form.isIncome || false}
                            onChange={handleChange}
                        />
                        Income
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isRecurring"
                            checked={form.isRecurring || false}
                            onChange={handleChange}
                        />
                        Recurring
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={form.categoryId || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Uncategorized</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Debt (optional)
                    </label>
                    <select
                        name="debtId"
                        value={form.debtId || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">None</option>
                        {debts.map((debt) => (
                            <option key={debt.id} value={debt.id}>
                                {debt.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Income Source (if income)
                    </label>
                    <select
                        name="incomeSourceId"
                        value={form.incomeSourceId || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="">None</option>
                        {incomeSources.map((src) => (
                            <option key={src.id} value={src.id}>
                                {src.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-lifeTrack-dark text-white px-4 py-2 rounded hover:bg-lifeTrack-light hover:text-lifeTrack-dark"
                    >
                        Save Entry
                    </button>
                </div>
            </form>
        </div>
    );
}
