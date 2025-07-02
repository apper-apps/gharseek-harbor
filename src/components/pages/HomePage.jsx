import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import FeaturedProperties from '@/components/organisms/FeaturedProperties'
import PopularCities from '@/components/organisms/PopularCities'

const HomePage = () => {
  const navigate = useNavigate()

  const handleSearch = (filters) => {
    // Convert filters to URL parameters
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })
    
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      <FeaturedProperties />
      <PopularCities />
    </div>
  )
}

export default HomePage