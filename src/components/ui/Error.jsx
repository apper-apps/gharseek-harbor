import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry, className = '' }) => {
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
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertCircle" size={32} className="text-red-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              className="flex items-center gap-2 mx-auto"
            >
              <ApperIcon name="RefreshCw" size={18} />
              Try Again
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Error