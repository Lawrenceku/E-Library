const Book = ({ image, category, users, rating, title, description }) => {
    return (
        <div className="book">
            <div className="preview">
                {/* <img src={image} alt="book" /> */}
            </div>
            <div className="meta">
                <span className='category'>{category}</span>
                <div className="users-rating">
                    <span className='users'>{users}</span>
                    <span className="rating">⭐{rating}</span>
                </div>
            </div>
            <p className="title">{title}</p>
            <p className="description">{description}</p>
        </div>
    )
}

export default Book;