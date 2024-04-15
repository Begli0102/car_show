'use client'
import { Box, Chip } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { updateSearchParams } from '../utils'
import styles from '../page.module.css'
import { FilterProps } from '../interface'

interface IShowMoreOrLess {
  allCars: any[]
  pageNumber: number
  searchParams: FilterProps
}
const ShowMoreOrLess = ({
  allCars,
  pageNumber,
  searchParams
}: IShowMoreOrLess) => {
  const router = useRouter()

  const handleShowMore = () => {
    const newLimit = (pageNumber + 1) * 10
    const newPathName = updateSearchParams('limit', `${newLimit}`)
    router.push(newPathName)
  }

  const handleShowLess = () => {
    const newLimit = pageNumber * 10 - 10
    const newPathName = updateSearchParams('limit', `${newLimit}`)
    router.push(newPathName)
  }

  return (
    <div className={styles.more_less_buttons}>
      {allCars.length >= 10 && (
        <div className={styles.show__more__container}>
          <Box textAlign='center'>
            <Chip
              sx={{ minWidth: '180px' }}
              label='Show More'
              color='primary'
              onClick={handleShowMore}
            />
          </Box>
        </div>
      )}
      {Number(searchParams?.limit) > 10 && allCars.length > 10 && (
        <div className={styles.show__more__container}>
          <Box textAlign='center'>
            <Chip
              sx={{ minWidth: '180px' }}
              label='Show less'
              color='secondary'
              onClick={handleShowLess}
            />
          </Box>
        </div>
      )}
    </div>
  )
}

export default ShowMoreOrLess
