import React from 'react'

export const AppContext = React.createContext()

export const AppContextProvider = ({ children, value }) => (
  <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
)
