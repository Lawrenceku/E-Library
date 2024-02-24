import Sidebar from './Sidebar';
import Header from './Header';
import Book from './Book';
import '../styles/dashboard.css';
import '../styles/explore.css';
import { Link } from 'react-router-dom';

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

const Books = [
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics",
        "description": "Lorem ipsum dolor"
    },
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics 2",
        "description": "Lorem ipsum dolor"
    },
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics 2",
        "description": "Lorem ipsum dolor"
    },
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics 2",
        "description": "Lorem ipsum dolor"
    },
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics 2",
        "description": "Lorem ipsum dolor"
    },
    {
        "image": "",
        "category": "Science",
        "users": "99+",
        "rating": 4,
        "title": "Engineering Mathematics 2",
        "description": "Lorem ipsum dolor"
    },
    
]

const communitiesList = [
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
    {
        "id": "",
        "name": "The Science Hub",
        "members": "212K"
    },
]

const Explore = () => {
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
                                {Books.map((book, idx) => (
                                    <Book
                                        key={idx}
                                        image={book.image}
                                        category={book.category}
                                        users={book.users}
                                        rating={book.rating}
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
