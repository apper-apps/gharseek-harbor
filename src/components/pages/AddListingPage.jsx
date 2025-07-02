import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
const AddListingPage = () => {
  const { t } = useLanguage()
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
    { value: 'house', label: t('property.house') },
    { value: 'flat', label: t('property.flat') },
    { value: 'apartment', label: t('property.apartment') },
    { value: 'plot', label: t('property.plot') },
    { value: 'office', label: t('property.office') }
  ]

const cities = [
    { value: 'lahore', label: t('cityNames.lahore') },
    { value: 'karachi', label: t('cityNames.karachi') },
    { value: 'islamabad', label: t('cityNames.islamabad') },
    { value: 'multan', label: t('cityNames.multan') },
    { value: 'faisalabad', label: t('cityNames.faisalabad') },
    { value: 'rawalpindi', label: t('cityNames.rawalpindi') }
  ]

const areaUnits = [
    { value: 'sqft', label: t('property.sqft') },
    { value: 'marla', label: t('property.marla') },
    { value: 'kanal', label: t('property.kanal') }
  ]

  const facilityOptions = [
    'Parking', 'Security', 'Garden', 'Lift', 'Generator', 'Water Supply',
    'Gas Connection', 'Internet', 'Gym', 'Swimming Pool', 'Playground',
    'Market Nearby', 'School Nearby', 'Hospital Nearby'
  ]

const steps = [
    { number: 1, title: t('addListing.step1'), icon: 'Home' },
    { number: 2, title: t('addListing.step2'), icon: 'Info' },
    { number: 3, title: t('addListing.step3'), icon: 'Image' },
    { number: 4, title: t('addListing.step4'), icon: 'User' }
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
      toast.error(t('addListing.fillRequiredFields'))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

const handleSubmit = () => {
    if (validateStep(4)) {
      toast.success(t('addListing.submissionSuccess'))
      // In a real app, you would submit to an API
      console.log('Form submitted:', formData)
    } else {
      toast.error(t('addListing.fillRequiredFields'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
<h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
            {t('addListing.title')}
          </h1>
          <p className="text-gray-600">
            {t('addListing.description')}
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
                    currentStep >= step.number ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {t('common.step')} {step.number}
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
                {t('addListing.step1')}
              </h2>
              
<Input
                label={t('forms.propertyTitle')}
                placeholder={t('addListing.propertyTitlePlaceholder')}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Select
                  label={t('property.propertyType')}
                  options={propertyTypes}
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                />

<Select
                  label={t('property.city')}
                  options={cities}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input
                  label={t('forms.areaLocation')}
                  placeholder={t('addListing.areaLocationPlaceholder')}
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  required
                />

<Input
                  label={t('forms.monthlyRent')}
                  type="number"
                  placeholder={t('addListing.monthlyRentPlaceholder')}
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
                {t('addListing.step2')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input
                  label={t('property.bedrooms')}
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />

<Input
                  label={t('property.bathrooms')}
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input
                  label={t('forms.areaSize')}
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.areaSize}
                  onChange={(e) => handleInputChange('areaSize', e.target.value)}
                  required
                />

<Select
                  label={t('property.areaUnit')}
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
                  {t('addListing.propertyIsFurnished')}
                </label>
              </div>

              <div>
<label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('addListing.facilitiesFeatures')}
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
                {t('addListing.step3')}
              </h2>

              <div>
<label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('addListing.propertyImages')} <span className="text-red-500">*</span>
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
<p className="text-gray-600">{t('addListing.clickToUpload')}</p>
                    <p className="text-sm text-gray-500 mt-1">{t('addListing.imageFormats')}</p>
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
                  {t('forms.propertyDescription')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
placeholder={t('addListing.propertyDescriptionPlaceholder')}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
<h2 className="font-display font-semibold text-xl text-gray-900 mb-6">
                {t('forms.contactInformation')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input
                  label={t('forms.fullName')}
                  placeholder={t('addListing.fullNamePlaceholder')}
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  required
                />

<Input
                  label={t('forms.phoneNumber')}
                  placeholder={t('addListing.phoneNumberPlaceholder')}
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<Input
                  label={t('forms.whatsappNumber')}
                  placeholder={t('addListing.whatsappNumberPlaceholder')}
                  value={formData.contactWhatsApp}
                  onChange={(e) => handleInputChange('contactWhatsApp', e.target.value)}
                />

<Input
                  label={t('forms.email')}
                  type="email"
                  placeholder={t('addListing.emailPlaceholder')}
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ApperIcon name="Info" size={20} className="text-blue-500 mt-1 mr-2" />
                  <div>
<h3 className="font-medium text-blue-900">{t('addListing.importantNote')}</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      {t('addListing.contactVisibilityNote')}
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
              {t('common.previous')}
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
>
                {t('common.next')}
                <ApperIcon name="ChevronRight" size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="accent"
                className="flex items-center gap-2"
              >
<ApperIcon name="Check" size={16} />
                {t('addListing.submitListing')}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AddListingPage