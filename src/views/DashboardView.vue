<script setup lang="ts">
import { useExpensesStore } from '@/stores/expenses'
import { formatPrice } from '@/utils/formaters'
import type { Expense } from '@/types/expense'

const expensesStore = useExpensesStore()

const getGroupTotal = (expenses: Expense[]) => {
  return formatPrice(expenses.reduce((sum: number, expense: Expense) => sum + +expense.price, 0))
}
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Расходы - {{ formatPrice(expensesStore.totalSpent) }}</h1>
    </div>

    <div v-if="expensesStore.items.length" class="expense-groups">
      <div v-for="(expenses, type) in expensesStore.expensesByType" :key="type" class="expense-group"
        :class="type.toLowerCase()">
        <div class="group-header">
          <div class="group-title-wrapper">
            <div class="group-icon">
              <img :src="`/src/assets/icons/${type.toLowerCase()}.svg`" :alt="type" />
            </div>
            <h2 class="group-title">{{ type }}</h2>
          </div>
          <div class="group-total">
            {{ getGroupTotal(expenses) }}
          </div>
        </div>

        <div class="expenses-list">
          <ExpenseItem v-for="expense in expenses" :key="expense.id" :expense="expense" />
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
