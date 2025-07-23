<script setup lang="ts">
import { useExpensesStore } from '@/stores/expenses'

const route = useRoute()
const router = useRouter()
const expensesStore = useExpensesStore()

const type = route.params.type
const price = ref(route.fullPath === '/add/transport' ? 14 : 500)
const description = ref('')

const handleSubmit = () => {
  expensesStore.createExpense({
    type: type as string,
    price: price.value,
    description: description.value
  })

  router.replace({ name: 'home' })
}
</script>

<template>
  <div class="add-type">
    <div class="add-type-form">
      <div class="form-section">
        <PriceRange v-model="price" :min="0" :max="1000" :step="1" />
      </div>
      <div class="form-section">
        <h2>Описание</h2>
        <textarea v-model="description" class="description-input" placeholder="Введите описание..." rows="3" />
      </div>
      <div class="form-section form-actions">
        <div class="action-container">
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
  margin-bottom: 8px;
}

h2 {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
}

.add-type-form {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-section {
  padding: 24px 12px 12px;
}

.form-section+.form-section+.form-section {
  padding-top: 0;
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
