'use client'

import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import { CarProps } from '../interface'
import { calculateCarRentalCost, generateImageUrl } from '../utils'
import styles from '../page.module.css'
import Image from 'next/image'
import CardDetails from './CardDetails'

interface ICars {
  car: CarProps
}

const CarCard = ({ car }: ICars) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  const { city_mpg, drive, make, model, transmission, year } = car

  const totalCost = calculateCarRentalCost(city_mpg, year)

  return (
    <>
      <Card sx={{ minWidth: 305 }}>
        <div className={styles.details__title}>
          <Typography variant='body1' color='text.primary'>
            {make.toUpperCase()} {model}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            $ {totalCost}/day
          </Typography>
        </div>
        <Image
          height='150'
          width='250'
          src={generateImageUrl(car)}
          alt='car model'
          style={{ objectFit: 'contain' }}
        />
        <CardContent sx={{ backgroundColor: '#eaeaea' }}>
          <div className={styles.details__container}>
            <div className={styles.card__details}>
              <Image
                src='/steering-wheel.svg'
                width={15}
                height={15}
                alt='steering wheel'
                style={{ objectFit: 'contain' }}
              />
              <Typography variant='body2'>
                {transmission === 'a' ? 'Automatic' : 'Manual'}
              </Typography>
            </div>
            <div className={styles.card__details}>
              <Image
                src='/tire.svg'
                width={15}
                height={15}
                alt='seat'
                style={{ objectFit: 'contain' }}
              />
              <Typography variant='body2'>{drive.toUpperCase()}</Typography>
            </div>
            <div className={styles.card__details}>
              <Image
                src='/gas.svg'
                width={15}
                height={15}
                alt='seat'
                style={{ objectFit: 'contain' }}
              />
              <Typography variant='body2' gutterBottom>
                {city_mpg}
                MPG
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions sx={{ backgroundColor: '#eaeaea' }}>
          <Button variant='contained' size='medium' onClick={handleOpenDialog}>
            View More
          </Button>
        </CardActions>
      </Card>
      <CardDetails isOpen={isOpen} setIsOpen={setIsOpen} car={car} />
    </>
  )
}

export default CarCard
