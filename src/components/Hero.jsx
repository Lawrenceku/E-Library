//import RevenueIcon from '../assets/revenues.svg';
import '../styles/hero.css';
import mascot from '../assets/mascot.png'
import Toshokan from '../assets/Toshokan.svg';

const Hero = () => {
    return (
        <div className="hero">
            <div>
                <p className="title">Welcome to Toshokan - Your Gateway to Endless Learning!</p>
                <p className="content">Dive into a world of knowledge and discover.  Explore curated collections tailored to your interests. Feed your curiosity, one page at a time</p>
            </div>
            <img className='img' src={mascot} alt="" />
        </div>
    )
};

export default Hero;