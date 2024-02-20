import Sidebar from './Sidebar';
import '../styles/dashboard.css';
import '../styles/bookdetail.css';

const BookDetail = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <div className="book-detail">
                    <button className="back"><span>{"<"}</span><span>Back</span></button>
                    <div className="title">Engineering Mathematics</div>
                    <div className="author-date-row">
                        <p className="author">By Olusheye OroOluwa</p>
                        <p className="date">Published: 31-01-24</p>
                    </div>
                    
                    <div className="book-thumbnail"></div>

                    <p className="header-title">Description</p>
                    <p className="content">Content</p>

                    <p className="header-title">Genre</p>
                    <p className="content">Engineering</p>
                </div>
            </div>
        </div>
    )
};

export default BookDetail;