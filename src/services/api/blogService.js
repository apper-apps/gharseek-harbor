import blogPostsData from '@/services/mockData/blogPosts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const blogService = {
  async getAll() {
    await delay(300)
    return [...blogPostsData]
  },

  async getById(id) {
    await delay(200)
    const post = blogPostsData.find(p => p.Id === id)
    if (!post) {
      throw new Error('Blog post not found')
    }
    return { ...post }
  },

  async getByCategory(category) {
    await delay(350)
    return blogPostsData.filter(p => p.category === category).map(p => ({ ...p }))
  },

  async getFeatured() {
    await delay(250)
    return blogPostsData.slice(0, 3).map(p => ({ ...p }))
  },

  async create(postData) {
    await delay(200)
    const newId = Math.max(...blogPostsData.map(p => p.Id)) + 1
    const newPost = {
      Id: newId,
      ...postData,
      publishDate: new Date().toISOString().split('T')[0]
    }
    blogPostsData.push(newPost)
    return { ...newPost }
  },

  async update(id, postData) {
    await delay(200)
    const index = blogPostsData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Blog post not found')
    }
    blogPostsData[index] = { ...blogPostsData[index], ...postData }
    return { ...blogPostsData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = blogPostsData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Blog post not found')
    }
    blogPostsData.splice(index, 1)
    return true
  }
}