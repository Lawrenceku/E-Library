import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { MyContext } from '../App';
import { useRef, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import show from '../assets/eye.svg'
import hide from '../assets/eye-slash.svg'


const provider = new GoogleAuthProvider();

const LoginForm = ({ setSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toastId = useRef(null);
    const app = useContext(MyContext);
    const auth = getAuth(app);
    const [passwordIcon, setPasswordIcon] = useState(show)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true)
    const signUpBtn = useRef(null)

    auth.languageCode = 'it';

    useEffect(()=>{
        if (!email || !password || email =='' || password == '' || email== ' ' || password ==' '){
            setBtnDisabled(true)
        }
        else{
            setBtnDisabled(false)
        }
    },[email,password])
    const googleAuth = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setSuccess(true);
                // Update user's display name if available
                if (user.displayName) {
                    // Perform necessary action with user's display name
                    console.log("User's display name:", user.displayName);
                }
            })
            .catch((error) => {
                // Handle error
                console.error('Google sign-in error:', error);
                setSuccess(false);
            });
    };

    const submit = (e) => {
        toastId.current = toast.loading('Loading...');
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.update(toastId.current, {
                    render: 'Login Successful',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
                setSuccess(true);
                const user = userCredential.user;
                // Update user's display name if available
                if (user.displayName) {
                    // Perform necessary action with user's display name
                    console.log("User's display name:", user.displayName);
                }
            })
            .catch((error) => {
                setSuccess(false);
                const errorMessage = error.message;
                toast.update(toastId.current, {
                    render: errorMessage,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                });
            });
    };
    const togglePasswordVisibility = ()=>{
        setPasswordVisible(!passwordVisible)
        passwordVisible? setPasswordIcon(show): setPasswordIcon(hide)
    }
    return (
        <div className="signup-container">
            <div className="toast-container"><ToastContainer ref={toastId} limit={2} /></div>
            <h1>Login to Toshokan</h1>
            <div onClick={googleAuth} className='google' ><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</div>
            <p>OR</p>
            <form onSubmit={submit}>
                <input onChange={(event) => setEmail(event.target.value)} placeholder='Email' type="email" />
                <div className='password-container'>
                    <input type={passwordVisible? 'text': 'password'} onChange={(event) => setPassword(event.target.value)} placeholder='Password' name="" id="" />
                    <img className='password-icon' onClick={togglePasswordVisibility} style={{cursor: 'pointer'}} src={passwordIcon} alt="" />
                </div>
                <input disabled={btnDisabled} style={btnDisabled ? { cursor: 'not-allowed', backgroundColor:'gray'} : {cursor: 'pointer' }}  ref={signUpBtn} type="submit" value="Login" />
                <p>Don't have an account? <Link to='/signup'>Create one</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
