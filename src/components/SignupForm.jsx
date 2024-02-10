import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { useEffect,useRef, useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { MyContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const provider = new GoogleAuthProvider();

const SignupForm = ({ setProgress }) => {
    const app = useContext(MyContext)
    const auth = getAuth(app) 
    const [firstName, setFirstName] = useState('')  
    const [lastName, setLastName] = useState('')  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const [confirmPassword, setConfirmPassword] = useState('')  
    const [validPassword, setvalidPassword] = useState('')
    const [iconUrl, setIconUrl] = useState('https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png')
    const toastId = useRef(null)
    const googleAuth = ()=>{
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    setProgress(2)
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


    const isStrongPassword=(pass) =>{
        // Check for lowercase, uppercase, digit, and special character
        const hasLowercase = /[a-z]/.test(pass);
        const hasUppercase = /[A-Z]/.test(pass);
        const hasDigit = /\d/.test(pass);
        const hasSpecialChar = /[@$#!%*?&]/.test(pass);
        if (pass.length === 0) {
            setPassword('');
            setIconUrl('https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png');
            return;
        }

        // Check strength
        if (pass.length > 8 && hasLowercase && hasUppercase && hasDigit && hasSpecialChar) {
            setvalidPassword(pass)
            if (confirmPassword === pass) {
                setPassword(pass);
                setvalidPassword(password)
                setIconUrl('https://png.monster/wp-content/uploads/2022/01/png.monster-457.png');
            } else {
                setPassword('');
                setIconUrl('https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png');
            }
        } else {
            setPassword('');
            setIconUrl('https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png');
        }
    };
        const isConfirmPassword=(event)=>{
            setConfirmPassword(event.target.value)
                if(confirmPassword === password){
                    setIconUrl('https://png.monster/wp-content/uploads/2022/01/png.monster-457.png');
                    setvalidPassword(password)
                }
                else {
                    setvalidPassword('');
                    setIconUrl('https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png');
                }
        }
      

    const submit = (e) => {
        toastId.current = toast.loading("Loading...")
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,validPassword)
         .then((userCredential) =>{
          //signed up
          toast.update(toastId.current, {
            render: "Successfully signed up",
            type: "success",
            isLoading: false,
            autoClose: 3000, //3 seconds
            hideProgressBar: false,
            closeOnClick: true,
        })
          setProgress(2);
          const user = userCredential.user
        /*   app.database().ref('users/' + user.uid).set({
            email: user.email,
            uid : user.uid,
            username: `${firstName} ${lastName}`
        }); */
         })
         .catch((error)=>{
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
    })
    }
  
       
    return (
        <div className="signup-container">
            <div className="toast-container"><ToastContainer ref={toastId} limit={2}/></div>
            <div className="steps">Step 1 of 3</div>
            <h1>Create an account</h1>
            <div onClick={googleAuth} className='google' ><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</div>
            <p>OR</p>
            <form onSubmit={submit}>
                <input onchange={(event)=>setFirstName(event.target.value)} placeholder='First name' type="text" />
                <input onchange={(event)=>setLastName(event.target.value)} placeholder='Last name' type="text" />
                <input onChange={(event)=>setEmail(event.target.value)} placeholder='Email address' type="email" />
                <input  onChange={(event)=>isStrongPassword(event.target.value)}  placeholder='Password' type="password" name="" id="" />
                <div className='password-container'>
                    <input onChange={isConfirmPassword} placeholder='Confirm password' type="password" name="" id="" />
                    <img  id='password-icon'  src={iconUrl} alt="" />
                </div>
                
                <input type="submit" value="Continue" />
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    )
};

export default SignupForm;