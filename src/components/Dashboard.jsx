import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Welcome to your Dashboard</h1>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
};

export default Dashboard;