'use client'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../page.module.css'
import { Chip, Grid, Typography } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import carLogo from '../../public/car-logo.svg'

const Navbar = () => {
  const { status, data: session } = useSession()

  return (
    <header className={styles.navbar__container}>
      <nav className={styles.navbar}>
        <Grid container alignItems='center'>
          <Grid item xs={3} sm={4} md={1} lg={1} mr={2}>
            <Link href='/' className={styles.navbar_link}>
              <Image
                src={carLogo}
                alt='logo'
                width={118}
                height={40}
                className={styles.logo_for_navbar}
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            md={9}
            lg={9}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {status === 'authenticated' ? (
              <Typography sx={{ color: '#ffff' }} gutterBottom>
                <span style={{ color: 'primary' }}>
                  Nice to see you {session?.user?.name}!
                </span>
              </Typography>
            ) : (
              <Typography sx={{ color: '#ffff' }} gutterBottom>
                Hi. Nice to see you !
              </Typography>
            )}
          </Grid>
          <Grid item xs={3} md={1} lg={1}>
            <div className={styles.navbar__chip}>
              {session ? (
                <Chip
                  label='Sign out'
                  variant='outlined'
                  sx={{ color: '#ffff' }}
                  onClick={() => signOut()}
                />
              ) : (
                <Link href={'/login'}>
                  <Chip
                    label='Sign in'
                    variant='outlined'
                    sx={{ color: '#ffff' }}
                  />
                </Link>
              )}
            </div>
          </Grid>
        </Grid>
      </nav>
    </header>
  )
}
export default Navbar
