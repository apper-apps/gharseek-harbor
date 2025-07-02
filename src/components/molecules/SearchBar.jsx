import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'

const SearchBar = ({ onSearch, className = '' }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    city: '',
    area: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    furnished: ''
  })

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'plot', label: 'Plot' },
    { value: 'office', label: 'Office' }
  ]

  const cities = [
    { value: 'lahore', label: 'Lahore' },
    { value: 'karachi', label: 'Karachi' },
    { value: 'islamabad', label: 'Islamabad' },
    { value: 'multan', label: 'Multan' },
    { value: 'faisalabad', label: 'Faisalabad' },
    { value: 'rawalpindi', label: 'Rawalpindi' },
    { value: 'peshawar', label: 'Peshawar' },
    { value: 'quetta', label: 'Quetta' }
  ]

  const bedroomOptions = [
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ]

  const furnishedOptions = [
    { value: 'furnished', label: 'Furnished' },
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-Furnished' }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-feature p-6 border border-gray-100 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        <Select
          placeholder="Property Type"
          options={propertyTypes}
          value={filters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          className="col-span-1"
        />
        
        <Select
          placeholder="City"
          options={cities}
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          className="col-span-1"
        />
        
        <input
          type="text"
          placeholder="Area/Location"
          value={filters.area}
          onChange={(e) => handleFilterChange('area', e.target.value)}
          className="search-filter col-span-1"
        />
        
        <input
          type="number"
          placeholder="Min Price (PKR)"
          value={filters.priceMin}
          onChange={(e) => handleFilterChange('priceMin', e.target.value)}
          className="search-filter col-span-1"
        />
        
        <input
          type="number"
          placeholder="Max Price (PKR)"
          value={filters.priceMax}
          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
          className="search-filter col-span-1"
        />
        
        <Select
          placeholder="Bedrooms"
          options={bedroomOptions}
          value={filters.bedrooms}
          onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
          className="col-span-1"
        />
      </div>
      
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <Select
          placeholder="Furnished Status"
          options={furnishedOptions}
          value={filters.furnished}
          onChange={(e) => handleFilterChange('furnished', e.target.value)}
          className="w-full sm:w-auto"
        />
        
        <Button 
          onClick={handleSearch}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <ApperIcon name="Search" size={20} />
          Search Properties
        </Button>
      </div>
    </motion.div>
  )
}

export default SearchBar