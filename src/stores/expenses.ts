import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Expense, CreateExpenseParams } from '@/types/expense'
import * as expenseService from '@/services/localStorageService'

const generateId = () => Math.random().toString(36).substring(2)

export const useExpensesStore = defineStore('expenses', () => {
  const items = ref<Expense[]>([])

  const getExpenses = () => {
    items.value = expenseService.getExpenses()
  }

  const createExpense = ({ type, price, description }: CreateExpenseParams): void => {
    const newItem: Expense = {
      id: generateId(),
      type,
      price,
      description,
      createdAt: new Date().toISOString(),
    }

    items.value.push(newItem)
    expenseService.saveExpenses(items.value)
  }

  const removeExpense = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id)
    expenseService.saveExpenses(items.value)
  }

  const totalSpent = computed(() => {
    return items.value.reduce((total, item) => total + +item.price, 0)
  })

  const expensesByType = computed(() =>
    Object.groupBy(items.value, (expense: Expense) => expense.type) as Record<Expense['type'], Expense[]>
  )

  getExpenses()

  return {
    items,
    createExpense,
    removeExpense,
    totalSpent,
    expensesByType,
  }
})
