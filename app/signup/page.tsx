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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [userExist, setUserExist] = useState('')

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const userExist = await fetch('/api/userExist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })

      const { user } = await userExist.json()

      if (user) {
        setUserExist('This email exist')
        return
      }
      setError(false)

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      if (response.ok) {
        const form = event.target as HTMLFormElement
        form.reset()
        router.push('/login')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setError(true)
    }
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
                    fullWidth
                    onChange={e => setName(e.target.value)}
                    error={error && !name}
                    helperText={error && !name && 'Please enter name'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    error={error && !email}
                    helperText={error && !email && 'Please enter email'}
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
                    helperText={error && !password && 'Please enter password'}
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
