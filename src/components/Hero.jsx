import RevenueIcon from '../assets/revenues.svg';
import '../styles/hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div>
                <p className="title">Publish and earn at the same time</p>
                <p className="content">Lorem ipsum dolor sit amet consectetur. Gravida mauris at tempor amet augue. Fames nisl integer ut amet nunc tincidunt</p>
            </div>
            <img src={RevenueIcon} alt="" />
        </div>
    )
};

export default Hero;