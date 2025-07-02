import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  children, 
  variant = 'default', 
  icon = null,
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    verified: 'bg-green-100 text-green-800 border border-green-200',
    featured: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white'
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {icon && <ApperIcon name={icon} size={12} className="mr-1" />}
      {children}
    </span>
  )
}

export default Badge