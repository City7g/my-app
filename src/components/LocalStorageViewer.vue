<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface StorageData {
  key: string
  value: string
  parsedValue?: unknown
}

const storageData = ref<StorageData[]>([])

const loadStorageData = () => {
  const data: StorageData[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key) {
      const value = localStorage.getItem(key) || ''
      let parsedValue
      try {
        parsedValue = JSON.parse(value)
      } catch {
        parsedValue = value
      }
      data.push({ key, value, parsedValue })
    }
  }
  storageData.value = data
}

const clearStorage = () => {
  if (confirm('Вы уверены, что хотите очистить все данные?')) {
    localStorage.clear()
    loadStorageData()
  }
}

const removeItem = (key: string) => {
  if (confirm(`Удалить "${key}"?`)) {
    localStorage.removeItem(key)
    loadStorageData()
  }
}

onMounted(() => {
  loadStorageData()
})
</script>

<template>
  <div class="storage-viewer">
    <div class="storage-header">
      <h2>Данные LocalStorage</h2>
      <button @click="clearStorage" class="clear-button">
        Очистить всё
      </button>
    </div>

    <div v-if="storageData.length" class="storage-items">
      <div v-for="item in storageData" :key="item.key" class="storage-item">
        <div class="item-header">
          <div class="item-key">{{ item.key }}</div>
          <button @click="removeItem(item.key)" class="remove-button">
            Удалить
          </button>
        </div>
        <pre class="item-value">{{ 
          item.parsedValue ? 
            JSON.stringify(item.parsedValue, null, 2) : 
            item.value 
        }}</pre>
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