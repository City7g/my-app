<script setup lang="ts">
import { ref } from 'vue'
import PriceRange from '@/components/PriceRange.vue'

const price = ref(50000)
</script>

<template>
  <div class="add-price">
    <h1>Добавление прайса</h1>
    <div class="add-price-form">
      <PriceRange v-model="price" :min="1000" :max="200000" :step="1000" />
      <div class="selected-price">
        Выбранная цена: <strong>{{ price }}</strong>
      </div>
    </div>
  </div>
</template>

<style>
.add-price {
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.add-price-form {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.selected-price {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  color: #666;
}

.selected-price strong {
  color: #2979FF;
}
</style>
