import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useLanguage } from '@/hooks/useLanguage'
const Footer = () => {
  const { t } = useLanguage()

  const quickLinks = [
    { nameKey: 'footer.aboutUs', href: '/about' },
    { nameKey: 'footer.howItWorks', href: '/how-it-works' },
    { nameKey: 'footer.privacyPolicy', href: '/privacy' },
    { nameKey: 'footer.termsOfService', href: '/terms' },
    { nameKey: 'footer.helpCenter', href: '/help' }
  ]

  const popularCities = [
    { nameKey: 'footer.lahoreProperties', href: '/properties?city=lahore' },
    { nameKey: 'footer.karachiProperties', href: '/properties?city=karachi' },
    { nameKey: 'footer.islamabadProperties', href: '/properties?city=islamabad' },
    { nameKey: 'footer.multanProperties', href: '/properties?city=multan' },
    { nameKey: 'footer.faisalabadProperties', href: '/properties?city=faisalabad' }
  ]

  const propertyTypes = [
    { nameKey: 'footer.housesForRent', href: '/properties?type=house' },
    { nameKey: 'footer.flatsForRent', href: '/properties?type=flat' },
    { nameKey: 'footer.apartmentsForRent', href: '/properties?type=apartment' },
    { nameKey: 'footer.officesForRent', href: '/properties?type=office' },
    { nameKey: 'footer.plotsForSale', href: '/properties?type=plot' }
  ]
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Home" size={24} className="text-white" />
              </div>
<div className="flex flex-col">
                <span className="font-display font-bold text-xl">GharSeek</span>
                <span className="text-xs text-gray-400">{t('footer.tagline')}</span>
              </div>
            </div>
<p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Linkedin" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
<div>
            <h3 className="font-display font-semibold text-lg mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
{quickLinks.map((link) => (
                <li key={link.nameKey}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
<div>
            <h3 className="font-display font-semibold text-lg mb-6">{t('footer.popularCities')}</h3>
            <ul className="space-y-3">
{popularCities.map((city) => (
                <li key={city.nameKey}>
                  <Link 
                    to={city.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {t(city.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
<div>
            <h3 className="font-display font-semibold text-lg mb-6">{t('footer.propertyTypes')}</h3>
            <ul className="space-y-3">
{propertyTypes.map((type) => (
                <li key={type.nameKey}>
                  <Link 
                    to={type.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {t(type.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mt-12">
<div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-2xl mb-4">{t('footer.newsletterTitle')}</h3>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              {t('footer.newsletterDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
<input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="accent" className="whitespace-nowrap">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
<p className="text-gray-400 text-sm">
              {t('footer.allRightsReserved')}
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">{t('footer.madeWithLove')}</span>
              <div className="flex items-center space-x-2">
<ApperIcon name="Shield" size={16} className="text-green-500" />
                <span className="text-green-500 text-sm font-medium">{t('footer.secureAndTrusted')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer