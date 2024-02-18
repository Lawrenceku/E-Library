import { useState, useRef, useEffect } from 'react';
import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { useNavigate } from 'react-router-dom';

const PublishBook = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const categories = useRef(null)

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
        if (!formData.genre || !formData.file) return;
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
                                <span onClick={handleInputChange} name="genre" id="tourist attraction">Tourist Attraction</span>
                                <span onClick={handleInputChange} name="genre" id="airport">Airport</span>
                                <span onClick={handleInputChange} name="genre" id="amusement park">Amusement Park</span>
                                <span onClick={handleInputChange} name="genre" id="art gallery">Art Gallery</span>
                                <span onClick={handleInputChange} name="genre" id="bank">Bank</span>
                                <span onClick={handleInputChange} name="genre" id="bar">Bar</span>
                                <span onClick={handleInputChange} name="genre" id="beauty salon">Salon</span>
                                <span onClick={handleInputChange} name="genre" id="store">Store</span>
                                <span onClick={handleInputChange} name="genre" id="cafe">Cafe</span>
                                <span onClick={handleInputChange} name="genre" id="casino">Casino</span>
                                <span onClick={handleInputChange} name="genre" id="church">Church</span>
                                <span onClick={handleInputChange} name="genre" id="gym">Gym</span>
                                <span onClick={handleInputChange} name="genre" id="hospital">Hospital</span>
                                <span onClick={handleInputChange} name="genre" id="library">Library</span>
                                <span onClick={handleInputChange} name="genre" id="mosque">Mosque</span>
                                <span onClick={handleInputChange} name="genre" id="movie">Movie</span>
                                <span onClick={handleInputChange} name="genre" id="museum">Museum</span>
                                <span onClick={handleInputChange} name="genre" id="night club">Night Club</span>
                                <span onClick={handleInputChange} name="genre" id="pharmacy">Pharmacy</span>
                                <span onClick={handleInputChange} name="genre" id="school">School</span>
                                <span onClick={handleInputChange} name="genre" id="restaurant">Restaurant</span>
                                <span onClick={handleInputChange} name="genre" id="shopping mall">Shopping Mall</span>
                                <span onClick={handleInputChange} name="genre" id="stadium">Stadium</span>
                                <span onClick={handleInputChange} name="genre" id="spa">Spa</span>
                                <span onClick={handleInputChange} name="genre" id="university">university</span>
                                <span onClick={handleInputChange} name="genre" id="zoo">Zoo</span>
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