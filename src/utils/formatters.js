import { getTranslation } from '@/services/translationService'

export const formatPrice = (price, currency = 'PKR', language = 'en') => {
  const locale = language === 'ur' ? 'ur-PK' : 'en-PK'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export const formatArea = (size, unit, language = 'en') => {
  switch(unit) {
    case 'marla':
      return `${size} ${getTranslation('property.marla', language)}`
    case 'kanal':
      return `${size} ${getTranslation('property.kanal', language)}`
    case 'sqft':
      return `${size} ${getTranslation('property.sqft', language)}`
    default:
      return `${size} ${unit}`
  }
}

export const formatDate = (dateString, language = 'en') => {
  const date = new Date(dateString)
  const locale = language === 'ur' ? 'ur-PK' : 'en-PK'
  return date.toLocaleDateString(locale, {
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

export const getPropertyTypeLabel = (type, language = 'en') => {
  return getTranslation(`property.${type}`, language) || capitalizeFirst(type)
}

export const getCityLabel = (city, language = 'en') => {
  return getTranslation(`cityNames.${city}`, language) || capitalizeFirst(city)
}