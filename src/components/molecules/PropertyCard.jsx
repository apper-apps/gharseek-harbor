import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import React from "react";
import { formatArea, formatPrice } from "@/utils/formatters";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
const PropertyCard = ({ property, className = '' }) => {
  const { t, language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`property-card ${className}`}
    >
      <div className="relative">
        <img
          src={property.images?.[0] || '/api/placeholder/400/250'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
<div className="absolute top-3 left-3 flex gap-2">
          {property.featured && (
            <Badge variant="featured" icon="Star">
              {t('common.featured')}
            </Badge>
          )}
          {property.verified && (
            <Badge variant="verified" icon="CheckCircle">
              {t('common.verified')}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg"
          >
            <ApperIcon name="Heart" size={18} className="text-gray-600 hover:text-red-500" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2">
            {property.title}
          </h3>
<div className="text-right ml-3 flex-shrink-0">
            <div className="text-xl font-bold text-primary-600">
              {formatPrice(property.price, 'PKR', language)}
            </div>
            <div className="text-sm text-gray-500">{t('property.perMonth')}</div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <ApperIcon name="MapPin" size={16} className="mr-2 text-primary-500" />
          <span className="text-sm">{property.area}, {property.city}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
{property.bedrooms && (
            <div className="flex items-center">
              <ApperIcon name="Bed" size={16} className="mr-1 text-primary-500" />
              {property.bedrooms} {property.bedrooms === 1 ? t('property.bedroom') : t('property.bedrooms')}
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <ApperIcon name="Bath" size={16} className="mr-1 text-primary-500" />
              {property.bathrooms} {property.bathrooms === 1 ? t('property.bathroom') : t('property.bathrooms')}
            </div>
          )}
          {property.areaSize && (
            <div className="flex items-center">
              <ApperIcon name="Square" size={16} className="mr-1 text-primary-500" />
              {formatArea(property.areaSize, property.areaUnit, language)}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mb-4">
<Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => window.location.href = `tel:${property.agent?.phone}`}
          >
            <ApperIcon name="Phone" size={16} className="mr-2" />
            {t('common.callNow')}
          </Button>
          <Button
            variant="whatsapp"
            size="sm"
            className="flex-1"
            onClick={() => window.open(`https://wa.me/${property.agent?.whatsapp}`, '_blank')}
          >
            <ApperIcon name="MessageCircle" size={16} className="mr-2" />
            {t('common.whatsapp')}
          </Button>
        </div>
        
<Link to={`/property/${property.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            {t('common.viewDetails')}
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default PropertyCard