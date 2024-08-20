import { auth, doc, firestore, onSnapshot } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export function useUserData() {
  const [loading, setLoading] = useState(true);
  const [user, authLoading] = useAuthState(auth);
  const [username, setUsername] = useState(null);

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

  return { loading, user, username };
}