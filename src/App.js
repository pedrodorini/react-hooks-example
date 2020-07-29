import React from 'react'
import { Link } from 'react-router-dom'

import { AppContextProvider } from './context/AppContext'

import ClearBtn from './ClearButton'

import './styles.css'

export function useConfiguration() {
  const [inputValue, setInputValue] = React.useState(
    window.localStorage.getItem('inputValue') || '',
  )

  React.useEffect(() => window.localStorage.setItem('inputValue', inputValue), [
    inputValue,
  ])

  return {
    inputValue,
    setInputValue,
  }
}

function reducer(currentState, newState) {
  return { ...currentState, ...newState }
}

export default function App() {
  const [visible, setVisible] = React.useState(false)
  // const [inputValue, setInputValue] = React.useState('')
  const { inputValue, setInputValue } = useConfiguration()
  const [{ lastName, age }, setState] = React.useReducer(reducer, {
    lastName: '',
    age: '',
  })
  const container = React.useRef()
  const buttonElement = React.useRef()
  const inputElement = React.useRef()

  React.useEffect(() => {
    console.log('adding event listener')
    const handleClick = event => {
      if (
        container?.current?.contains(event.target) ||
        buttonElement?.current?.contains(event.target)
      )
        return

      setVisible(false)
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      console.log('removing event listener')
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // const handleInputFocus = () => {
  //   console.log('handling input focus')
  //   if (visible) inputElement.current.focus()
  // }

  const handleInputFocus = React.useCallback(() => {
    console.log('handling input focus')
    if (visible) inputElement.current.focus()
  }, [visible])

  React.useEffect(() => {
    // if (visible) inputElement.current.focus()
    handleInputFocus()
  }, [handleInputFocus])

  const memoizedDisplay = React.useMemo(
    () => (
      <Display visible={inputValue}>
        {inputValue} {lastName}
        {age && `, ${age} anos`}
      </Display>
    ),
    [inputValue, lastName, age],
  )

  // const memoizedDisplay = (
  //   <Display visible={inputValue}>
  //     {inputValue} {lastName} {age && `, ${age} anos`}
  //   </Display>
  // )

  return (
    <div className="App">
      <button
        style={{ marginBottom: 5 }}
        ref={buttonElement}
        onClick={() => setVisible(!visible)}
      >
        Clique aqui
      </button>
      <div
        style={{
          padding: visible ? '5px 0' : 0,
          width: '100%',
          backgroundColor: '#555',
          transition: 'ease .3s',
        }}
        ref={container}
      >
        {visible && (
          <>
            <input
              value={inputValue}
              onChange={({ target: { value } }) => setInputValue(value)}
              ref={inputElement}
              type="text"
              style={{ marginRight: 8 }}
              placeholder="Nome"
            />
            <input
              value={lastName}
              onChange={({ target: { value } }) =>
                setState({ lastName: value })
              }
              type="text"
              style={{ marginRight: 8 }}
              placeholder="Sobrenome"
            />
            <input
              value={age}
              onChange={({ target: { value } }) => setState({ age: value })}
              type="number"
              placeholder="Idade"
            />
            <div>
              <Link
                style={{ display: 'block', color: 'white', marginTop: 20 }}
                to="/greeting"
              >
                Próximo
              </Link>
            </div>
          </>
        )}
      </div>
      {memoizedDisplay}
      {inputValue && (
        <AppContextProvider value={{ setInputValue }}>
          <ClearBtn />
        </AppContextProvider>
      )}
    </div>
  )
}

const Display = ({ children, visible }) => {
  console.log('rendering display component')

  return visible && <p>Você digitou: {children}</p>
}

// const Display = React.memo(({ children, ...props }) => {
//   console.log('rendering button')

//   return <p {...props}>{children}</p>
// })
