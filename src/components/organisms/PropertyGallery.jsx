import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

// Enhanced Image component with error handling and loading states
const ImageWithFallback = ({ 
  src, 
  alt, 
  className, 
  fallbackClassName = '', 
  onLoad = () => {}, 
  onError = () => {},
  showRetry = false 
}) => {
  const [imageState, setImageState] = useState('loading') // loading, loaded, error
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef(null)
  
  const maxRetries = 2
  const fallbackImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE4NVYxMzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTE2NSAxNDVIMjM1VjE1NUgxNjVWMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTQ1IDE2NUgyNTVWMTc1SDE0NVYxNjVaIiBmaWxsPSIjOUNBM0FGIi8+CjwvZz4KPC9zdmc+'

  const handleImageLoad = () => {
    setImageState('loaded')
    onLoad()
  }

  const handleImageError = () => {
    console.warn(`Image failed to load: ${src}`)
    if (retryCount < maxRetries) {
      // Retry loading the image
      setRetryCount(prev => prev + 1)
      if (imgRef.current) {
        // Force reload by changing src slightly
        imgRef.current.src = `${src}?retry=${retryCount + 1}`
      }
    } else {
      setImageState('error')
      onError()
    }
  }

  const handleRetry = () => {
    setImageState('loading')
    setRetryCount(0)
    if (imgRef.current) {
      imgRef.current.src = `${src}?manual-retry=${Date.now()}`
    }
  }

  if (imageState === 'error') {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className} ${fallbackClassName}`}>
        <div className="text-center p-4">
          <ApperIcon name="ImageOff" size={32} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm mb-2">Image unavailable</p>
          {showRetry && (
            <button 
              onClick={handleRetry}
              className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 mx-auto"
            >
              <ApperIcon name="RotateCcw" size={12} />
              Retry
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      {imageState === 'loading' && (
        <div className={`absolute inset-0 bg-gray-100 flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500 text-xs">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}

const PropertyGallery = ({ images = [], title }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set())

  const handleImageError = (index) => {
    setImageLoadErrors(prev => new Set([...prev, index]))
  }

  const handleImageLoad = (index) => {
    setImageLoadErrors(prev => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }

  if (!images.length) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Image" size={48} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        className="relative rounded-lg overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsModalOpen(true)}
      >
        <ImageWithFallback
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="w-full h-96 object-cover"
          onLoad={() => handleImageLoad(selectedImage)}
          onError={() => handleImageError(selectedImage)}
          showRetry={true}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <ApperIcon name="Expand" size={32} className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
        {imageLoadErrors.has(selectedImage) && (
          <div className="absolute top-4 left-4 bg-red-500 bg-opacity-90 text-white px-2 py-1 rounded text-xs">
            Image failed to load
          </div>
        )}
      </motion.div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <ImageWithFallback
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              fallbackClassName="text-xs"
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          </motion.button>
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={images[selectedImage]}
                alt={`${title} - Full size`}
                className="max-w-full max-h-full object-contain rounded-lg"
                fallbackClassName="min-w-96 min-h-64"
                onLoad={() => handleImageLoad(selectedImage)}
                onError={() => handleImageError(selectedImage)}
                showRetry={true}
              />
              
              {/* Navigation */}
              {selectedImage > 0 && (
                <button
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ApperIcon name="ChevronLeft" size={24} />
                </button>
              )}
              
              {selectedImage < images.length - 1 && (
                <button
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                >
                  <ApperIcon name="ChevronRight" size={24} />
                </button>
              )}
              
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
              >
                <ApperIcon name="X" size={24} />
              </button>

              {/* Error indicator in modal */}
              {imageLoadErrors.has(selectedImage) && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 bg-opacity-90 text-white px-3 py-2 rounded text-sm">
                  <ApperIcon name="AlertTriangle" size={16} className="inline mr-2" />
                  Original image failed to load
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PropertyGallery