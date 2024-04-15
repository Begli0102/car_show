import React from 'react'
import Image from 'next/image'
import styles from '../page.module.css'
import { footerLinks } from '../consonants'
import Link from 'next/link'
import { Grid, Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer className={styles.footer__container}>
      <Grid container spacing={2} className={styles.footer__logo__links}>
        <Grid item xs={12} md={4} className={styles.footer__logo}>
          <Image
            src='/4ydEzuq5aFVUjXdvHLripG-7eb7ed609239464291ac4b2f1dac2927-autoscout24redesign23-1100.png'
            alt='logo'
            width={118}
            height={38}
            style={{ objectFit: 'contain' }}
          />
          <Typography gutterBottom variant='body2'>
            @2023 CarHub. All rights reserved
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} className={styles.footer__links}>
          {footerLinks.map(item => (
            <div key={item.title} className={styles.footer__link}>
              <Typography gutterBottom variant='body1'>
                {item.title}
              </Typography>
              <div className={styles.footer__link__items}>
                {item.links.map(link => (
                  <Link key={link.title} href={link.url}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
