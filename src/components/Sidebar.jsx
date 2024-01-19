import '../styles/sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="brand-role">
                <span className="brand">LOGO</span>
                <div className="role">O</div>
            </div>
            <ul className="links">
                <li>
                    <a href="/" className='active'>Home</a>
                </li>
                <li>
                    <a href="/">Collection</a>
                </li>
                <li>
                    <a href="">Settings</a>
                </li>
            </ul>
            <p className='sub-header'>Quick action</p>
            <ul className="quick-action">
                <li>
                    <a href="/">Publish book</a>
                </li>
                <li>
                    <a href="/">Reading history</a>
                </li>
            </ul>
            <div className="ai">
                <p className='title'>Personalised AI</p>
                <p className='content'>Lorem ipsum dolor sit amet consectetur. At sed tempus purus enim at.</p>
                <a href="/">Try for free</a>
            </div>
        </div>
    )
};

export default Sidebar;