import { CircularProgress } from '@mui/material';
import React from 'react'
import styles from './page.module.css'


const Loading = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  )
}

export default Loading
