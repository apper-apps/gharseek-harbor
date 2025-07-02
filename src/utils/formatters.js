export const formatPrice = (price, currency = 'PKR') => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const formatArea = (size, unit) => {
  switch(unit) {
    case 'marla':
      return `${size} Marla`
    case 'kanal':
      return `${size} Kanal`
    case 'sqft':
      return `${size} Sq Ft`
    default:
      return `${size} ${unit}`
  }
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatPhoneNumber = (phone) => {
  // Remove any existing formatting
  const cleaned = phone.replace(/\D/g, '')
  
  // Format Pakistani phone numbers
  if (cleaned.startsWith('92')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
  } else if (cleaned.startsWith('03')) {
    return `+92 ${cleaned.slice(1, 4)} ${cleaned.slice(4)}`
  }
  
  return phone
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const getPropertyTypeLabel = (type) => {
  const labels = {
    house: 'House',
    flat: 'Flat',
    apartment: 'Apartment',
    plot: 'Plot',
    office: 'Office'
  }
  return labels[type] || capitalizeFirst(type)
}

export const getCityLabel = (city) => {
  const labels = {
    lahore: 'Lahore',
    karachi: 'Karachi',
    islamabad: 'Islamabad',
    multan: 'Multan',
    faisalabad: 'Faisalabad',
    rawalpindi: 'Rawalpindi',
    peshawar: 'Peshawar',
    quetta: 'Quetta'
  }
  return labels[city] || capitalizeFirst(city)
}