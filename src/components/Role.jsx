import '../styles/signup.css';

const Role = ({ setProgress }) => {

    const submit = (e) => {
        e.preventDefault();
        // Firebase backend logic
        setProgress(4);
    };

    return (
        <div className="role">
            <p>Step 3 of 3</p>
            <h1>Sign me up as?</h1>
            <p>You can always change this later</p>
            <form onSubmit={submit}>
                <input type="submit" value="Get started" />
                <input className="skip" type="submit" value="Skip" />
            </form>
        </div>
    )
};

export default Role;