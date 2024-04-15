import { CarProps, FilterProps } from '../interface'

//** Fetching cars from an API*/
export const fetchCars = async (filters: FilterProps) => {
  const { manufacturer, model, fuel, year, limit } = filters
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`
  const headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_CAR_MARKET || '',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }
  const response = await fetch(url, { headers: headers })
  const data = await response.json()
  return data
}

//**Calculating the rent for one day */
export const calculateCarRentalCost = (city_mpg: number, year: number) => {
  // Calculate the base cost of the rental
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

//** Generating an angle of images in modal dialog */
export const generateImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage')
  const { make, model, year } = car

  url.searchParams.append('customer', 'hrjavascript-mastery' || '')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search)

  // Set the specified search parameter to the given value
  searchParams.set(type, value)

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}
