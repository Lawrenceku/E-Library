import Toshokan from '../images/Toshokan.svg';
import ArrowDownIcon from '../images/arrow-right.svg';
import HomeIcon from '../images/home-2.svg';
import CollectionIcon from '../images/Frame.svg';
import PublishIcon from '../images/Book.svg';
import ClockIcon from '../images/clock.svg';
import SettingsIcon from '../images/setting-2.svg';
import AIIcon from '../images/ai.svg';
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
                    <a href="/">Home</a>
                </li>
                <li>
                    <img src={CollectionIcon} alt="" />
                    <a href="/">Collection</a>
                </li>
                <li>
                    <img src={PublishIcon} alt="" />
                    <a href="">Publish book</a>
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