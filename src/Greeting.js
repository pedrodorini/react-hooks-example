import React from 'react'

import { useConfiguration } from './App'

export default function() {
  const { inputValue } = useConfiguration()

  return <p>Olá, {inputValue}</p>
}
