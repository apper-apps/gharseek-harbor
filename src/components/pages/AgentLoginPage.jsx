import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const AgentLoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    whatsapp: '',
    confirmPassword: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Login logic
      if (formData.email && formData.password) {
        toast.success('Login successful!')
      } else {
        toast.error('Please fill in all fields')
      }
    } else {
      // Registration logic
      if (formData.email && formData.password && formData.name && formData.phone) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        toast.success('Registration successful!')
      } else {
        toast.error('Please fill in all required fields')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="User" size={32} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-3xl text-gray-900">
            {isLogin ? 'Agent Login' : 'Register as Agent'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? 'Access your property listings and manage inquiries' 
              : 'Join GharSeek as a verified property agent'
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required={!isLogin}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />

            {!isLogin && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required={!isLogin}
                />
                <Input
                  label="WhatsApp Number"
                  placeholder="+92 300 1234567"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                />
              </div>
            )}

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />

            {!isLogin && (
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required={!isLogin}
              />
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <ApperIcon name="Mail" size={16} />
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <ApperIcon name="Facebook" size={16} />
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-primary-600 hover:text-primary-500"
              >
                {isLogin ? 'Register here' : 'Sign in here'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <ApperIcon name="Info" size={20} className="text-blue-500 mt-1 mr-2" />
                <div>
                  <h3 className="font-medium text-blue-900">Agent Verification</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    New agent accounts are subject to verification. You'll receive an email 
                    with verification instructions after registration.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AgentLoginPage