import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setError, show }) => {
  console.log('show in LoginForm', show)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      console.log('token', token)
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  const submit = (event) => {
    event.preventDefault()
    console.log('LoginForm submitted')

    login({ variables: { username, password } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username{' '}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
