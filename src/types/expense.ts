export interface Expense {
  id: string
  type: string
  price: number
  description: string
  createdAt: string
}

export type CreateExpenseParams = Omit<Expense, 'id' | 'createdAt'>
