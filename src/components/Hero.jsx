//import RevenueIcon from '../assets/revenues.svg';
import '../styles/hero.css';
import Toshokan from '../assets/Toshokan.svg';

const Hero = () => {
    return (
        <div className="hero">
            <div>
                <p className="title">Welcome to Toshokan - Your Gateway to Endless Learning!</p>
                <p className="content">Dive into a world of knowledge and discover.  Explore curated collections tailored to your interests. Feed your curiosity, one page at a time</p>
            </div>
            <img className='img' src='https://i.pinimg.com/originals/66/e9/09/66e909cf0f6239f0d67f060484c7647b.png' alt="" />
        </div>
    )
};

export default Hero;