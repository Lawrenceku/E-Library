import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import '../styles/bookshelf.css';

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

const Book = ({ image, category, users, rating, title, description }) => {
    return (
        <div className="book">
            <div className="preview">
                {/* <img src={image} alt="book" /> */}
            </div>
            <div className="meta">
                <span className='category'>{category}</span>
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
    )
}

const Bookshelf = () => {
    return (
        <div className="bookshelf">
            <p className="title">My bookshelf</p>
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

export default Bookshelf;