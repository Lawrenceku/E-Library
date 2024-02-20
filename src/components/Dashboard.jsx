import Hero from './Hero';
import Sidebar from './Sidebar';
import Header from './Header';
import Bookshelf from './Bookshelf';
import TopRead from './TopRead';
import Recommended from './Recommended';
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <Header />
                <Hero />
                <Bookshelf />
                <TopRead />
                <Recommended />
            </div>
        </div>
    )
};

export default Dashboard;