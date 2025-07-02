import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import BrowsePropertiesPage from '@/components/pages/BrowsePropertiesPage'
import PropertyDetailPage from '@/components/pages/PropertyDetailPage'
import AddListingPage from '@/components/pages/AddListingPage'
import AgentLoginPage from '@/components/pages/AgentLoginPage'
import BlogPage from '@/components/pages/BlogPage'
import ContactPage from '@/components/pages/ContactPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="properties" element={<BrowsePropertiesPage />} />
          <Route path="property/:id" element={<PropertyDetailPage />} />
          <Route path="add-listing" element={<AddListingPage />} />
          <Route path="agent-login" element={<AgentLoginPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App