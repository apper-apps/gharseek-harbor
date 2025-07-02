import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CityCard = ({ city, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`card p-6 text-center cursor-pointer ${className}`}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="MapPin" size={24} className="text-white" />
      </div>
      <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
        {city.name}
      </h3>
      <p className="text-gray-600 text-sm mb-2">
        {city.properties} Properties Available
      </p>
      <div className="text-primary-600 text-sm font-medium">
        Starting from {city.startingPrice}
      </div>
    </motion.div>
  )
}

export default CityCard