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

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [wrongPassword, setWrongPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      setError(false)
      if (response?.error) {
        setWrongPassword('Invalid credentials')
        return
      }
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setError(true)
    }
  }
  return (
    <div className={styles.login__container}>
      <Grid container justifyContent='center'>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: ' 30px' }}>
            <Typography variant='h5' gutterBottom>
              Sign in
            </Typography>
            {/* <GoogleAccount /> */}
            {wrongPassword && (
              <Alert severity='error' sx={{ marginBottom: '10px' }}>
                {wrongPassword}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    error={error && !email}
                    helperText={error && !email && 'Enter the email'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    size='small'
                    onChange={e => setPassword(e.target.value)}
                    error={error && !password}
                    helperText={error && !password && 'Enter the password'}
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
