import React from 'react'
import styles from '../page.module.css'
import { Typography, Stack, Alert } from '@mui/material'

const ErrorComponent = () => {
  return (
    <div className={styles.error__container}>
      <Stack sx={{ minWidth: '280px', minHeight: '100vh' }}>
        <Alert
          variant='filled'
          severity='warning'
          sx={{ alignItems: 'center' }}
        >
          <Typography variant='body2' gutterBottom>
            Oops, no results
          </Typography>
        </Alert>
      </Stack>
    </div>
  )
}

export default ErrorComponent
