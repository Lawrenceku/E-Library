import { Link } from 'react-router-dom';
import Toshokan from '../assets/Toshokan.svg';
import ArrowDownIcon from '../assets/arrow-right.svg';
import HomeIcon from '../assets/home-2.svg';
import SearchIcon from '../assets/search-normal.svg';
import PublishIcon from '../assets/Book.svg';
import ClockIcon from '../assets/clock.svg';
import SettingsIcon from '../assets/setting-2.svg';
import AIIcon from '../assets/ai.svg';
import '../styles/sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="brand-role">
                <span className="brand">
                    <img src={Toshokan} alt="" />
                    <span>oshokan</span>
                </span>
                <div className="role">
                    <img src={ArrowDownIcon} alt="" />
                </div>
            </div>
            <ul className="links">
                <li className='active'>
                    <img src={HomeIcon} alt="" />
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <img src={SearchIcon} alt="" />
                    <Link to="/explore">Explore</Link>
                </li>
                <li>
                    <img src={PublishIcon} alt="" />
                    <Link to="/publish">Publish book</Link>
                </li>
            </ul>
            <p className='sub-header'>Quick action</p>
            <ul className="quick-action">
                <li>
                    <img src={ClockIcon} alt="" />
                    <a href="/">Reading history</a>
                </li>
                <li>
                    <img src={SettingsIcon} alt="" />
                    <a href="/">Settings</a>
                </li>
            </ul>
            <div className="ai">
                <div className="ai-icon">
                    <img src={AIIcon} alt="" />
                </div>
                <p className='title'>Personalised AI</p>
                <p className='content'>Lorem ipsum dolor sit amet consectetur. At sed tempus purus enim at.</p>
                <a href="/">Try for free</a>
            </div>
        </div>
    )
};

export default Sidebar;