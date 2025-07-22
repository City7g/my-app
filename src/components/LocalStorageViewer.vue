<script setup lang="ts">
import { useExpensesStore } from '@/stores/expenses'

const expensesStore = useExpensesStore()
</script>

<template>
  <div class="storage-viewer">
    <div class="storage-header">
      <h2>Данные LocalStorage</h2>
    </div>

    <div v-if="expensesStore.items.length" class="storage-items">
      <div v-for="item in expensesStore.items" :key="item.id" class="storage-item">
        <div class="item-header">
          <div class="item-key">{{ item.type }}</div>
          <button @click="expensesStore.removeExpense(item.id)" class="remove-button">
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-storage">
      LocalStorage пуст
    </div>
  </div>
</template>

<style>
.storage-viewer {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.storage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.storage-header h2 {
  margin: 0;
  color: var(--text-color);
}

.clear-button {
  background: var(--decrease-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: var(--decrease-dark);
}

.storage-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.storage-item {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.item-key {
  font-weight: 600;
  color: var(--primary-color);
}

.remove-button {
  background: var(--decrease-color);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.remove-button:hover {
  background: var(--decrease-dark);
}

.item-value {
  background: #f5f7fa;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.4;
}

.empty-storage {
  text-align: center;
  color: #666;
  padding: 48px 0;
}
</style>
