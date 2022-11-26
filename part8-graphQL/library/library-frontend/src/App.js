import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  console.log('bookResult', bookResult)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  if (authorResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
        />
        <Authors
          show={page === 'authors'}
          authors={authorResult?.data?.allAuthors}
        />

        <Books show={page === 'books'} books={bookResult?.data?.allBooks} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Authors
        show={page === 'authors'}
        authors={authorResult?.data?.allAuthors}
      />

      <Books show={page === 'books'} books={bookResult?.data?.allBooks} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}
