
import { useState, useEffect, useRef, useContext } from 'react';
import { dbContext, storageContext, AuthContext} from '../App';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc,doc, updateDoc} from "firebase/firestore"; 
import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import { getDocument } from 'pdfjs-dist/legacy/build/pdf';



import 'react-toastify/dist/ReactToastify.css';


const PublishBook = () => {
 const navigate = useNavigate();
    const db = useContext(dbContext);
    const storage = useContext(storageContext);
    const fileInputRef = useRef(null);

    const [currentUser, setCurrentUser] = useState();
    const [file, setFile] = useState(null);
    const categories = useRef(null);
    const toastId = useRef(null);
    const [showCategory, setShowCategory] = useState(false);
    const [price, setPrice] = useState()
    const [thumbnailURL, setThumbnailURL] = useState(null);
    const [showPrice, setShowPrice] = useState(false);

  const categoryStyle = {
        visibility: showCategory ? 'visible' : 'hidden'
    };


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
        price: price? price: '0',
        userId: currentUser ? currentUser.uid : "",
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                
            } else {
                toast.error("Please upload a PDF file");
            }
        },
        multiple: false,
        accept: ".pdf" // Restrict to only accept PDF files
    });
    

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    
        // Clean up function to unsubscribe when component unmounts
        return () => unsubscribe();
    }, [navigate, currentUser]);

    const handleInputChange = (event) => {
        const { name, value, id } = event.target;
        setFormData({
            ...formData,
            [name ? name : "genre"]: value ? value : id,
        });
        id && setShowCategory(!showCategory)
    };

    

    const publishBook = async (event) => {
        event.preventDefault();
    
        if (!formData.genre || !file) {
            toast.error(!formData.genre ? "Please select a book genre" : "Please upload a file");
            return;
        }
    
        try {
            const docRef = await addDoc(collection(db, "usersBooks"), {
                ...formData
                // Placeholder for the file URL, you need to replace this with the actual URL after upload
            });
    
            // Upload file to storage
            const storageRef = ref(storage, `/usersBooks/${docRef.id}`);
            await uploadBytes(storageRef, file);
    
            // Get download URL after file upload
            const downloadURL = await getDownloadURL(storageRef);
    
            // Update the Firestore document with the download URL
            await updateDoc(doc(collection(db, "usersBooks"), docRef.id), {
                fileURL: downloadURL
            });
    
            setFormData({
                title: "",
                description: "",
                genre: "",
                price: "0",
                userId: currentUser ? currentUser.uid : "",
            });
            setFile(null);
            toast.success('Uploaded successfully');
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
            toast.error(error.message);
        }
    };
    
    

    const close = () => {
        navigate(-1);
    };

    const handleShowCategory = () => {
        setShowCategory(!showCategory);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = async (files) => {
        if (files && files.length > 0) {
            const selectedFile = files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                
                // Generate thumbnail
                const thumbnailURL = await generateThumbnail(selectedFile);
                setThumbnailURL(thumbnailURL);
            } else {
                toast.error("Please upload a PDF file");
            }
        } else {
            // Handle case where no files are selected
            toast.error("Please select a file");
        }
    };  
    
    const generateThumbnail = async (pdfFile) => {
        // const pdfjs = await import('pdfjs-dist/es5/build/pdf.js');
        // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        // const loadingTask = pdfjs.getDocument(pdfFile);
        // const pdf = await loadingTask.promise;

        // const page = await pdf.getPage(1);
        // const viewport = page.getViewport({ scale: 1 });
        // const canvas = document.createElement('canvas');
        // const context = canvas.getContext('2d');
        // canvas.height = viewport.height;
        // canvas.width = viewport.width;
        // const renderContext = {
        //     canvasContext: context,
        //     viewport: viewport
        // };

        // await page.render(renderContext);
        // const thumbnailURL = canvas.toDataURL('image/jpeg');
        // return thumbnailURL;
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
                            style={{resize: 'none'}}
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
            <div className="publish-preview" {...getRootProps()} onClick={(e)=>e.stopPropagation()}>
                 {file ? (
                    <img src='https://img.freepik.com/premium-vector/pdf-icon-flat-style-document-text-vector-illustration-white-isolated-background-archive-business-concept_157943-463.jpg?size=626&ext=jpg' alt="" />
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