import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PropertyCard from '@/components/molecules/PropertyCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { propertyService } from '@/services/api/propertyService'

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadFeaturedProperties = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await propertyService.getFeatured()
      setProperties(data)
    } catch (err) {
      setError('Failed to load featured properties. Please try again.')
      console.error('Error loading featured properties:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedProperties()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadFeaturedProperties} />
  if (properties.length === 0) return <Empty message="No featured properties available" />

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked premium properties from verified agents across Pakistan's major cities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property, index) => (
            <motion.div
              key={property.Id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/properties">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <ApperIcon name="Search" size={20} />
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProperties