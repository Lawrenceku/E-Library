import '../styles/signup.css';

const Interests = ({ setProgress }) => {

    const submit = (e) => {
        e.preventDefault();
        // Firebase backend logic
        setProgress(3);
    };

    return (
        <div className="interests">
            <p>Step 2 of 3</p>
            <h1>Books of interest</h1>
            <p>Select as many books that you might be interested in. You can still add more interests later.</p>
            <form onSubmit={submit}>
                <input type="submit" value="Continue" />
            </form>
        </div>
    )
};

export default Interests;