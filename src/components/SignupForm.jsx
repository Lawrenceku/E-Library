import { Link } from 'react-router-dom';
import '../styles/signup.css';
import { useEffect, useRef, useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, updateProfile ,GoogleAuthProvider } from "firebase/auth";
import { MyContext, dbContext } from '../App';
import {ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const provider = new GoogleAuthProvider();

const SignupForm = ({ setProgress }) => {
    const app = useContext(MyContext);
    const db = useContext(dbContext)
    const auth = getAuth(app);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [uid, setUid] = useState('')
    const check = "https://png.monster/wp-content/uploads/2022/01/png.monster-457.png";
    const fail = "https://t3.ftcdn.net/jpg/05/38/50/02/360_F_538500243_CgDMCSwiAbFS1agn7yveGBy3qOeEStOT.png";
    const [iconUrl, setIconUrl] = useState('');
    const toastId = useRef(null);

    const googleAuth = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUid(user.uid)
            // IdP data available using getAdditionalUserInfo(result)
            setProgress(2);
            
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

    const isStrongPassword = (pass) => {
        // Check for lowercase, uppercase, digit, and special character
        const hasLowercase = /[a-z]/.test(pass);
        const hasUppercase = /[A-Z]/.test(pass);
        const hasDigit = /\d/.test(pass);
        const hasSpecialChar = /[@$#!%*?&]/.test(pass);

        // Check strength
        if (pass.length > 8 && hasLowercase && hasUppercase && hasDigit && hasSpecialChar) {
            setPassword(pass);
        }
    };

    useEffect(() => {
        if (password === confirmPassword) {
            setIconUrl(check)
            setValidPassword(password)
        } else {
            setIconUrl(fail)
            setValidPassword(null)
        }
    }, [password, confirmPassword]);


    const submit = (e) => {
        toastId.current = toast.loading("Loading...");
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, validPassword)
        .then((userCredential) =>{
            //signed up
            toast.update(toastId.current, {
                render: "Successfully signed up",
                type: "success",
                isLoading: false,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
            });
           setProgress(2);
            const user = userCredential.user;
            setUid(user.uid)
            updateProfile(auth.currentUser, {
                displayName: firstName + ' ' + lastName
            })

            writeUserData(uid,firstName, lastName)
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
            });
        })
    }
    function writeUserData(userId,firstName, lastName) {
        set(ref(db, 'users/' + userId), {
          firstName: firstName,
          lastName: lastName
          
        })
        .then(() => {
            console.log('successful db')
          })
          .catch((error) => {
            console.log('write failked')
          });
      }
       
    return (
        <div className="signup-container">
            <div className="toast-container"><ToastContainer ref={toastId} limit={2}/></div>
            <div className="steps">Step 1 of 3</div>
            <h1>Create an account</h1>
            <div onClick={googleAuth} className='google' ><img id='google-logo' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />Continue with Google</div>
            <p>OR</p>
            <form onSubmit={submit}>
                <input required onChange={(event) => setFirstName(event.target.value)} placeholder='First name' type="text" />
                <input required onChange={(event) => setLastName(event.target.value)} placeholder='Last name' type="text" />
                <input required onChange={(event) => setEmail(event.target.value)} placeholder='Email address' type="email" />
                <input required onChange={(event) => isStrongPassword(event.target.value)} placeholder='Password' type="password" name="" id="" />
                <div className='password-container'>
                    <input required onChange={(event)=>setConfirmPassword(event.target.value)  } placeholder='Confirm password' type="password" name="" id="" />
                    <img  id='password-icon'  src={iconUrl} alt="" />
                </div>
                
                <input type="submit" value="Continue" />
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </form>
        </div>
    )
}

export default SignupForm;
