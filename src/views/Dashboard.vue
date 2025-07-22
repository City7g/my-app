<script setup lang="ts">
import { useExpensesStore } from '@/stores/expenses'
import { computed } from 'vue'
import type { Expense } from '@/types/expense'
import { formatDate, formatPrice } from '@/utils/formaters'

const expensesStore = useExpensesStore()

interface ExpenseGroup {
  type: string
  expenses: Expense[]
}

const expenseGroups = computed<ExpenseGroup[]>(() => {
  const groupedExpenses = expensesStore.expensesByType
  return Object.entries(groupedExpenses).map(([type, expenses]) => ({
    type,
    expenses
  }))
})
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Расходы - {{ formatPrice(expensesStore.totalSpent) }}</h1>
    </div>

    <div v-if="expensesStore.items.length" class="expense-groups">
      <div v-for="group in expenseGroups" :key="group.type" class="expense-group" :class="group.type.toLowerCase()">
        <div class="group-header">
          <div class="group-title-wrapper">
            <div class="group-icon">
              <img :src="`/src/assets/icons/${group.type.toLowerCase()}.svg`" :alt="group.type" />
            </div>
            <h2 class="group-title">{{ group.type }}</h2>
          </div>
          <div class="group-total">
            {{formatPrice(group.expenses.reduce((sum: number, expense) => sum + +expense.price, 0))}}
          </div>
        </div>

        <div class="expenses-list">
          <div v-for="expense in group.expenses" :key="expense.id" class="expense-item">
            <div class="expense-info">
              <div class="expense-amount">{{ formatPrice(expense.price) }}</div>
              <div class="expense-date">{{ formatDate(expense.createdAt) }}</div>
              <div v-if="expense.description" class="expense-description">
                {{ expense.description }}
              </div>
            </div>
            <button @click="expensesStore.removeExpense(expense.id)" class="delete-button">
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-expenses">
      Пока нет расходов
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding: 24px;
  border-radius: 16px;
}

h1 {
  font-size: 20px;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
}

.total-expenses {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  padding: 12px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.5px;
}

.expense-groups {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.expense-group {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-top: 4px solid;
  transition: all 0.3s ease;
}

.expense-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.expense-group.food {
  border-color: #40c057;
}

.expense-group.transport {
  border-color: #339af0;
}

.expense-group.entertainment {
  border-color: #f06595;
}

.expense-group.shopping {
  border-color: #fab005;
}

.expense-group.travel {
  border-color: #7950f2;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e9ecef;
}

.group-title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.group-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group-icon img {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.group-title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  text-transform: capitalize;
}

.group-total {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  letter-spacing: 0.5px;
}

.expenses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.expense-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.expense-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.expense-amount {
  font-weight: 600;
  color: #2c3e50;
  font-size: 18px;
  letter-spacing: 0.5px;
}

.expense-date {
  color: #868e96;
  font-size: 15px;
}

.expense-description {
  color: #868e96;
  font-size: 14px;
}

.delete-button {
  background: transparent;
  border: none;
  color: #ff6b6b;
  cursor: pointer;
  font-size: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.delete-button:hover {
  opacity: 1;
  background: rgba(255, 107, 107, 0.1);
}

.no-expenses {
  text-align: center;
  padding: 48px;
  color: #868e96;
  font-size: 18px;
  background: white;
  border-radius: 16px;
  margin-top: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
