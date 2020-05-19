import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (result: Balance, currentValue) => {
        const newIncome =
          currentValue.type === 'income'
            ? result.income + currentValue.value
            : result.income;
        const newOutcome =
          currentValue.type === 'outcome'
            ? result.outcome + currentValue.value
            : result.outcome;

        return {
          income: newIncome,
          outcome: newOutcome,
          total: newIncome - newOutcome,
        } as Balance;
      },
      { income: 0, outcome: 0, total: 0 } as Balance,
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
