import { useEffect, useState } from 'react';
import Toshokan from '../images/Toshokan.svg';
import splash1 from '../images/splash1.svg';
import splash2 from '../images/splash2.svg';
import splash3 from '../images/splash3.svg';

const SplashScreen = ({ progress }) => {
    const images = [splash1, splash2, splash3];
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [imageIndex, images.length]);
    return (
        <div className="splash">
            <div className="logo-progress-container">
                <div className='logo'>
                    <img src={Toshokan} alt="" />
                    <span style={{fontSize: '25px', marginLeft: '3px'}}>oshokan</span>
                </div>
                {
                    progress && (
                        <div className="progress">
                            <span style={{background: progress >= 1 && "blueviolet"}}></span>
                            <span style={{background: progress >= 2 && "blueviolet"}}></span>
                            <span style={{background: progress >= 3 && "blueviolet"}}></span>
                        </div>
                    )
                }
            </div>
            <div className="image-container">
                <img src={images[imageIndex]} alt="" />
            </div>
            <h1>{progress ? "Welcome" : "Login"} to Toshokan!!!</h1>
            <p>Welcome to toshokan, your gateway to a world of literary wonders! We're thrilled to have you on board.</p>
        </div>
    )
};

export default SplashScreen;