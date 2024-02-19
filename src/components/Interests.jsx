import { useRef, useState, useEffect } from 'react';
import '../styles/signup.css';
import '../styles/interests.css';

const Interests = ({ setProgress }) => {

    const [showInterests, setShowInterests] = useState(false);
    const [selected, setSelected] = useState([])

    const interestsList = [
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
    ]


    const handleShowInterests = () => {
        setShowInterests(!showInterests)
    };

    const handleSetInterest = (interest) => {
        const index = selected.indexOf(interest);
        if (index !== -1) {
            // Interest is already selected, remove it from the list
            const updatedSelected = [...selected];
            updatedSelected.splice(index, 1);
            setSelected(updatedSelected);
        } else {
            // Interest is not selected, add it to the list
            setSelected([...selected, interest]);
        }        
    }

    const categories = useRef(null)
    if (showInterests) {
        categories.current.scrollIntoView({ behaviour: 'smooth' })
    }

    const interestStyle = {
        visibility: showInterests ? 'visible' : 'hidden'
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (categories.current && !categories.current.contains(event.target)) {
            setShowInterests(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        // Firebase backend logic
        console.log(selected)
        setProgress(3);
    };

    return (
        <div className="interests">
            <p>Step 2 of 3</p>
            <h1>Books of interest</h1>
            <p>Select as many books that you might be interested in. You can still add more interests later.</p>

            <div ref={categories} className="select-interests">
                <div className='categories' style={interestStyle}>
                    {
                        interestsList.map(interest => (
                            <span className='interest' onClick={()=>{handleSetInterest(interest)}}>
                                <span className='name'>{interest}</span>
                                <span className={selected.includes(interest) ? "checkbox checked" : "checkbox unchecked"}></span>
                            </span>
                        ))
                    }
                </div>
                <div className='select-category' tabIndex="1" onClick={handleShowInterests}>
                    <div className='selected'>
                        <span>Choose interests</span>
                        <svg height="20" viewBox="0 0 1792 1792" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"/></svg>
                    </div>
                </div>
            </div>
                    
            
            <form onSubmit={submit}>
                <input type="submit" value="Continue" />
            </form>
        </div>
    )
};

export default Interests;