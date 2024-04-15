'use client'
import React, { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import { Container, Box } from '@mui/material'

const ShowPagination = ({ limit, allCars, setCars }: any) => {
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Container maxWidth='sm'>
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(allCars / limit)}
          page={page}
          onChange={handleChange}
          color='primary'
        />
      </Box>
    </Container>
  )
}

export default ShowPagination
