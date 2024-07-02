import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import LoginForm from './LoginForm';
import { useEffect, useState,useContext } from 'react';
import '../styles/signup.css';


const Login = () => {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success == true) {
            navigate('/');
        }
    }, [success])

    return (
        <div className="signup">
            <div className="splash-signup-container">
                <SplashScreen />
                <LoginForm setSuccess={setSuccess} />
            </div>
        </div>
    )
};

export default Login;