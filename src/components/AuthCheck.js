import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../lib/context'; // Update the import path according to your project

export default function AuthCheck({ children, fallback }) {
  const { user, username, loading } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (!loading && !user) {
      history.push('/');
    }
  }, [user, loading, history]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return fallback || <a href="/enter">You must be signed in</a>;
  }

  return children;
}
