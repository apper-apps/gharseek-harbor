import { motion } from 'framer-motion'

const Loading = ({ className = '' }) => {
  return (
    <div className={`min-h-[400px] flex items-center justify-center ${className}`}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
            Loading Properties
          </h3>
          <p className="text-gray-600">Please wait while we fetch the latest listings...</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Loading