import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; 
import 'firebase/firestore';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PublishBook from './components/PublishBook';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const MyContext = createContext(app);
export const dbContext = createContext(db)
export const AuthContext = createContext();
export const storageContext = createContext(storage);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Assuming you have imported auth from firebase/auth
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      <MyContext.Provider value={app}>
      <dbContext.Provider value={db}>
        <storageContext.Provider value={storage}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/publish" element={<PublishBook />} />
        </Routes>
        </storageContext.Provider>
        </dbContext.Provider>
      </MyContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
