import React from 'react'

import { AppContext } from './context/AppContext'

export default function() {
  const { setInputValue } = React.useContext(AppContext)
  return <button onClick={() => setInputValue('')}>Limpar</button>
}
