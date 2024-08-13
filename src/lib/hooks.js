import { auth, firestore, doc, onSnapshot } from './firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function useUserData() {
  const [user, authLoading] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        setUsername(docSnap.data()?.username);
        setLoading(false);
      });
    } else {
      setUsername(null);
      setLoading(authLoading);
    }

    return () => unsubscribe && unsubscribe();
  }, [user, authLoading]);

  return { user, username, loading };
}