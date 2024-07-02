import '../styles/topreads.css';

const readList = [
    {
        "rank": "01",
        "image": ""
    },
    {
        "rank": "02",
        "image": ""
    },
    {
        "rank": "03",
        "image": ""
    },
    {
        "rank": "04",
        "image": ""
    },
    {
        "rank": "05",
        "image": ""
    }
]

const Read = ({ rank, image }) => {
    return (
        <div className="read">
            <div className="rank">{rank}</div>
            <div className="read-container">

            </div>
        </div>
    )
}

const TopRead = () => {
    return (
        <div className="topread">
            <div className="top-read-row">
                {readList.map((read, idx) => (
                    <Read
                        key={idx}
                        rank={read.rank}
                        image={read.image}
                    />
                ))}
            </div>
        </div>
    )
};

export default TopRead;