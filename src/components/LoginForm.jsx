import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { MyContext } from '../App';
import { useRef, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';

const provider = new GoogleAuthProvider();

const LoginForm = ({ setSuccess }) => {
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const toastId = useRef(null)
    const app = useContext(MyContext)
    const auth = getAuth(app) 
    auth.languageCode = 'it'
    
    const googleAuth = ()=>{
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    setSuccess(true);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }

    const submit = (e) => {
        toastId.current = toast.loading("Loading...")
        e.preventDefault();
        // Firebase backend logic
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
        //done signing in
        toast.update(toastId.current, {
            render: "Login Successful",
            type: "success",
            isLoading: false,
            autoClose: 3000, //3 seconds
            hideProgressBar: false,
            closeOnClick: true,
        })
        setSuccess(true);
        const user = userCredential.user
        
        })
        .catch ((error)=>{
        setSuccess(false);
        const errorCode = error.code;
        const errorMessage = error.message; 
        toast.update(toastId.current, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 3000, //3 seconds
            hideProgressBar: false,
            closeOnClick: true,
        })
        }
        )
        
    };


    return (
        <div className="signup-container">
            <div className="toast-container"><ToastContainer ref={toastId} limit={2}/></div>
            <h1>Login to Toshokan</h1>
            <div onClick={googleAuth} className='google' ><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</div>
            <p>OR</p>
            <form onSubmit={submit}>
                <input onChange={(event)=>setEmail(event.target.value)} placeholder='Email' type="email" />
                <input onChange={(event)=>{setPassword(event.target.value)}} placeholder='Password' type="password" name="" id="" />
                <input type="submit" value="Login" />
                <p>Don't have an account? <Link to='/'>Create one</Link></p>
            </form>
        </div>
    )
};

export default LoginForm;