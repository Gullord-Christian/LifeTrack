export interface BudgetEntry {
    id?: number;
    date: string;
    description?: string;
    amount: number;
    isRecurring: boolean;
    isIncome: boolean;
    paidOn?: string | null;
    isPaid: boolean;

    categoryId?: number | null;
    category?: BudgetCategory | null;

    debtId?: number | null;
    debt?: Debt | null;

    incomeSourceId?: number | null;
    incomeSource?: IncomeSource | null;
}

export interface BudgetCategory {
    id: number;
    name: string;
    icon?: string;
    color?: string;
}

export interface Debt {
    id: number;
    name: string;
    originalAmount: number;
    remainingAmount: number;
    monthlyDue?: number;
    dueDate?: string;
    type: "car" | "student" | "credit_card" | "other";
}

export interface IncomeSource {
    id: number;
    name: string;
    expectedAmount?: number;
    notes?: string;
}

export function getEntryType(entry: BudgetEntry): "Income" | "Expense" {
    return entry.isIncome ? "Income" : "Expense";
}

export function formatCurrency(amount: number, currency = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

export function getCategoryColor(category?: BudgetCategory): string {
    return category?.color ?? "#9ca3af"; // default: gray-400
}
