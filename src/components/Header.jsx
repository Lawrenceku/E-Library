import NotificationIcon from '../assets/notification.svg';
import SearchIcon from '../assets/search-normal.svg';
import '../styles/header.css';

const Header = () => {
    return (
        <header>
            <div className="hello">
                <p className='title'>Hello, Delight</p>
                <p className='sub-title'>What book are you reading today.</p>
            </div>

            <div className="actions">
                <div className="search">
                    <img src={SearchIcon} alt="" />
                    <input type="search" name="" id="" />
                </div>
                <div className="notification">
                    <img src={NotificationIcon} alt="" />
                </div>
                <div className="user">
                    DA
                </div>
            </div>
        </header>
    )
};

export default Header;