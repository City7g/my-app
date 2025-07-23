import type { Expense } from '@/types/expense'

const STORAGE_KEY = 'items'

export const getExpenses = (): Expense[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Ошибка при получении из localStorage:', error)
    return []
  }
}

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error)
  }
}
