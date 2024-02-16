import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import SignupForm from './SignupForm';
import Interests from './Interests';
import Role from './Role';
import '../styles/signup.css';
// import { MyContext } from '../App';

const Signup = () => {
    // const app = useContext(MyContext)
    const navigate = useNavigate();
    const [progress, setProgress] = useState(1)

    useEffect(()=>{
        if (progress > 3) {
            navigate('/');
        }
    }, [progress, navigate])

    return (
        <div className="signup">
            <div className="splash-signup-container">
                <SplashScreen progress={progress} />
                {
                    progress === 1 ?
                    <SignupForm setProgress={setProgress} />
                    : progress === 2 ?
                    <Interests setProgress={setProgress} />
                    :
                    <Role />
                }
            </div>
        </div>
    )
}

export default Signup;