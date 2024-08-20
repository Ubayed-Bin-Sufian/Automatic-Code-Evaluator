import { browserPopupRedirectResolver, signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from './firebase'

export const signIn = async () => {
  try {
    await signInWithPopup(auth, browserPopupRedirectResolver, googleAuthProvider)
  } catch (error) {
    console.error('Error signing in with Google', error)
  }
}
