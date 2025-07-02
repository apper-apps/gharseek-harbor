import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'property', label: 'Property Listing' },
    { value: 'agent', label: 'Agent Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'suggestion', label: 'Suggestion' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: ['123 Business Center', 'Gulberg III, Lahore', 'Punjab, Pakistan']
    },
    {
      icon: 'Phone',
      title: 'Phone Numbers',
      details: ['+92 42 1234 5678', '+92 300 1234567', 'Mon-Sat: 9AM-7PM']
    },
    {
      icon: 'Mail',
      title: 'Email Addresses',
      details: ['info@gharseek.com', 'support@gharseek.com', 'agent@gharseek.com']
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp Support',
      details: ['+92 300 1234567', 'Available 24/7', 'Quick responses']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you find your perfect property or answer any questions
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <h2 className="font-display font-semibold text-2xl text-gray-900 mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                
                <Select
                  label="Subject"
                  options={subjectOptions}
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display font-semibold text-2xl text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Reach out to us through any of the following channels. We're committed to 
                providing excellent customer service and support.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <ApperIcon name={info.icon} size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="card p-6"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <ApperIcon name="FileText" size={18} className="mr-2" />
                  Download Agent Guide
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ApperIcon name="HelpCircle" size={18} className="mr-2" />
                  FAQ & Help Center
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ApperIcon name="Shield" size={18} className="mr-2" />
                  Report an Issue
                </Button>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                >
                  <ApperIcon name="Facebook" size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                >
                  <ApperIcon name="Twitter" size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-200"
                >
                  <ApperIcon name="Instagram" size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors duration-200"
                >
                  <ApperIcon name="Linkedin" size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage