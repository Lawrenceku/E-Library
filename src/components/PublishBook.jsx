
import { useState, useEffect, useRef, useContext } from 'react';
import { dbContext, AuthContext} from '../App';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc } from "firebase/firestore"; 
import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const PublishBook = () => {
    const navigate = useNavigate();
    const db = useContext(dbContext);
    const fileInputRef = useRef(null);

    const [currentUser, setCurrentUser] = useState();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const categories = useRef(null);
    const toastId = useRef(null);
    const [showCategory, setShowCategory] = useState(false);
    const [showPrice, setShowPrice] = useState(false);

    const genres = [
        'Science',
        'Mathematics',
        'Arts',
        'Finance',
        'Economics',
        'Accounting',
        'Engineering',
        'Tourism',
        'Taxation',
        'Fiction',
        'Novel',
    ];

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: '',
        file: null,
        price: "",
        userId: currentUser ? currentUser.uid : "",
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            handleFileInputChange(acceptedFiles[0]);
        },
        multiple: false
    });

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (!currentUser) {
                return null
            }
        });

        return () => unsubscribe();
    }, [navigate, currentUser]);

    useEffect(() => {
        if (showCategory) {
            categories.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showCategory]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (categories.current && !categories.current.contains(event.target)) {
                setShowCategory(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowCategory = () => {
        setShowCategory(!showCategory);
    };

    const categoryStyle = {
        visibility: showCategory ? 'visible' : 'hidden'
    }

    const handleInputChange = (event) => {
        const { name, value, id } = event.target;
        setFormData({
            ...formData,
            [name ? name : "genre"]: value ? value : id,
        });
        id && setShowCategory(!showCategory)
    };

    const handleFileInputChange = (file) => {
        setFormData({
            ...formData,
            file: file,
        });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const publishBook = async (event) => {
        toastId.current = toast.loading('Loading...');

        event.preventDefault();
        toastId.current = toast.loading("Loading...");
        if (!formData.genre || !formData.file) {
            if (!formData.genre) {
                var msg = "Please select a book genre"
            } else if (!formData.file) {
                var msg = "Please upload a file"
            }
            toast.update(toastId.current, {
                render: msg,
                type: "error",
                isLoading: false,
                autoClose: 3000, //3 seconds
                hideProgressBar: false,
                closeOnClick: true,
            });
            return;
        }
        try {
            toast.update(toastId.current, {
                render: 'Uploaded Successfully',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            const docRef = await addDoc(collection(db, "books"), {
                ...formData
            });
            
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            
            console.error("Error adding document: ", e);
            const errorMessage = e.message;
            toast.update(toastId.current, {
                render: errorMessage,
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        console.log(formData);

    };

    const close = () => {
        navigate(-1);
    };

    if (!currentUser) {
        return null;
    }


    return (
        <div className="publish">

            <div className="toast-container"><ToastContainer ref={toastId} limit={2} /></div>
            <div className="toast-container"><ToastContainer ref={toastId} limit={2}/></div>
            <div className="publish-book">
                <span className='close' onClick={close}>
                    <img src={Close} alt="close" />
                </span>
                <div className="form-container">
                    <h1>Publish book</h1>
                    <p className="muted">Please fill in every field required (*)</p>
                    <form onSubmit={publishBook}>
                        <label htmlFor="title">Title*</label>
                        <input
                            type="text"
                            placeholder='Book title'
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        
                        <label htmlFor="description">Add description*</label>
                        <textarea
                            placeholder='Book description'
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required>
                        </textarea>

                        <label htmlFor="genre">Genre*</label>
                        <div ref={categories} className="select-interests">
                            <div className='categories' style={categoryStyle}>
                                {
                                    genres.map(genre => (
                                        <span onClick={handleInputChange} name="genre" id={genre}>{genre}</span>
                                    ))
                                }
                            </div>
                            <div className='select-category' tabIndex="1" onClick={handleShowCategory}>
                                <div className='selected'>
                                    <span>{formData.genre !== "" ? formData.genre : "Select a genre"}</span>
                                    <svg height="20" viewBox="0 0 1792 1792" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                                </div>
                            </div>
                            </div>
                        {/* <input
                            type="option"
                            placeholder='Select genre'
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            required
                        /> */}

                        <div className="label"><p>Collection</p><span>(optional)</span></div>
                        <p className="muted">To create a new collection click on <button className='action'>New collection</button></p>

                        <div className="collection">
                            <span>No collection yet. Click on new collection to create one.</span>
                        </div>

                        <div className="label"><p>Pricing</p><span>(optional)</span></div>


                        {showPrice ? (
                            <input
                                type="number"
                                placeholder='Enter price in NGN'
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <button onClick={()=>{setShowPrice(true)}} className='action'><img src={Add} alt="" />Add price</button>
                        )}

                        <div className="button-group">
                            <button className="draft-button">Save to draft</button>
                            <input type='submit' value='Publish' className="publish-button" />
                        </div>

                    </form>
                </div>
            </div>
            <div className="publish-preview" {...getRootProps()}>
                {formData.file ? (
                    <img src={URL.createObjectURL(formData.file)} alt="" />
                ) : (
                    <>
                        <img src={Books} alt="" />
                        <div className="preview-text">
                            <p>A preview of your book will show here</p>
                            <p>(It can be a picture or PDF)</p>
                        </div>
                        <button onClick={handleButtonClick} className="action">Drop a file here to upload or Click here to browse</button>
                    </>
                )}
                <input {...getInputProps()} type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => handleFileInputChange(e.target.files[0])} name="file" required />
            </div>
        </div>
    );
};

export default PublishBook