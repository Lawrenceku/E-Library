import Hero from './Hero';
import Sidebar from './Sidebar';
import Header from './Header';
import Bookshelf from './Bookshelf';
import TopRead from './TopRead';
import Recommended from './Recommended';
import { useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [navState, setNavState] = useState('Recommended');
    
    const handleNavChange = (nav) => {
        setNavState(nav);
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <Header />
                <Hero />
                <nav id='tab-nav'>
                    <button onClick={() => handleNavChange('Recommended')}>
                        For You
                        {navState == 'Recommended' && <span className='line'></span>}
                    </button>
                    <button onClick={() => handleNavChange('TopRead')}>
                        Top Reads
                        {navState == 'TopRead' && <span className='line'></span>}
                    </button>
                    <button onClick={() => handleNavChange('Bookshelf')}>
                        Bookshelf
                        {navState == 'Bookshelf' && <span className='line'></span>}
                    </button>
                </nav>
                {navState == 'Recommended' && <Recommended />}
                {navState == 'TopRead' && <TopRead />}
                {navState == 'Bookshelf' && <Bookshelf />}
            </div>
        </div>
    );
};

export default Dashboard;
