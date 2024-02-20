import '../styles/bookshelf.css';
import Book from './Book';

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


const Recommended = () => {
    return (
        <div className="bookshelf">
            <p className="title">Recommended</p>
            <div className="categories">
                <span>History</span>
                <span>History</span>
                <span>History</span>
                <span>+</span>
            </div>
            <div className="book-row">
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
    )
};

export default Recommended;