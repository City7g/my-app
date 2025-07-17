<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PriceRange from '@/components/PriceRange.vue'

const route = useRoute()
const router = useRouter()
const type = route.params.type
const price = ref(500)
const description = ref('')
const showSuccess = ref(false)

interface Item {
  id: string
  type: string
  price: number
  description: string
  createdAt: string
}

const handleSubmit = () => {
  // Создаем новую запись
  const newItem: Item = {
    id: crypto.randomUUID(),
    type: type as string,
    price: price.value,
    description: description.value,
    createdAt: new Date().toISOString()
  }

  // Получаем существующие записи или создаем новый массив
  const existingItems = JSON.parse(localStorage.getItem('items') || '[]')
  
  // Добавляем новую запись
  existingItems.push(newItem)
  
  // Сохраняем обратно в localStorage
  localStorage.setItem('items', JSON.stringify(existingItems))

  // Показываем сообщение об успехе
  showSuccess.value = true

  // Скрываем сообщение через 2 секунды и редиректим
  setTimeout(() => {
    showSuccess.value = false
    router.push('/add')
  }, 2000)
}
</script>

<template>
  <div class="add-type">
    <h1>Добавление {{ type }}</h1>
    <div class="add-type-form">
      <div class="form-section">
        <h2>Стоимость</h2>
        <PriceRange
          v-model="price"
          :min="0"
          :max="1000"
          :step="10"
        />
      </div>
      <div class="form-section">
        <h2>Описание</h2>
        <textarea
          v-model="description"
          class="description-input"
          placeholder="Введите описание..."
          rows="4"
        ></textarea>
      </div>
      <div class="form-section form-actions">
        <div class="action-container">
          <div v-if="showSuccess" class="success-message">
            ✓ Успешно сохранено
          </div>
          <button @click="handleSubmit" class="submit-button">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.add-type {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
}


h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
}

h2 {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
}

.add-type-form {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-section {
  padding: 24px;
  border-bottom: 1px solid #eee;
}

.form-section:last-child {
  border-bottom: none;
}

.description-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.description-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.description-input::placeholder {
  color: #999;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.action-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.success-message {
  color: #4CAF50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover {
  background-color: #43A047;
  transform: translateY(-1px);
}

.submit-button:active {
  transform: translateY(0);
}
</style> 