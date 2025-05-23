export interface BudgetEntry {
    id?: number;
    date: string;
    description: string;
    category: string;
    amount: string;
    type: "income" | "expense";
    notes: string;
}
