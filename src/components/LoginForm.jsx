import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { MyContext } from '../App';
import { useRef, useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = ({ setSuccess }) => {
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const toastId = useRef(null)
    const app = useContext(MyContext)
    const auth = getAuth(app) 

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
            <a className='google' href=""><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</a>
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