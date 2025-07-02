import citiesData from '@/services/mockData/cities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const cityService = {
  async getAll() {
    await delay(300)
    return [...citiesData]
  },

  async getById(id) {
    await delay(200)
    const city = citiesData.find(c => c.Id === id)
    if (!city) {
      throw new Error('City not found')
    }
    return { ...city }
  },

  async getPopular() {
    await delay(350)
    return citiesData.slice(0, 8).map(c => ({ ...c }))
  },

  async create(cityData) {
    await delay(200)
    const newId = Math.max(...citiesData.map(c => c.Id)) + 1
    const newCity = {
      Id: newId,
      ...cityData
    }
    citiesData.push(newCity)
    return { ...newCity }
  },

  async update(id, cityData) {
    await delay(200)
    const index = citiesData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('City not found')
    }
    citiesData[index] = { ...citiesData[index], ...cityData }
    return { ...citiesData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = citiesData.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('City not found')
    }
    citiesData.splice(index, 1)
    return true
  }
}