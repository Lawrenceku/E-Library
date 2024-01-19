import '../styles/header.css';

const Header = () => {
    return (
        <header>
            <div className="hello">
                <p className='title'>Hello, Delight</p>
                <p className='sub-title'>What book are you reading today.</p>
            </div>

            <div className="actions">
                <div className="search">
                    <span>Q</span>
                    <input type="search" name="" id="" />
                </div>
                <div className="notification"></div>
                <div className="user"></div>
            </div>
        </header>
    )
};

export default Header;