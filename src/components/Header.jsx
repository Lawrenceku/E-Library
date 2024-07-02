import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import NotificationIcon from '../assets/notification.svg';
import SearchIcon from '../assets/search-normal.svg';
import '../styles/header.css';

const Header = ({ title }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (!user) {
                navigate('/signup');
            }
        });

        return () => unsubscribe(); 
    }, [navigate]);

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
                <p className='title'>{title ? title : `Hello, ${firstName && capitalizeFirstLetter(firstName)}`}</p>
                <p className='sub-title'>What book are you reading today?</p>
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
