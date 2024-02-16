import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import LoginForm from './LoginForm';
import { useEffect, useState } from 'react';
import '../styles/signup.css';


const Login = () => {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success === true) {
            navigate('/dashboard');
        }
    }, [success, navigate])

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