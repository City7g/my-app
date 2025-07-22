import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TotalSpent from '../TotalSpent.vue'
import { useExpensesStore } from '@/stores/expenses'
import { formatPrice } from '@/utils/formaters'
import * as localStorageService from '@/services/localStorageService'

vi.mock('@/utils/formaters', () => ({
  formatPrice: vi.fn((price) => price)
}))

vi.mock('@/services/localStorageService', () => ({
  getExpenses: vi.fn(() => []),
  saveExpenses: vi.fn()
}))

describe('TotalSpent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(formatPrice).mockClear()
    vi.mocked(localStorageService.getExpenses).mockClear()
    vi.mocked(localStorageService.saveExpenses).mockClear()
  })

  it('renders properly', () => {
    const wrapper = mount(TotalSpent)
    expect(wrapper.find('.total-spent').exists()).toBe(true)
    expect(wrapper.find('.total-spent-title').text()).toBe('Всего потрачено:')
  })

  it('Check empty total price', () => {
    const wrapper = mount(TotalSpent)
    expect(wrapper.find('.total-spent-amount').text()).toBe('0')
  })

  it('Check total price', () => {
    const store = useExpensesStore()
    store.items = [
      { id: '1', type: 'food', price: 100, description: 'Обед', createdAt: new Date().toISOString() },
      { id: '2', type: 'transport', price: 200, description: 'Такси', createdAt: new Date().toISOString() }
    ]
    const wrapper = mount(TotalSpent)
    expect(wrapper.find('.total-spent-amount').text()).toBe('300')
  })

  it('Check string value in store', () => {
    const store = useExpensesStore()
    store.items = [
      { id: '1', type: 'food', price: '100' as unknown as number, description: 'Обед', createdAt: new Date().toISOString() },
      { id: '2', type: 'transport', price: 200, description: 'Такси', createdAt: new Date().toISOString() }
    ]
    const wrapper = mount(TotalSpent)
    expect(wrapper.find('.total-spent-amount').text()).toBe('300')
  })
})
