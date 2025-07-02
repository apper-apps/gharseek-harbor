import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropertyCard from '@/components/molecules/PropertyCard'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { propertyService } from '@/services/api/propertyService'

const BrowsePropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewType, setViewType] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  const loadProperties = async (filters = {}) => {
    try {
      setError('')
      setLoading(true)
      const data = await propertyService.search(filters)
      setProperties(data)
    } catch (err) {
      setError('Failed to load properties. Please try again.')
      console.error('Error loading properties:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load properties based on URL params
    const filters = Object.fromEntries(searchParams.entries())
    loadProperties(filters)
  }, [searchParams])

  const handleSearch = (filters) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })
    setSearchParams(params)
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'area-large', label: 'Largest Area' },
    { value: 'featured', label: 'Featured First' }
  ]

  const handleSort = (sortValue) => {
    setSortBy(sortValue)
    // Implement sorting logic here
    const sorted = [...properties].sort((a, b) => {
      switch (sortValue) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'area-large':
          return b.areaSize - a.areaSize
        case 'featured':
          return b.featured - a.featured
        default:
          return b.Id - a.Id
      }
    })
    setProperties(sorted)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900">
              Browse Properties
            </h1>
            <p className="text-gray-600 mt-1">
              {loading ? 'Loading...' : `${properties.length} properties found`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="w-48"
            />

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewType === 'grid' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ApperIcon name="Grid3X3" size={20} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewType === 'list' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ApperIcon name="List" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading && <Loading />}
        {error && <Error message={error} onRetry={() => loadProperties()} />}
        {!loading && !error && properties.length === 0 && (
          <Empty 
            message="No properties found matching your criteria"
            action={
              <Button onClick={() => handleSearch({})}>
                Clear Filters
              </Button>
            }
          />
        )}

        {!loading && !error && properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-6 ${
              viewType === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PropertyCard 
                  property={property} 
                  className={viewType === 'list' ? 'flex flex-row' : ''}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More */}
        {!loading && properties.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowsePropertiesPage