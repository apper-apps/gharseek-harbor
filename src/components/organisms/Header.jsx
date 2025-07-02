import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import LanguageSwitcher from '@/components/molecules/LanguageSwitcher'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'Browse Properties', href: '/properties', icon: 'Search' },
    { name: 'Add Listing', href: '/add-listing', icon: 'Plus' },
    { name: 'Blog', href: '/blog', icon: 'BookOpen' },
    { name: 'Contact', href: '/contact', icon: 'MessageSquare' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-gray-900">GharSeek</span>
              <span className="text-xs text-gray-500 -mt-1">Find Your Perfect Rental</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-50 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher className="hidden sm:block" />
            <Link to="/agent-login">
              <Button variant="primary" size="sm" className="hidden sm:flex items-center space-x-2">
                <ApperIcon name="User" size={16} />
                <span>Agent Login</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name={isMenuOpen ? 'X' : 'Menu'} size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <LanguageSwitcher />
                <Link to="/agent-login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="flex items-center space-x-2">
                    <ApperIcon name="User" size={16} />
                    <span>Agent Login</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header