import { useState, useEffect } from 'react'

export const useLanguage = () => {
  const [language, setLanguage] = useState('en')
  const [direction, setDirection] = useState('ltr')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
    setDirection(savedLanguage === 'ur' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('dir', savedLanguage === 'ur' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', savedLanguage)
  }, [])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    setDirection(newLanguage === 'ur' ? 'rtl' : 'ltr')
    localStorage.setItem('language', newLanguage)
    document.documentElement.setAttribute('dir', newLanguage === 'ur' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', newLanguage)
  }

  const isUrdu = language === 'ur'
  const isRTL = direction === 'rtl'

  return {
    language,
    direction,
    isUrdu,
    isRTL,
    changeLanguage
  }
}