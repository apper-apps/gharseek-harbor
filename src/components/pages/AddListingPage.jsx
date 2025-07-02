import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const AddListingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    city: '',
    area: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    areaSize: '',
    areaUnit: 'sqft',
    furnished: false,
    description: '',
    facilities: [],
    images: [],
    contactName: '',
    contactPhone: '',
    contactWhatsApp: '',
    contactEmail: ''
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
    { value: 'rawalpindi', label: 'Rawalpindi' }
  ]

  const areaUnits = [
    { value: 'sqft', label: 'Square Feet' },
    { value: 'marla', label: 'Marla' },
    { value: 'kanal', label: 'Kanal' }
  ]

  const facilityOptions = [
    'Parking', 'Security', 'Garden', 'Lift', 'Generator', 'Water Supply',
    'Gas Connection', 'Internet', 'Gym', 'Swimming Pool', 'Playground',
    'Market Nearby', 'School Nearby', 'Hospital Nearby'
  ]

  const steps = [
    { number: 1, title: 'Basic Information', icon: 'Home' },
    { number: 2, title: 'Property Details', icon: 'Info' },
    { number: 3, title: 'Images & Description', icon: 'Image' },
    { number: 4, title: 'Contact Information', icon: 'User' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    // In a real app, you would upload files to a server
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.type && formData.city && formData.area && formData.price
      case 2:
        return formData.areaSize && formData.areaUnit
      case 3:
        return formData.description && formData.images.length > 0
      case 4:
        return formData.contactName && formData.contactPhone
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      toast.success('Property listing submitted successfully!')
      // In a real app, you would submit to an API
      console.log('Form submitted:', formData)
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            List Your Property
          </h1>
          <p className="text-gray-600">
            Add your rental property to reach thousands of potential tenants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? (
                    <ApperIcon name="Check" size={20} />
                  ) : (
                    <ApperIcon name={step.icon} size={20} />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className="text-xs text-gray-500">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px bg-gray-300 flex-1 mx-4 ${
                    currentStep > step.number ? 'bg-primary-500' : ''
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-8"
        >
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                Basic Information
              </h2>
              
              <Input
                label="Property Title"
                placeholder="e.g., Beautiful 3 Bedroom House in DHA Lahore"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Property Type"
                  options={propertyTypes}
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                />

                <Select
                  label="City"
                  options={cities}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Area/Location"
                  placeholder="e.g., DHA Phase 5, Block B"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  required
                />

                <Input
                  label="Monthly Rent (PKR)"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                Property Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Bedrooms"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />

                <Input
                  label="Bathrooms"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Area Size"
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.areaSize}
                  onChange={(e) => handleInputChange('areaSize', e.target.value)}
                  required
                />

                <Select
                  label="Area Unit"
                  options={areaUnits}
                  value={formData.areaUnit}
                  onChange={(e) => handleInputChange('areaUnit', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  checked={formData.furnished}
                  onChange={(e) => handleInputChange('furnished', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="furnished" className="ml-2 text-gray-700">
                  Property is furnished
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Facilities & Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {facilityOptions.map((facility) => (
                    <label key={facility} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.facilities.includes(facility)}
                        onChange={() => handleFacilityToggle(facility)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Images & Description */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                Images & Description
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Images <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ApperIcon name="Upload" size={32} className="text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload images or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <ApperIcon name="X" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your property in detail..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="e.g., Ahmed Ali"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                />

                <Input
                  label="Phone Number"
                  placeholder="e.g., +92 300 1234567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="WhatsApp Number"
                  placeholder="e.g., +92 300 1234567"
                  value={formData.contactWhatsApp}
                  onChange={(e) => handleInputChange('contactWhatsApp', e.target.value)}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g., ahmed@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ApperIcon name="Info" size={20} className="text-blue-500 mt-1 mr-2" />
                  <div>
                    <h3 className="font-medium text-blue-900">Important Note</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Your contact information will be visible to potential tenants. 
                      Make sure all details are accurate and up-to-date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ApperIcon name="ChevronLeft" size={16} />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ApperIcon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="accent"
                className="flex items-center gap-2"
              >
                <ApperIcon name="Check" size={16} />
                Submit Listing
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AddListingPage