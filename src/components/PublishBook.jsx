import { useState, useRef } from 'react';
import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { useNavigate } from 'react-router-dom';

const PublishBook = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: "",
        file: null,
        price: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
                        <input
                            type="option"
                            placeholder='Select genre'
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            required
                        />

                        <div className="label"><p>Collection</p><span>(optional)</span></div>
                        <p className="muted">To create a new collection click on <button className='action'>New collection</button></p>

                        <div className="collection">
                            <span>No collection yet. Click on new collection to create one.</span>
                        </div>

                        <div className="label"><p>Pricing</p><span>(optional)</span></div>
                        <button className='action'><img src={Add} alt="" />Add price</button>

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