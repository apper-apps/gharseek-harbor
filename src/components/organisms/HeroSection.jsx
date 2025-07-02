import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const HeroSection = ({ onSearch }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-6xl text-gray-900 mb-6">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Rental Space
              </span>
              <br />
              in Pakistan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover thousands of verified rental properties across Pakistan's major cities. 
              From cozy apartments to spacious houses, find your ideal home with trusted agents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <ApperIcon name="Shield" size={20} className="text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Verified Properties</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <ApperIcon name="Users" size={20} className="text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted Agents</span>
            </div>
            <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <ApperIcon name="MessageCircle" size={20} className="text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">WhatsApp Support</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SearchBar onSearch={onSearch} className="max-w-6xl mx-auto" />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button variant="ghost" className="flex items-center gap-2">
            <ApperIcon name="Home" size={16} />
            Houses for Rent
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <ApperIcon name="Building" size={16} />
            Apartments for Rent
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <ApperIcon name="Briefcase" size={16} />
            Office Spaces
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <ApperIcon name="Square" size={16} />
            Plots for Sale
          </Button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
    </section>
  )
}

export default HeroSection