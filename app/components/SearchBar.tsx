'use client'
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Grid,
  SelectChangeEvent,
  Button,
  Tooltip,
  Zoom
} from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { manufacturers } from '../consonants/index'
import styles from '../page.module.css'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

interface IValues {
  manufacturer: string
  model: string
}

const SearchBar = () => {
  const [values, setValues] = useState<IValues>({
    manufacturer: '',
    model: ''
  })
  const [errors, setErrors] = useState({
    manufacturer: false,
    model: false
  })

  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    setErrors({
      manufacturer: false,
      model: false
    })
    e.preventDefault()

    updateSearchParams(
      values.model.toLowerCase(),
      values.manufacturer.toLowerCase()
    )
    setErrors({
      manufacturer: true,
      model: true
    })
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search)
    if (model) {
      searchParams.set('model', model)
    }
    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    }
    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  const handleChangeManufacturer = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleChangeModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleResetParams = () => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('manufacturer')) {
      searchParams.delete('manufacturer')
    }
    if (searchParams.has('model')) {
      searchParams.delete('model')
    }
    if (searchParams.has('limit')) {
      searchParams.delete('limit')
    }
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathname)
  }
  return (
    <div className={styles.search__container}>
      <Grid justifyContent='center' container spacing={1}>
        <Grid item xs={10} md={3}>
          <FormControl fullWidth>
            <InputLabel id='demo-controlled-open-select-label'>
              Manufacturer
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='manufacturer'
              value={values.manufacturer}
              name='manufacturer'
              label='Manufacturer'
              onChange={handleChangeManufacturer}
              size='small'
              error={errors.manufacturer && !values.manufacturer}
            >
              {manufacturers.map((manufacurer, index: number) => (
                <MenuItem key={index} value={manufacurer}>
                  {manufacurer}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} md={2}>
          <FormControl fullWidth required>
            <TextField
              label='Model'
              id='model'
              name='model'
              value={values.model}
              onChange={handleChangeModel}
              size='small'
              error={
                errors.model && !values.model && Boolean(!values.manufacturer)
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={8} md={1}>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={2} md={1}>
          <Tooltip
            title='Reset'
            placement='bottom-end'
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 500 }}
          >
            <RestartAltIcon
              color='primary'
              sx={{ fontSize: '38px' }}
              onClick={handleResetParams}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchBar
