import { useState, useRef, useContext } from 'react';
import { dbContext, storageContext, AuthContext} from '../App';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc } from "firebase/firestore"; 
import '../styles/publishbook.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { useNavigate } from 'react-router-dom';

const PublishBook = () => {
    const navigate = useNavigate();
    const db = useContext(dbContext);
    const storage = useContext(storageContext);
    const currentUser = useContext(AuthContext)
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const userId = currentUser.uid;
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            handleFileInputChange(acceptedFiles[0]);
        },
        multiple: false
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: "",
        file: null,
        price: "",
        userId: currentUser.uid, 
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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
        event.preventDefault();
        try {
            const storageRef = ref(storage, `books/${formData.file.name}`);
            await uploadBytes(storageRef, formData.file);
            const downloadURL = await getDownloadURL(storageRef);
            
            const docRef = await addDoc(collection(db, "books"), {
                ...formData,
                file: downloadURL // Store the download URL instead of the file itself
            });
            alert('done publishing')
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            alert("Error adding document: ", e)
            console.error("Error adding document: ", e);
        }
        console.log(formData);
    };

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
