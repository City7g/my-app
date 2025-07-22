<script setup lang="ts">
import type { Expense } from '@/types/expense'
import { formatDate, formatPrice } from '@/utils/formaters'
import { useExpensesStore } from '@/stores/expenses'

defineProps<{
  expense: Expense
}>()

const expensesStore = useExpensesStore()
</script>

<template>
  <div class="expense-item">
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
</template>

<style scoped>
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
</style>
