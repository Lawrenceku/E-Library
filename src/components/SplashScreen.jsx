import splash1 from '../images/splash1.svg';
import splash2 from '../images/splash2.svg';
import splash3 from '../images/splash3.svg';

const SplashScreen = ({ progress }) => {
    return (
        <div className="splash">
            <div className="logo-progress-container">
                <div className="logo">LOGO</div>
                <div className="progress">
                    <span style={{background: progress >= 1 && "blueviolet"}}></span>
                    <span style={{background: progress >= 2 && "blueviolet"}}></span>
                    <span style={{background: progress >= 3 && "blueviolet"}}></span>
                </div>
            </div>
            <img src={splash1} alt="" />
            <h1>Welcome to Toshokan!!!</h1>
            <p>Welcome to toshokan, your gateway to a world of literary wonders! We're thrilled to have you on board.</p>
        </div>
    )
};

export default SplashScreen;