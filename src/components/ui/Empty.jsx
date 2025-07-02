import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  message = 'No properties found', 
  description = 'Try adjusting your search criteria or browse all properties',
  action = null,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-h-[400px] flex items-center justify-center ${className}`}
    >
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="Search" size={36} className="text-primary-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
            {message}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          
          {action ? (
            action
          ) : (
            <Button
              variant="primary"
              className="flex items-center gap-2 mx-auto"
              onClick={() => window.location.href = '/properties'}
            >
              <ApperIcon name="Search" size={18} />
              Browse All Properties
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Empty