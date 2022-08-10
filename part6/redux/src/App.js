const App = () => {
    return (
      <div>
        <ul>
          {store.getState().map(note => {
            return <li key={note.id}>
              {note.content}<strong>{note.important ? 'important' : ''}</strong>
            </li>
          })}
        </ul>
        <button onClick={e => store.dispatch({type: 'INCREMENT'})}>
          plus
        </button>
        <button onClick={e => store.dispatch({type: 'DECREMENT'})}>minus</button>
        <button onClick={e => store.dispatch({type: 'ZERO'})}>zero</button>
      </div>
    )
  }