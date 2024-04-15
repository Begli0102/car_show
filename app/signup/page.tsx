'use client'
import React, { useState } from 'react'
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Link
} from '@mui/material'
import styles from '../page.module.css'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState(false)
  const [userExist, setUserExist] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      })
      if (!response.ok) {
        const errorMessage = await response.json()
        setUserExist(errorMessage.message)
        return
      }

      const form = event.target as HTMLFormElement
      form.reset()
      router.push('/login')
    } catch (error) {
      console.error('An error occurred:', error)
    } finally {
      setError(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.signup__container}>
      <Grid container justifyContent='center'>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: ' 30px' }}>
            <Typography variant='h5' gutterBottom>
              Sign up
            </Typography>
            {userExist && (
              <Alert severity='error' sx={{ marginBottom: '10px' }}>
                {userExist}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Full name'
                    variant='outlined'
                    size='small'
                    name='name'
                    fullWidth
                    onChange={handleChange}
                    error={error && !user.name}
                    helperText={error && !user.name && 'Please enter name'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    size='small'
                    name='email'
                    fullWidth
                    onChange={handleChange}
                    error={error && !user.email}
                    helperText={error && !user.email && 'Please enter email'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    name='password'
                    fullWidth
                    size='small'
                    onChange={handleChange}
                    error={error && !user.password}
                    helperText={
                      error && !user.password && 'Please enter password'
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                  >
                    Sign up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom>
                    Do you want to sign in?
                    <Link style={{ textDecoration: 'none' }} href={'/login'}>
                      <span
                        style={{ marginLeft: '5px', textDecoration: 'none' }}
                      >
                        Sign in
                      </span>
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignupPage
