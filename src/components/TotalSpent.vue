<script setup lang="ts">
import { ref, onMounted } from 'vue'

const totalAmount = ref(0)

const formatPrice = (value: number): string => {
  const formattedNumber = new Intl.NumberFormat('uk-UA', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value)
  
  return `${formattedNumber} ₴`
}

const calculateTotal = () => {
  const items = JSON.parse(localStorage.getItem('items') || '[]')
  totalAmount.value = items.reduce((sum: number, item: { price: number }) => {
    const itemPrice = Math.round(Number(item.price))
    return sum + itemPrice
  }, 0)
}

onMounted(() => {
  calculateTotal()
  window.addEventListener('storage', calculateTotal)
})
</script>

<template>
  <div class="total-spent">
    <div class="total-spent-card">
      <div class="total-spent-title">
        Всего потрачено:
      </div>
      <div class="total-spent-amount">
        {{ formatPrice(totalAmount) }}
      </div>
    </div>
  </div>
</template>

<style>
.total-spent {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 90%;
  max-width: 400px;
  pointer-events: none;
}

.total-spent-card {
  background: linear-gradient(135deg, #4CAF50 0%, #43A047 100%);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: auto;
  width: 100%;
}

.total-spent-title {
  font-size: 14px;
  opacity: 0.9;
}

.total-spent-amount {
  font-size: 18px;
  font-weight: 600;
}
</style> 