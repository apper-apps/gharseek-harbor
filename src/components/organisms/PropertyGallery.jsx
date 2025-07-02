import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const PropertyGallery = ({ images = [], title }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images.length) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
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
        <img
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <ApperIcon name="Expand" size={32} className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
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
            <img
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
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
              <img
                src={images[selectedImage]}
                alt={`${title} - Full size`}
                className="max-w-full max-h-full object-contain rounded-lg"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PropertyGallery