import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/dashboard.css';
import '../styles/explore.css';
import { useState, useEffect, useContext,CSSProperties  } from 'react';
import { dbContext } from '../App';
import { collection, getDocs } from "firebase/firestore"; 
import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


const storiesList = [
    {
        "img": "",
        "name": "Literature"
    },
    {
        "img": "",
        "name": "Biochemistry"
    },
    {
        "img": "",
        "name": "Science"
    },
    {
        "img": "",
        "name": "Anatomy"
    },
    {
        "img": "",
        "name": "Software"
    },
    {
        "img": "",
        "name": "Engineering"
    }
]

const Book = ({ genre, title, description }) => {
    const users = '99+';
    const rating = 4;
    return (
        <div className="book">
        <div className="preview">
            {/* <img src={image} alt="book" /> */}
        </div>
        <div className="meta">
            <span className='category'>{genre}</span>
            <div className="users-rating">
                <span className='users'>
                    <img src={UserIcon} alt="" />
                    {users}
                </span>
                <span className="rating">
                    <img src={StarIcon} alt="" />
                    {rating}
                </span>
            </div>
        </div>
        <p className="title">{title}</p>
        <p className="description">{description}</p>
    </div>
   );
};

const communitiesList = [
    {
        "id": "",
        "name": "The Science Hub",
        "members": "0"
    },
    {
        "id": "",
        "name": "The Philosophers",
        "members": "0"
    },
    {
        "id": "",
        "name": "Mathematics Geek",
        "members": "0"
    },
    {
        "id": "",
        "name": "Business Book Bunch",
        "members": "0"
    },
    {
        "id": "",
        "name": "Electrical Engineering Enclave",
        "members": "0"
    },
    {
        "id": "",
        "name": "Calculus Collective",
        "members": "0"
    },
    {
        "id": "",
        "name": "Physics Pharaohs",
        "members": "0"
    },
    {
        "id": "",
        "name": "The Accountants",
        "members": "0"
    },
    {
        "id": "",
        "name": "Social Science Society",
        "members": "0"
    },
    {
        "id": "",
        "name": "Computer Engineers",
        "members": "0"
    },
    {
        "id": "",
        "name": "Business Enthusiasts",
        "members": "0"
    },
]

const Explore = () => {
    const db = useContext(dbContext);
    const [books, setBooks] = useState([]);
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "180E29",
      };
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#180E29");

    useEffect(() => {
        setLoading(true)
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'usersBooks'));
                const fetchedBooks = [];
                querySnapshot.forEach((doc) => {
                    fetchedBooks.push({ id: doc.id, ...doc.data() });
                });
                 setLoading(false)
                await setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();
    }, [db]);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <Header title={"Explore"} />
                <div className="explore">
                    <p className="header-title" style={{marginTop: '0'}}>Stories</p>
                    <div className="stories-container">
                        {
                            storiesList.map((story, idx) => (
                                <div key={idx} className="story">
                                    <div className="img"></div>
                                    <span>{story.name}</span>
                                </div>
                            ))
                        }
                        
                        
                    </div>
                    <div className="book-community-container">
                        <div className="book-container">
                            <p className="header-title">Books</p>
                            <div className="categories">
                                <span className='active'>All</span>
                                <span>Science</span>
                                <span>Philosophy</span>
                                <span>+</span>
                            </div>
                            <div className="books">
                                {books.map((book, idx) => (
                                <Book
                                key={book.id}
                                genre={book.genre}
                                title={book.title}
                                description={book.description}

                                />
                                ))}
                            </div>
                        </div>
                        <div className="communities">
                            <div className="header-title">Communities</div>
                            <div className="communities-list">
                                {
                                    communitiesList.map((community, idx) => (
                                        <div key={idx} className="community">
                                            <div className="meta-info">
                                                <div className="img"></div>
                                                <div className="meta">
                                                    <div className="name">{community.name}</div>
                                                    <div className="members">{community.members} members</div>
                                                </div>
                                            </div>
                                            
                                            <Link to={community.id} className='join'>Join</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Explore;
