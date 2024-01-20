import { Link } from 'react-router-dom';
import '../styles/signup.css';

const LoginForm = ({ setSuccess }) => {

    const submit = (e) => {
        e.preventDefault();
        // Firebase backend logic
        setSuccess(true);
    };


    return (
        <div className="signup-container">
            <h1>Login to Toshokan</h1>
            <a className='google' href="">Continue with Google</a>
            <p>OR</p>
            <form onSubmit={submit}>
                <input placeholder='Email' type="email" />
                <input placeholder='Password' type="password" name="" id="" />
                <input type="submit" value="Login" />
                <p>Don't have an account? <Link to='/'>Create one</Link></p>
            </form>
        </div>
    )
};

export default LoginForm;