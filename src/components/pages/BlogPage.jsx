import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import { blogService } from "@/services/api/blogService";

const BlogPage = () => {
  const { t } = useLanguage()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

const categories = [
    { value: 'all', label: t('blog.allPosts') },
    { value: 'tips', label: t('blog.propertyTips') },
    { value: 'laws', label: t('blog.rentalLaws') },
    { value: 'reviews', label: t('blog.areaReviews') },
    { value: 'guides', label: t('blog.movingGuides') },
    { value: 'market', label: t('blog.marketInsights') }
  ]
  const loadPosts = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await blogService.getAll()
      setPosts(data)
} catch (err) {
      setError(t('errors.failedToLoadBlogPosts'))
      console.error('Error loading blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPosts} />

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
              {t('blog.title')}
            </h1>
<p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('blog.description')}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts */}
{filteredPosts.length === 0 ? (
          <Empty message={t('blog.noBlogPosts')} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.Id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden hover:shadow-feature transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={post.image || '/api/placeholder/400/250'}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary">{post.category}</Badge>
                  </div>
                </div>
                
                <div className="p-6">
<div className="flex items-center text-sm text-gray-500 mb-3">
                    <ApperIcon name="Calendar" size={16} className="mr-2" />
                    {post.publishDate}
                    <ApperIcon name="Clock" size={16} className="ml-4 mr-2" />
                    {post.readTime} {t('blog.minRead')}
                  </div>
                  <h2 className="font-display font-semibold text-xl text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <ApperIcon name="User" size={16} className="text-primary-600" />
                      </div>
                      <span className="text-sm text-gray-700">{post.author}</span>
                    </div>
                    
<Link
                      to={`/blog/${post.Id}`}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                    >
                      {t('blog.readMore')}
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white"
        >
<h3 className="font-display font-bold text-2xl mb-4">
            {t('blog.stayUpdated')}
          </h3>
<p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            {t('blog.subscribeDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
<input
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
<button className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              {t('footer.subscribe')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BlogPage