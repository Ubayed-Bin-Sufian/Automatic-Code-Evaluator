import { auth, googleAuthProvider } from './firebase'
import { signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth'

export const signIn = async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider, browserPopupRedirectResolver)
  } catch (error) {
    console.error('Error signing in with Google', error)
  }
}
