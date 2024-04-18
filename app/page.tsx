import { Suspense } from 'react'
import CarCard from './components/CarCard'
import ErrorComponent from './components/Error'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
// import ShowPagination from './components/Pagination'
import ShowMoreOrLess from './components/ShowMoreOrLess'
import { HomeProps } from './interface'
import Loading from './loading'
import styles from './page.module.css'
import { fetchCars } from './utils'

export default async function Home ({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    model: searchParams.model || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10
  })

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className={styles.main}>
      {/* {allCars.length > 10 && (
        <ShowPagination limit={10} allCars={allCars.length} />
      )} */}
      <Header />
      <SearchBar />
      {!isDataEmpty ? (
        <div className={styles.result__container}>
          {allCars.map((car, index) => (
            <Suspense fallback={<Loading />}>
              <CarCard car={car} key={index} />
            </Suspense>
          ))}
          <ShowMoreOrLess
            allCars={allCars}
            pageNumber={(searchParams.limit || 10) / 10}
            searchParams={searchParams}
          />
        </div>
      ) : (
        <ErrorComponent />
      )}
    </main>
  )
}
