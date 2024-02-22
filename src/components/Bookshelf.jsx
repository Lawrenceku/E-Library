import { useState, useEffect, useContext,CSSProperties  } from 'react';
import { dbContext } from '../App';
import { collection, getDocs } from "firebase/firestore"; 
import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import '../styles/bookshelf.css';
import ClipLoader from "react-spinners/ClipLoader";


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

const Bookshelf = () => {
    const db = useContext(dbContext);
    const [books, setBooks] = useState([]);
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "180E29",
        width:'80px',
        height:'80px'
      };
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#180E29");

    useEffect(() => {
        setLoading(true)
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'toshokanBooks'));
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
       <div className="bookshelf">
        <p className="title">My bookshelf</p>
        <div className="categories">
            <span>History</span>
            <span>Science</span>
            <span>Philosophy</span>
            <span>+</span>
        </div>
        <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <div className="book-row">
            {books.map((book) => (
                <Book
                  key={book.id}
                  genre={book.genre}
                  title={book.title}
                  description={book.description}

                />
            ))}
        </div>
    </div>
    );
};

export default Bookshelf;