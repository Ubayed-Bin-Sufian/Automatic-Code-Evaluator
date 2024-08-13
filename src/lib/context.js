import { createContext, useContext } from 'react'
import { useUserData } from './hooks'

export const UserContext = createContext({ user: null, username: null })

export function UserProvider({ children }) {
  const userData = useUserData()
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)