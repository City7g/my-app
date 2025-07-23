<script setup lang="ts">
import { formatPrice } from '@/utils/formaters'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const price = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hundreds = computed({
  get: () => Math.floor(price.value / 100) * 100,
  set: (value) => {
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      price.value = numValue + ones.value
    }
  }
})

const ones = computed({
  get: () => price.value % 100,
  set: (value) => {
    const numValue = Number(value)
    if (!isNaN(numValue)) {
      price.value = hundreds.value + numValue
    }
  }
})

const getGradientStyle = (value: number, max: number) => ({
  background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${(value * 100) / max}%, #E8EDF2 ${(value * 100) / max}%, #E8EDF2 100%)`
})

const adjustPrice = (amount: number) => {
  const newPrice = price.value + amount
  if (newPrice < 0) price.value = 0
  else if (newPrice > 999) price.value = 999
  else price.value = newPrice
}
</script>

<template>
  <div class="price-range-wrapper">
    <div class="price-range">
      <h1>Добавление</h1>
      <div class="price-display">
        {{ formatPrice(price) }}
      </div>
      <label class="range-container">
        <span class="range-label">Сотни</span>
        <input type="range" :min="0" :max="900" :step="100" v-model="hundreds" class="range-input"
          :style="getGradientStyle(hundreds, 900)" />
      </label>
      <label class="range-container">
        <span class="range-label">Единицы</span>
        <input type="range" :min="0" :max="99" :step="1" v-model="ones" class="range-input"
          :style="getGradientStyle(ones, 99)" />
      </label>
      <div class="quick-adjust">
        <button v-for="value in [-10, -5, 5, 10]" :key="value" @click="adjustPrice(value)" class="adjust-button" :class="{
          'decrease': value < 0,
          'increase': value > 0
        }">
          {{ value > 0 ? '+' + value : value }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #4CAF50;
  --primary-dark: #388E3C;
  --decrease-color: #FF5252;
  --decrease-dark: #D32F2F;
  --card-bg: #FFFFFF;
  --text-color: #2C3E50;
}

.price-range {
  width: 90%;
}

.price-range-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-message {
  background: var(--primary-color);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.success-message.show {
  opacity: 1;
  transform: translateY(0);
}

h1 {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px;
  text-align: center;
}

.price-display {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 12px;
}

.range-container {
  padding: 0 12px;
  margin-bottom: 12px;
}

.range-label {
  display: block;
  color: var(--text-color);
  font-size: 14px;
  margin-bottom: 8px;
}

.range-input {
  width: 100%;
  height: 6px;
  border-radius: 6px;
  outline: none;
  -webkit-appearance: none;
  background: #E8EDF2;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background-color: var(--primary-color);
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
}

.range-input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.range-input::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background-color: var(--primary-color);
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
}

.range-input::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.quick-adjust {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 4px;
  margin-top: 24px;
}

.adjust-button {
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--primary-color);
}

.adjust-button.decrease {
  background: var(--decrease-color);
}

.adjust-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.adjust-button:active {
  transform: translateY(0);
}

.adjust-button.decrease:hover {
  background: var(--decrease-dark);
}

.adjust-button.increase:hover {
  background: var(--primary-dark);
}
</style>
