'use client'
import React, { useState } from 'react'
import {
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Alert
} from '@mui/material'
import styles from '../page.module.css'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import GoogleAccount from '../components/GoogleAccount'
import { useSession } from 'next-auth/react'

const LoginPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(false)
  const [wrongCredentials, setWrongCredentials] = useState('')
  const router = useRouter()

  const { data: session } = useSession()

  if (session) {
    router.replace('/')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user.email || !user.password) {
      setError(true)
      return
    }

    try {
      const response = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false
      })
      if (response?.ok) {
        const form = event.target as HTMLFormElement
        form.reset()
        router.replace('/')
      }

      setError(false)
      if (response?.error) {
        setWrongCredentials('Invalid credentials')
        return
      }
    } catch (error) {
      console.log(error)
    } finally {
      setError(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className={styles.login__container}>
      <Grid container justifyContent='center'>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: ' 30px' }}>
            <Typography variant='h5' gutterBottom>
              Sign in
            </Typography>
            <GoogleAccount />
            {wrongCredentials && (
              <Alert severity='error' sx={{ marginBottom: '10px' }}>
                {wrongCredentials}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    size='small'
                    name='email'
                    fullWidth
                    onChange={handleChange}
                    error={error && !user.email}
                    helperText={error && !user.email && 'Enter the email'}
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
                    helperText={error && !user.password && 'Enter the password'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                  >
                    Sign in
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' gutterBottom>
                    Don't have an account?
                    <Link style={{ textDecoration: 'none' }} href={'/signup'}>
                      <span
                        style={{ marginLeft: '5px', textDecoration: 'none' }}
                      >
                        Sign up
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

export default LoginPage
