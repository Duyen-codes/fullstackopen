import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  if (!props.show) {
    return null
  }

  const books = props.books
  console.log('books', books)
  const booksToShow =
    selectedGenre === null
      ? books
      : books.filter((book) => {
          return book.genres.includes(selectedGenre)
        })

  console.log('booksToShow', booksToShow)
  const handleFilter = (genre) => {
    setSelectedGenre(genre)
  }
  if (!books) {
    return null
  }

  const genreArray = books?.map((book) => book.genres)
  console.log('genreArray', genreArray)
  let uniqueGenres = []
  genreArray.forEach((element) => {
    element.forEach((ele) => {
      if (!uniqueGenres.includes(ele)) {
        uniqueGenres.push(ele)
      }
    })
  })
  console.log('uniqueGenres', uniqueGenres)

  return (
    <div>
      <h2>books</h2>
      <p>in genre {selectedGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((g) => {
          console.log(g)
          return (
            <button key={g} onClick={() => setSelectedGenre(g)}>
              {g}
            </button>
          )
        })}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
