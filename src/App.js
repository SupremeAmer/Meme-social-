import React, { useEffect, useState } from 'react';
import { account } from './appwrite/config';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MemeCreator from './components/MemeCreator';
import MemeFeed from './components/MemeFeed';
import Dashboard from './components/Admin/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const fetchUser = async () => {
    try {
      setUser(await account.get());
    } catch {
      setUser(null);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleLogout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const handleAuthSuccess = () => {
    fetchUser();
  };

  // Example: admin is detected by email (replace with your own logic)
  const isAdmin = user?.email === "admin@email.com";

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ maxWidth: 700, margin: '2rem auto' }}>
        {!user ? (
          showRegister ?
            <Register onRegister={handleAuthSuccess} /> :
            <Login onLogin={handleAuthSuccess} />
        ) : (
          isAdmin ? <Dashboard /> : (
            <>
              <MemeCreator user={user} onMemeCreated={() => {}} />
              <MemeFeed user={user} />
            </>
          )
        )}
        {!user && (
          <p style={{ textAlign: 'center', marginTop: 20 }}>
            {showRegister ? (
              <span>
                Already have an account?{' '}
                <button onClick={() => setShowRegister(false)}>Login</button>
              </span>
            ) : (
              <span>
                New here?{' '}
                <button onClick={() => setShowRegister(true)}>Register</button>
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
