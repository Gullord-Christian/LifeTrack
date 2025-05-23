import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BudgetEntry } from "./BudgetUtils";

const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00c49f",
    "#a4de6c",
    "#d0ed57",
    "#ffbb28",
];

export default function BudgetPieChart({
    entries,
}: {
    entries: BudgetEntry[];
}) {
    const expenses = entries.filter((e) => e.type === "expense");

    const categorySums: Record<string, number> = {};
    expenses.forEach((e) => {
        categorySums[e.category] =
            (categorySums[e.category] || 0) + parseFloat(e.amount);
    });

    const data = Object.entries(categorySums).map(([category, total]) => ({
        name: category,
        value: total,
    }));

    if (data.length === 0) {
        return (
            <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
                <h3 className="text-sm text-gray-500 mb-1">
                    Expenses by Category
                </h3>
                <p className="text-gray-400 italic text-sm">
                    No expense data yet
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded p-4 mb-6 border-l-4 border-lifeTrack-primary">
            <h3 className="text-sm text-gray-500 mb-2">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
