interface Account {
    accountNumber: string;
    balance: number;
    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): number;
}

class DebitAccount implements Account {
    accountNumber: string;
    balance: number;

    constructor(accountNumber: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Пополнение успешно: ${amount}. Новый баланс: ${this.balance}`);
        } else {
            console.log("Сумма пополнения должна быть положительной.");
        }
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма снятия должна быть положительной.");
            return;
        }

        if (amount > this.balance) {
            console.log("Недостаточно средств.");
        } else {
            this.balance -= amount;
            console.log(`Снятие успешно: ${amount}. Новый баланс: ${this.balance}`);
        }
    }

    checkBalance(): number {
        console.log(`Проверка баланса. Текущий баланс: ${this.balance}`);
        return this.balance;
    }
}

class CreditAccount implements Account {
    accountNumber: string;
    balance: number;
    creditLimit: number;
    debt: number;

    constructor(accountNumber: string, creditLimit: number) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.creditLimit = creditLimit;
        this.debt = 0;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            if (this.debt > 0) {
                const debtPayment = Math.min(this.debt, amount);
                this.debt -= debtPayment;
                amount -= debtPayment;
                console.log(`Оплачено ${debtPayment} долга. Остаток долга: ${this.debt}`);
            }
            this.balance += amount;
            console.log(`Пополнение успешно: ${amount}. Новый баланс: ${this.balance}`);
        } else {
            console.log("Сумма пополнения должна быть положительной.");
        }
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Сумма снятия должна быть положительной.");
            return;
        }

        const availableFunds = this.balance + (this.creditLimit - this.debt);
        if (amount > availableFunds) {
            console.log("Недостаточно средств с учетом кредитного лимита.");
        } else {
            if (amount <= this.balance) {
                this.balance -= amount;
            } else {
                const creditAmount = amount - this.balance;
                this.debt += creditAmount;
                this.balance = 0;
            }
            console.log(`Снятие успешно: ${amount}. Новый баланс: ${this.balance}, Текущий долг: ${this.debt}`);
        }
    }

    checkBalance(): number {
        console.log(`Проверка баланса. Текущий баланс: ${this.balance}, Текущий долг: ${this.debt}`);
        return this.balance;
    }
}


const debitAccount = new DebitAccount("DEBIT-123", 1000);
console.log("=== Операции с дебетовым счетом ===");
debitAccount.deposit(500);
debitAccount.withdraw(300);
debitAccount.checkBalance();

const creditAccount = new CreditAccount("CREDIT-456", 2000);
console.log("\n=== Операции с кредитным счетом ===");
creditAccount.deposit(1000);
creditAccount.withdraw(1500);
creditAccount.withdraw(2000);
creditAccount.checkBalance();
