import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Expense } from "@/types/expense";

const generateId = () => Math.random().toString(36).substring(2);

export const useExpensesStore = defineStore("expenses", () => {
  const items = ref<Expense[]>([]);

  function initializeFromLocalStorage() {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      items.value = JSON.parse(storedItems);
    }
  }

  initializeFromLocalStorage();

  function createExpense(type: string, price: number, description: string): Expense {
    const newItem: Expense = {
      id: generateId(),
      type,
      price,
      description,
      createdAt: new Date().toISOString(),
    };

    addExpense(newItem);
    return newItem;
  }

  function addExpense(expense: Expense) {
    items.value.push(expense);
    saveToLocalStorage();
  }

  function removeExpense(id: string) {
    items.value = items.value.filter((item) => item.id !== id);
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items.value));
  }

  const totalSpent = computed(() => {
    return items.value.reduce((total, item) => total + +item.price, 0);
  });

  const expensesByType = computed(() => {
    return items.value.reduce((grouped, item) => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
      return grouped;
    }, {} as Record<string, Expense[]>);
  });

  function getExpensesByDateRange(startDate: Date, endDate: Date) {
    return computed(() => {
      return items.value.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
    });
  }

  return {
    items,
    initializeFromLocalStorage,
    createExpense,
    addExpense,
    removeExpense,
    totalSpent,
    expensesByType,
    getExpensesByDateRange,
  };
});
