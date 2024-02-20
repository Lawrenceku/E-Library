import Sidebar from './Sidebar';
import Book from './Book';
import '../styles/dashboard.css';
import '../styles/community.css';
import { useState } from 'react';

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

const Community = () => {

    const [joined, setJoined] = useState(false)

    const handleJoinCommunity = () => {
        setJoined(prev => !prev)
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <div className="community">
                    <div className="header-img-container"></div>
                    <div className="info-container">
                        <div className="community-image-container">
                            <div className="community-image">
                                <span>DA</span>
                            </div>
                        </div>
                        
                        <div className="info">
                            <div className="name-members">
                                <p className="name">Mathematics Enthusiasts</p>
                                <div className="members">51K members</div>
                            </div>
                            <button onClick={handleJoinCommunity} className={joined ? "joined" : "join"}>{joined ? "Joined" : "Join Community"}</button>
                        </div>
                    </div>
                
                <p className="header-title">Published Books</p>
                <div className="book-container">
                    {
                        Books.map((book, idx) => (
                            <Book
                                key={idx}
                                image={book.image}
                                category={book.category}
                                users={book.users}
                                rating={book.rating}
                                title={book.title}
                                description={book.description}
                            />
                        ))
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default Community;