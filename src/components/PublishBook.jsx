import { useState, useRef, useEffect } from 'react';
import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PublishBook = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const categories = useRef(null);
    const toastId = useRef(null);

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
    ]

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: "",
        file: null,
        price: "",
    });

    const [showCategory, setShowCategory] = useState(false);


    const handleShowCategory = () => {
        setShowCategory(!showCategory)
    };

    if (showCategory) {
        categories.current.scrollIntoView({ behaviour: 'smooth' })
    }

    const categoryStyle = {
        visibility: showCategory ? 'visible' : 'hidden'
    }

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

    const [showPrice, setShowPrice] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, id } = event.target;
        console.log(event.target)
        setFormData({
            ...formData,
            [name ? name : "genre"]: value ? value : id,
        });
        id && setShowCategory(!showCategory)
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            file: file,
        });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const publishBook = async (event) => {
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
            // Make a POST request to the server
        } catch(error) {
            // Handle error
        }
        console.log(formData);
    }

    const close = () => {
        navigate(-1);
    };

    return (
        <div className="publish">
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
            <div className="publish-preview">
                { formData.file ? (
                    <img src={URL.createObjectURL(formData.file)} alt="" />
                ) : (
                    <>
                        <img src={Books} alt="" />
                        <div className="preview-text">
                            <p>A preview of your book will show here</p>
                            <p>(It can be a picture or PDF)</p>
                        </div>
                        <button onClick={handleButtonClick} className="action">Click here to upload</button>
                    </>
                )}
            </div>

            <div className="bookfile">
                <input type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                    name="file"
                    required
                />
            </div>
        </div>
    )
}

export default PublishBook;