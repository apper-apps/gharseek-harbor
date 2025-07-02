import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const LanguageSwitcher = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage)

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
    setIsOpen(false)
    // Here you would implement actual language switching logic
    document.documentElement.setAttribute('dir', langCode === 'ur' ? 'rtl' : 'ltr')
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium">{currentLang.name}</span>
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleLanguageChange(language.code)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
                {currentLanguage === language.code && (
                  <ApperIcon name="Check" size={14} className="text-primary-500 ml-auto" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher