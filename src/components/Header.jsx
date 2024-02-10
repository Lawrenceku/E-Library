import NotificationIcon from '../images/notification.svg';
import SearchIcon from '../images/search-normal.svg';
import { useEffect } from 'react';
import { getAuth} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    useEffect(() => {
        // Perform navigation when user is null
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Render nothing if user is null and navigation is in progress
    if (!user) {
        return null;
    }
  
    return (
        <header>
            <div className="hello">
                <p className='title'>Hello, {user?.displayName.split(" ")[0]?.charAt(0).toUpperCase() + user?.displayName.split(" ")[0]?.slice(1)}</p>
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
                    {user?.displayName[0].toUpperCase()}{user?.displayName.split(" ")[1]?.charAt(0).toUpperCase()}
                </div>
            </div>
        </header>
    )
};

export default Header;