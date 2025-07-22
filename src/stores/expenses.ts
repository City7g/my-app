import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Expense, CreateExpenseParams, ExpenseGroup } from '@/types/expense'
import * as expenseService from '@/services/localStorageService'

const generateId = () => Math.random().toString(36).substring(2)

export const useExpensesStore = defineStore('expenses', () => {
  const items = ref<Expense[]>([])

  const getExpenses = () => {
    items.value = expenseService.getExpenses()
  }

  getExpenses()

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

  const expensesByType = computed(() => {
    return items.value.reduce((grouped, item) => {
      if (!grouped[item.type]) {
        grouped[item.type] = []
      }
      grouped[item.type].push(item)
      return grouped
    }, {} as Record<string, Expense[]>)
  })

  const expenseGroups = computed<ExpenseGroup[]>(() => {
    return Object.entries(expensesByType.value).map(([type, expenses]) => ({
      type,
      expenses
    }))
  })

  return {
    items,
    createExpense,
    removeExpense,
    totalSpent,
    expensesByType,
    expenseGroups,
  }
})
