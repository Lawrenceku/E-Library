import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
//import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();
export const MyContext = createContext()
export const dbContext = createContext()
function App() {
  return (
    <MyContext.Provider value={app}>
      <dbContext.Provider value={database}>
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </dbContext.Provider>
    </MyContext.Provider>
  );
}

export default App;


