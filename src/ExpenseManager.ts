import { Expense, ExpenseCategory } from './types.js';

export class ExpenseManager {
    private expenses: Expense[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addExpense(expense: Expense): void {
        this.expenses.push(expense);
        this.saveToLocalStorage();
    }

    deleteExpense(expenseId: string): void {
        this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
        this.saveToLocalStorage();
    }

    filterExpenses(startDate?: Date | null, endDate?: Date | null): Expense[] {
        return this.expenses.filter(expense => 
            (!startDate || expense.date >= startDate) &&
            (!endDate || expense.date <= endDate)
        );
    }

    calculateTotal(expenses: Expense[] = this.expenses): number {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    calculateAverage(expenses: Expense[] = this.expenses): number {
        return expenses.length ? this.calculateTotal(expenses) / expenses.length : 0;
    }

    calculateCategoryTotals(expenses: Expense[] = this.expenses): Record<ExpenseCategory, number> {
        const categoryTotals: Record<ExpenseCategory, number> = {
            [ExpenseCategory.Food]: 0,
            [ExpenseCategory.Transport]: 0,
            [ExpenseCategory.Entertainment]: 0,
            [ExpenseCategory.Others]: 0,
        };
        expenses.forEach(expense => {
            categoryTotals[expense.category] += expense.amount;
        });
        return categoryTotals;
    }

    saveToLocalStorage(): void {
        localStorage.setItem("expenses", JSON.stringify(this.expenses));
    }

    loadFromLocalStorage(): void {
        const data = localStorage.getItem("expenses");
        if (data) {
            try {
                this.expenses = JSON.parse(data).map((expense: any) => ({
                    ...expense,
                    date: new Date(expense.date)
                })) as Expense[];
            } catch {
                console.error("Failed to load expenses from localStorage");
                this.expenses = [];
            }
        }
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }
}
