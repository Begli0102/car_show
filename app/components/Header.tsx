'use client'
import Image from 'next/image'
import styles from '../page.module.css'
import { Typography, Grid, Chip } from '@mui/material'
import headerImage from '../../public/hero.png'

const Header = () => {
  const handleScroll = () => {}

  return (
    <div className={styles.header}>
      <Grid className={styles.header__item} container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className={styles.header__left}>
            <Typography
              variant='h4'
              gutterBottom
              className={styles.header__title}
            >
              Find, book, rent a car—quick and super easy!
            </Typography>
            <Typography
              variant='h5'
              gutterBottom
              className={styles.header__subtitle}
            >
              Streamline your car rental experience with our effortless booking
              process.
            </Typography>
            <Chip
              label='Explore Cars'
              variant='filled'
              color='primary'
              onClick={handleScroll}
            />
          </div>
        </Grid>
        <Grid item xs={10} md={4}>
          <div className={styles.image__container}>
            <Image
              src={headerImage}
              alt='image'
              className={styles.image}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
