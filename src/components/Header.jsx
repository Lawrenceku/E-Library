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

    // Function to capitalize the first letter of a word
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    // Extract first name and initial of last name from user's displayName
    const displayNameParts = user.displayName?.split(" ");
    const firstName = displayNameParts?.[0];
    const lastNameInitial = displayNameParts?.[1]?.charAt(0);

    return (
        <header>
            <div className="hello">
                <p className='title'>Hello, {firstName && capitalizeFirstLetter(firstName)}</p>
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
                    {firstName && firstName.charAt(0).toUpperCase()}
                    {lastNameInitial && lastNameInitial.toUpperCase()}
                </div>
            </div>
        </header>
    );
};

export default Header;
