'use client'
import React, { useState } from 'react'
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useRouter } from 'next/navigation'
import { fuels, yearsOfProduction } from '../consonants'

const CustomFilter = () => {
  const [fuel, setFuel] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const router = useRouter()

  const handleSearch = (e: any) => {
    e.preventDefault()
    if (fuel === '' || year === '') {
      return alert('Please fill the blank')
    }
    updateSearchParams(year.toLowerCase(), fuel.toLowerCase())
  }

  const updateSearchParams = (fuel: string, year: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search)
   
    if (fuel) {
      searchParams.set('fuel', fuel)
    }
    if (year) {
      searchParams.set('year', year)
    }
    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  const handleChangeFuel = (event: SelectChangeEvent) => {
    setFuel(event.target.value as string)
  }

  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string)
  }

  return (
    <>
      <Grid justifyContent='center' container spacing={1}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel id='demo-simple-select-label'>Fuel</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={fuel}
              label='Age'
              onChange={handleChangeFuel}
            >
              {fuels.map(fuel => (
                <MenuItem value={fuel.value}>{fuel.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Autocomplete
              inputValue={fuel}
              onInputChange={(event, newInputValue) => {
                setFuel(newInputValue)
              }}
              id='controllable-states-demo'
              options={fuels.map(fuel => fuel.title)}
              renderInput={params => (
                <TextField {...params} label='Fuel' size='small' />
              )}
            /> */}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel id='demo-simple-select-label'>Year</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={year}
              label='Age'
              onChange={handleChangeYear}
            >
              {yearsOfProduction.map(item => (
                <MenuItem value={item.value}>{item.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Autocomplete
              inputValue={year}
              onInputChange={(event, newInputValue) => {
                setYear(newInputValue)
              }}
              id='controllable-states-demo'
              options={yearsOfProduction.map(year => year.title)}
              renderInput={params => (
                <TextField {...params} label='Year' size='small' />
              )}
            /> */}
        </Grid>
        <SearchIcon onClick={handleSearch} />
      </Grid>
    </>
  )
}

export default CustomFilter
