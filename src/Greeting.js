import React from 'react'

import { useConfiguration } from './App'

export default function() {
  const { inputValue } = useConfiguration()

  return <p>Bem-vindo{inputValue && `, ${inputValue}!`}</p>
}
