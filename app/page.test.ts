import { CarProps, FilterProps } from './interface'
import Home from './page'
import { fetchCars } from './utils'

describe('fetchCars', () => {
  // Should fetch cars from API with valid filters
  it('should fetch cars from API with valid filters', async () => {
    const filters: FilterProps = {
      manufacturer: 'Toyota',
      model: 'Camry',
      fuel: 'gasoline',
      year: 2020,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(Array.isArray(data)).toBe(true)
  })

  // Should return data in expected format
  it('should return data in expected format', async () => {
    const filters: FilterProps = {
      manufacturer: 'Toyota',
      model: 'Camry',
      fuel: 'gasoline',
      year: 2020,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeLessThanOrEqual(Number(filters.limit))
    data.forEach((car: CarProps) => {
      expect(car.make).toBeDefined()
      expect(car.model).toBeDefined()
      expect(car.year).toBeDefined()
      expect(car.fuel_type).toBeDefined()
    })
  })

  // Should handle empty response from API
  it('should handle empty response from API', async () => {
    const filters: FilterProps = {
      manufacturer: 'Toyota',
      model: 'Camry',
      fuel: 'gasoline',
      year: 2020,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(0)
  })

  // Should handle invalid filters and return appropriate error message
  it('should handle invalid filters and return appropriate error message', async () => {
    const filters: FilterProps = {
      manufacturer: 'InvalidManufacturer',
      model: 'InvalidModel',
      fuel: 'InvalidFuel',
      year: 2022,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(typeof data).toBe('string')
    expect(data).toContain('Invalid filters')
  })

  // Should handle invalid API response format and return appropriate error message
  it('should handle invalid API response format and return appropriate error message', async () => {
    const filters: FilterProps = {
      manufacturer: 'Toyota',
      model: 'Camry',
      fuel: 'gasoline',
      year: 2020,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(typeof data).toBe('string')
    expect(data).toContain('Invalid API response format')
  })

  // Should handle network errors and return appropriate error message
  it('should handle network errors and return appropriate error message', async () => {
    const filters: FilterProps = {
      manufacturer: 'Toyota',
      model: 'Camry',
      fuel: 'gasoline',
      year: 2020,
      limit: 10
    }
    const data = await fetchCars(filters)
    expect(data).toBeDefined()
    expect(typeof data).toBe('string')
    expect(data).toContain('Network error')
  })
})
