import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { formatArea, formatPrice } from "@/utils/formatters";
import ApperIcon from "@/components/ApperIcon";
import PropertyGallery from "@/components/organisms/PropertyGallery";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import { propertyService } from "@/services/api/propertyService";

const PropertyDetailPage = () => {
  const { t, language } = useLanguage()
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProperty = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await propertyService.getById(parseInt(id))
      setProperty(data)
} catch (err) {
      setError(t('errors.failedToLoadProperty'))
      console.error('Error loading property:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProperty()
  }, [id])

if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadProperty} />
  if (!property) return <Error message={t('errors.propertyNotFound')} />



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">{t('nav.home')}</Link>
          <ApperIcon name="ChevronRight" size={16} />
<Link to="/properties" className="hover:text-primary-600">{t('nav.browseProperties')}</Link>
          <ApperIcon name="ChevronRight" size={16} />
          <span className="text-gray-900">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
<div className="flex items-center gap-2 mb-2">
                    {property.featured && (
                      <Badge variant="featured" icon="Star">{t('common.featured')}</Badge>
                    )}
{property.verified && (
                      <Badge variant="verified" icon="CheckCircle">{t('common.verified')}</Badge>
                    )}
                  </div>
                  <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <ApperIcon name="MapPin" size={18} className="mr-2 text-primary-500" />
                    <span>{property.area}, {property.city}</span>
                  </div>
                </div>
<div className="text-right ml-6">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {formatPrice(property.price, 'PKR', language)}
                  </div>
                  <div className="text-gray-500">{t('property.perMonth')}</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
{property.bedrooms && (
                  <div className="text-center">
                    <ApperIcon name="Bed" size={24} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">{t('property.bedrooms')}</div>
                  </div>
                )}
{property.bathrooms && (
                  <div className="text-center">
                    <ApperIcon name="Bath" size={24} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">{t('property.bathrooms')}</div>
                  </div>
                )}
{property.areaSize && (
                  <div className="text-center">
                    <ApperIcon name="Square" size={24} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-semibold">{formatArea(property.areaSize, property.areaUnit, language)}</div>
                    <div className="text-sm text-gray-600">{t('property.area')}</div>
                  </div>
                )}
<div className="text-center">
                  <ApperIcon name="Home" size={24} className="text-primary-500 mx-auto mb-1" />
                  <div className="font-semibold capitalize">{t(`property.${property.type}`)}</div>
                  <div className="text-sm text-gray-600">{t('property.propertyType')}</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
<h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                {t('propertyDetail.description')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
{property.description || t('propertyDetail.noDescriptionAvailable')}
              </p>
            </motion.div>

            {/* Facilities */}
            {property.facilities && property.facilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
<h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                  {t('propertyDetail.facilitiesFeatures')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6"
            >
<h2 className="font-display font-semibold text-xl text-gray-900 mb-4">
                {t('property.location')}
              </h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
<p className="text-gray-500">{t('propertyDetail.interactiveMapIntegration')}</p>
                  <p className="text-sm text-gray-400 mt-1">{property.area}, {property.city}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Agent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 sticky top-8"
            >
<h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                {t('propertyDetail.contactAgent')}
              </h3>
              
              {property.agent && (
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <ApperIcon name="User" size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{property.agent.name}</div>
                    {property.agent.verified && (
<div className="flex items-center text-sm text-green-600">
                        <ApperIcon name="CheckCircle" size={14} className="mr-1" />
                        {t('propertyDetail.verifiedAgent')}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  variant="whatsapp"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.open(`https://wa.me/${property.agent?.whatsapp}`, '_blank')}
                >
<ApperIcon name="MessageCircle" size={18} />
                  {t('common.whatsapp')}
                </Button>
                
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.location.href = `tel:${property.agent?.phone}`}
                >
<ApperIcon name="Phone" size={18} />
                  {t('common.callNow')}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
<ApperIcon name="Mail" size={18} />
                  {t('propertyDetail.sendEmail')}
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50"
                >
<ApperIcon name="Flag" size={18} />
                  {t('propertyDetail.reportProperty')}
                </Button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
<h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                {t('propertyDetail.quickActions')}
              </h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
<ApperIcon name="Heart" size={18} className="mr-2" />
                  {t('propertyDetail.saveToFavorites')}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
<ApperIcon name="Share" size={18} className="mr-2" />
                  {t('propertyDetail.shareProperty')}
                </Button>
                <Button variant="ghost" className="w-full justify-start">
<ApperIcon name="Calculator" size={18} className="mr-2" />
                  {t('propertyDetail.mortgageCalculator')}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailPage