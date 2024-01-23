import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { useEffect,useRef, useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth"
import { MyContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const SignupForm = ({ setProgress }) => {
    const app = useContext(MyContext)
    const auth = getAuth(app) 
    const [firstName, setFirstName] = useState('')  
    const [lastName, setLastName] = useState('')  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')  
    const toastId = useRef(null)


    const isStrongPassword=(pass) =>{
        // Check for lowercase, uppercase, digit, and special character
        const hasLowercase = /[a-z]/.test(pass);
        const hasUppercase = /[A-Z]/.test(pass);
        const hasDigit = /\d/.test(pass);
        const hasSpecialChar = /[@$#!%*?&]/.test(pass);
                
        // Check strength
        if (pass.length > 8 && hasLowercase && hasUppercase && hasDigit && hasSpecialChar){
              setPassword(pass)
          }
          else{
            setPassword(' ')
          }
      }
      

    const submit = (e) => {
        toastId.current = toast.loading("Loading...")
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
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
            <a className='google' href=""><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</a>
            <p>OR</p>
            <form onSubmit={submit}>
                <input onchange={(event)=>setFirstName(event.target.value)} placeholder='First name' type="text" />
                <input onchange={(event)=>setLastName(event.target.value)} placeholder='Last name' type="text" />
                <input onChange={(event)=>setEmail(event.target.value)} placeholder='Email address' type="email" />
                <input  onChange={(event)=>isStrongPassword(event.target.value)}  placeholder='Password' type="password" name="" id="" />
                <input placeholder='Confirm password' type="password" name="" id="" />
                <input type="submit" value="Continue" />
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    )
};

export default SignupForm;