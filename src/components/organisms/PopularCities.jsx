import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CityCard from '@/components/molecules/CityCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { cityService } from '@/services/api/cityService'
import { useLanguage } from '@/hooks/useLanguage'
const PopularCities = () => {
  const { t } = useLanguage()
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCities = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await cityService.getPopular()
      setCities(data)
    } catch (err) {
      setError(t('errors.failedToLoadCities'))
      console.error('Error loading cities:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCities()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCities} />
  if (cities.length === 0) return <Empty message={t('errors.noCitiesAvailable')} />
if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCities} />
  if (cities.length === 0) return <Empty message="No cities available" />

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Explore Properties by City
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find rental properties in Pakistan's most sought-after locations
          </p>
        </motion.div>
<h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t('cities.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('cities.description')}
          </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.Id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularCities