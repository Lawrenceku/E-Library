import '../styles/signup.css';

const SignupForm = ({ setProgress }) => {

    const submit = (e) => {
        e.preventDefault();
        // Firebase backend logic
        setProgress(2);
    };


    return (
        <div className="signup-container">
            <div className="steps">Step 1 of 3</div>
            <h1>Create an account</h1>
            <a className='google' href="">Continue with Google</a>
            <p>OR</p>
            <form onSubmit={submit}>
                <input placeholder='First name' type="text" />
                <input placeholder='Last name' type="text" />
                <input placeholder='Password' type="password" name="" id="" />
                <input placeholder='Confirm password' type="password" name="" id="" />
                <input type="submit" value="Continue" />
                <p>Alredy have an account? <a href="">Sign in</a></p>
            </form>
        </div>
    )
};

export default SignupForm;