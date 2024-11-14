import { ExpenseManager } from "./ExpenseManager.js";
import { Expense, ExpenseCategory } from "./types.js";

const expenseManager = new ExpenseManager();

const expenseForm = document.getElementById("expenseForm") as HTMLFormElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const categorySelect = document.getElementById("category") as HTMLSelectElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const expenseList = document.getElementById("expenseList") as HTMLDivElement;
const filterForm = document.getElementById("filterForm") as HTMLFormElement;
const startDateInput = document.getElementById("startDate") as HTMLInputElement;
const endDateInput = document.getElementById("endDate") as HTMLInputElement;
const totalExpensesOutput = document.getElementById("totalExpenses") as HTMLSpanElement;
const averageExpensesOutput = document.getElementById("averageExpenses") as HTMLSpanElement;
const categoryTotalsOutput = document.getElementById("categoryTotals") as HTMLDivElement;

// Функция для отображения списка расходов
function renderExpenses(expenses: Expense[] = expenseManager.getExpenses()) {
    console.log('expenseManager.getExpenses()', expenseManager.getExpenses());
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const expenseElement = document.createElement("div");
        expenseElement.className = "expense";
        expenseElement.innerHTML = `
            <p>Amount: ${expense.amount}</p>
            <p>Category: ${expense.category}</p>
            <p>Date: ${expense.date.toLocaleDateString()}</p>
            <button class="delete-expense" data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(expenseElement);
    });

    document.querySelectorAll(".delete-expense").forEach(button => {
        button.addEventListener("click", () => {
            const expenseId = (button as HTMLButtonElement).dataset.id!;
            deleteExpense(expenseId);
        });
    });
}

// Добавление нового расхода
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newExpense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(amountInput.value),
        category: categorySelect.value as ExpenseCategory,
        date: new Date(dateInput.value)
    };

    expenseManager.addExpense(newExpense);
    renderExpenses();
    updateSummary();
    expenseForm.reset();
});

// Удаление расхода
function deleteExpense(expenseId: string) {
    expenseManager.deleteExpense(expenseId);
    renderExpenses();
    updateSummary();
}

// Фильтрация расходов по дате
filterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const startDate = startDateInput.value ? new Date(startDateInput.value) : null;
    const endDate = endDateInput.value ? new Date(endDateInput.value) : null;

    const filteredExpenses = expenseManager.filterExpenses(startDate, endDate);
    renderExpenses(filteredExpenses);
    updateSummary(filteredExpenses);
});

// Обновление итогов
function updateSummary(expenses: Expense[] = expenseManager.getExpenses()) {
    const total = expenseManager.calculateTotal(expenses);
    const average = expenseManager.calculateAverage(expenses);
    const categoryTotals = expenseManager.calculateCategoryTotals(expenses);

    totalExpensesOutput.textContent = total.toFixed(2);
    averageExpensesOutput.textContent = average.toFixed(2);
    categoryTotalsOutput.innerHTML = "";

    // Отображение итогов по категориям
    (Object.keys(categoryTotals) as ExpenseCategory[]).forEach(category => {
        const categoryElement = document.createElement("p");
        categoryElement.textContent = `${category}: ${categoryTotals[category].toFixed(2)}`;
        categoryTotalsOutput.appendChild(categoryElement);
    });
}

renderExpenses();
updateSummary();
