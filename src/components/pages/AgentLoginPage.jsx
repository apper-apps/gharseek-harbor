import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
const AgentLoginPage = () => {
  const { t } = useLanguage()
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
        toast.success(t('agentLogin.loginSuccess'))
      } else {
        toast.error(t('agentLogin.fillAllFields'))
      }
    } else {
      // Registration logic
      if (formData.email && formData.password && formData.name && formData.phone) {
if (formData.password !== formData.confirmPassword) {
          toast.error(t('agentLogin.passwordsDontMatch'))
          return
        }
toast.success(t('agentLogin.registrationSuccess'))
      } else {
        toast.error(t('agentLogin.fillAllFields'))
      }
    }
  }

  return (
    <div
    className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            className="text-center">
            <div
                className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6">
                <ApperIcon name="User" size={32} className="text-white" />
            </div>
            <h2 className="font-display font-bold text-3xl text-gray-900">
                {isLogin ? t("agentLogin.title") : t("agentLogin.registerTitle")}
            </h2>
            <p className="mt-2 text-gray-600">
                {isLogin ? t("agentLogin.loginDescription") : t("agentLogin.registerDescription")}
            </p>
        </motion.div>
        <motion.div
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                delay: 0.1
            }}
            className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && <Input
                    label={t("forms.fullName")}
                    placeholder={t("contact.enterYourName")}
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                    required={!isLogin} />}
                <Input
                    label={t("forms.email")}
                    type="email"
                    placeholder={t("contact.enterYourEmail")}
                    value={formData.email}
                    onChange={e => handleInputChange("email", e.target.value)}
                    required />
                {!isLogin && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label={t("forms.phoneNumber")}
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={e => handleInputChange("phone", e.target.value)}
                        required={!isLogin} />
                    <Input
                        label={t("forms.whatsappNumber")}
                        placeholder="+92 300 1234567"
                        value={formData.whatsapp}
                        onChange={e => handleInputChange("whatsapp", e.target.value)} />
                </div>}
                <Input
                    label={t("forms.password")}
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => handleInputChange("password", e.target.value)}
                    required />
                {!isLogin && <Input
                    label={t("forms.confirmPassword")}
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={e => handleInputChange("confirmPassword", e.target.value)}
                    required={!isLogin} />}
                {isLogin && <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            {t("agentLogin.rememberMe")}
                        </label>
                    </div>
                    <button
                        type="button"
                        className="text-sm text-primary-600 hover:text-primary-500"
                        className="text-sm text-primary-600 hover:text-primary-500">
                        {t("agentLogin.forgotPassword")}
                    </button></div>}
                <Button type="submit" variant="primary" className="w-full" className="w-full">
                    {isLogin ? t("agentLogin.signIn") : t("agentLogin.createAccount")}
                </Button></form>
            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t("agentLogin.orContinueWith")}</span>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2">
                        <ApperIcon name="Mail" size={16} />
                        {t("agentLogin.google")}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2">
                        <ApperIcon name="Facebook" size={16} />
                        {t("agentLogin.facebook")}
                    </Button>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {isLogin ? t("agentLogin.dontHaveAccount") : t("agentLogin.alreadyHaveAccount")}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 font-medium text-primary-600 hover:text-primary-500">
                        {isLogin ? t("agentLogin.registerHere") : t("agentLogin.signInHere")}
                    </button>
                </p>
            </div>
            {!isLogin && <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <ApperIcon name="Info" size={20} className="text-blue-500 mt-1 mr-2" />
                    <div>
                        <h3 className="font-medium text-blue-900">{t("agentLogin.agentVerification")}</h3>
                        <p className="text-sm text-blue-700 mt-1">
                            {t("agentLogin.verificationNote")}
                        </p>
                    </div>
                </div>
            </div>}
        </motion.div>
    </div>
</div>
  )
}

export default AgentLoginPage