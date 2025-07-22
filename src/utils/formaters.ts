export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatPrice = (value: number): string => {
  return value.toLocaleString('uk-UA', {
    style: 'currency',
    currency: 'UAH'
  })
}
