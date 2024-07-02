import { useState, useEffect, useContext,CSSProperties  } from 'react';
import { dbContext } from '../App';
import { collection, getDocs } from "firebase/firestore"; 
import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import '../styles/bookshelf.css';
import ClipLoader from "react-spinners/ClipLoader";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

const Book = ({ genre, title, description, fileURL, imageURL }) => {
    const [pagesNumber, setPagesNumber] = useState(null);
    const [firstPage, setFirstPage] = useState(1);
    const users = '99+';
    const rating = 4;
    console.log(fileURL)
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

const Bookshelf = () => {
    const db = useContext(dbContext);
    const [books, setBooks] = useState([]);
    const [firstPage, setFirstPage] = useState(1);
    const [file, setFile] = useState(null)
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "180E29",
      };
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#180E29");
    
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
        ).toString();
    
        useEffect(() => {
            setLoading(true);
            const fetchBooks = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'usersBooks'));
                    const fetchedBooks = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setBooks(fetchedBooks);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching books: ', error);
                }
            };
        
            fetchBooks();
        }, [db]);

        

    return (
       <div className="bookshelf">
        <div className="categories">
            <span>All</span>
            <span>Science</span>
            <span>Engineering</span>
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
        <div className="book-row">
            {books.map((book) => (
                <Book
                  key={book.id}
                  genre={book.genre}
                  title={book.title}
                  fileURL = {book.fileURL}
                  imageURL={book.imageURL}
                  description={book.description}

                />
            ))}
        </div>
    </div>
    );
};

export default Bookshelf;