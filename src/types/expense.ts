export interface Expense {
  id: string
  type: string
  price: number
  description: string
  createdAt: string
}

export interface ExpenseGroup {
  type: string
  expenses: Expense[]
}

export type CreateExpenseParams = Omit<Expense, 'id' | 'createdAt'>
