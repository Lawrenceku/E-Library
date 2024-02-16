import '../styles/publishbook.css';
import Close from '../assets/close.svg';
import Add from '../assets/add.svg';
import Books from '../assets/books.svg';
import { useNavigate } from 'react-router-dom';

const PublishBook = () => {
    const navigate = useNavigate();

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
                    <form>
                        <label htmlFor="title">Title*</label>
                        <input type="text" placeholder='Book title' id="title" name="title" required />
                        
                        <label htmlFor="description">Add description*</label>
                        <textarea id="description" placeholder='Book description' rows="5" name="description" required></textarea>

                        <label htmlFor="genre">Genre*</label>
                        <input type="option" placeholder='Select genre' id="genre" name="genre" required />

                        <div className="label"><p>Collection</p><span>(optional)</span></div>
                        <p className="muted">To create a new collection click on <button className='action'>New collection</button></p>

                        <div className="collection">
                            <span>No collection yet. Click on new collection to create one.</span>
                        </div>

                        <div className="label"><p>Pricing</p><span>(optional)</span></div>
                        <button className='action'><img src={Add} alt="" />Add price</button>

                        <div className="button-group">
                            <button className="draft-button">Save to draft</button>
                            <button className="publish-button">Publish</button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="publish-preview">
                <img src={Books} alt="" />
                <div className="preview-text">
                    <p>A preview of your book will show here</p>
                    <p>(It can be a picture or PDF)</p>
                </div>
                <button className="action">Click here to upload</button>
            </div>
        </div>
    )
}

export default PublishBook;