import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' }
  ]

  const popularCities = [
    { name: 'Lahore Properties', href: '/properties?city=lahore' },
    { name: 'Karachi Properties', href: '/properties?city=karachi' },
    { name: 'Islamabad Properties', href: '/properties?city=islamabad' },
    { name: 'Multan Properties', href: '/properties?city=multan' },
    { name: 'Faisalabad Properties', href: '/properties?city=faisalabad' }
  ]

  const propertyTypes = [
    { name: 'Houses for Rent', href: '/properties?type=house' },
    { name: 'Flats for Rent', href: '/properties?type=flat' },
    { name: 'Apartments for Rent', href: '/properties?type=apartment' },
    { name: 'Offices for Rent', href: '/properties?type=office' },
    { name: 'Plots for Sale', href: '/properties?type=plot' }
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
                <span className="text-xs text-gray-400">Find Your Perfect Rental</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Pakistan's most trusted property rental platform. Find your perfect home or list your property with verified agents across major cities.
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
            <h3 className="font-display font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Popular Cities</h3>
            <ul className="space-y-3">
              {popularCities.map((city) => (
                <li key={city.name}>
                  <Link 
                    to={city.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Property Types</h3>
            <ul className="space-y-3">
              {propertyTypes.map((type) => (
                <li key={type.name}>
                  <Link 
                    to={type.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-2xl mb-4">Stay Updated with GharSeek</h3>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              Get the latest property listings, rental tips, and market insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="accent" className="whitespace-nowrap">
                Subscribe
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
              © 2024 GharSeek. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for Pakistan</span>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} className="text-green-500" />
                <span className="text-green-500 text-sm font-medium">Secure & Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer