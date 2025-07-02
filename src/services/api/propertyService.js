import propertiesData from '@/services/mockData/properties.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(300)
    return [...propertiesData]
  },

  async getById(id) {
    await delay(250)
    const property = propertiesData.find(p => p.Id === id)
    if (!property) {
      throw new Error('Property not found')
    }
    return { ...property }
  },

  async getFeatured() {
    await delay(400)
    return propertiesData.filter(p => p.featured).map(p => ({ ...p }))
  },

  async search(filters = {}) {
    await delay(500)
    let filtered = [...propertiesData]

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.type === filters.propertyType)
    }
    
    if (filters.city) {
      filtered = filtered.filter(p => p.city === filters.city)
    }
    
    if (filters.area) {
      filtered = filtered.filter(p => 
        p.area.toLowerCase().includes(filters.area.toLowerCase())
      )
    }
    
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceMin))
    }
    
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceMax))
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }
    
    if (filters.furnished) {
      const isFurnished = filters.furnished === 'furnished'
      filtered = filtered.filter(p => p.furnished === isFurnished)
    }

    return filtered
  },

  async create(propertyData) {
    await delay(200)
    const newId = Math.max(...propertiesData.map(p => p.Id)) + 1
    const newProperty = {
      Id: newId,
      ...propertyData,
      verified: false,
      featured: false
    }
    propertiesData.push(newProperty)
    return { ...newProperty }
  },

  async update(id, propertyData) {
    await delay(200)
    const index = propertiesData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    propertiesData[index] = { ...propertiesData[index], ...propertyData }
    return { ...propertiesData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = propertiesData.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    propertiesData.splice(index, 1)
    return true
  }
}