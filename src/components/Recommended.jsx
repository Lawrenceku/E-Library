import { useState, useEffect, useContext,CSSProperties  } from 'react';
import { dbContext } from '../App';
import { collection, getDocs } from "firebase/firestore"; 
import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import '../styles/bookshelf.css';
import ClipLoader from "react-spinners/ClipLoader";


const Book = ({ genre, title, description, imageURL }) => {
    const users = '99+';
    const rating = 4;
    return (
        <div style={{cursor:'pointer'}} className="book">
        <div className="preview">
        <img src={imageURL} alt="" />
        </div>
        <div className="meta">
            <div className='texts'>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
            </div>
            <div className='data'>
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
        </div>
    </div>
   );
};

const Recommended = () => {
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
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
                {/* <p className='error-message'>Oops... we ran into an error while loading your books</p> */}
        <div className='row-container'>
        <div className="book-row">
            {books.map((book) => (
                <Book
                  key={book.id}
                  genre={book.genre}
                  title={book.title}
                  imageURL={book.imageURL}
                  description={book.description}

                />
            ))}
        </div>
        </div>
    </div>
    );
};

export default Recommended;