import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/dashboard.css';
import '../styles/explore.css';
import { useState, useEffect, useContext,CSSProperties  } from 'react';
import { dbContext } from '../App';
import { collection, getDocs } from "firebase/firestore"; 
import UserIcon from '../assets/users.svg';
import StarIcon from '../assets/star.svg';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


const storiesList = [
    {
        "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADfCAMAAADcKv+WAAAApVBMVEV3sEIhLmZ6tEB5s0EeKWcbJWd7tj8gLGYcJ2cXHmgfK2YbJGdMcVpAYF5VflZhkVB0q0MZIWgiMGVxp0UQEmksQWRQdlcSFWk9Wl9GZlwmN2V1rUNllUtvpUdrn0ldilJahlI4VGEvRWMxSWJRelhqnUwqPWRKbllYg1Rgjk8rP2RTe1VjlE1CY14xSGIlNWUVGmg2T2FHaVo7V18NDGoAAGsJBWr6E2ajAAAS6ElEQVR4nO2dCXuyOhOGYQbC5gJSdxY3FKtWa3u+///TvoCWJIDaHq21PTzX9fZtNWJuE5LMZDJKUqVKlSpVqlSpUqVKlSpVqlTpvyJE9jP97XTJO9TmO4ReTKuOy/AIgDP/REl39kspYTYn9Ge9B4e/ibw+wRGZkrt171ezmwlW7QRxUycuusEQJVtyh7S5XAmHgQuSPcQApCCg3LYUyYGdQA5/FSlDfN1sB62AtKJNHXCtQFOeKzNS6010vzVvvUiBHG3N7crxJdJbwE/X+wviECcSjPdE8zyddtza0GySwPJrRmPY2xCpHQaK5MsumcxguDt1vz6kGOJ0BLDY0HsRVE+Sg1ErHIXPs84LgcZus3SB3osUEeJnMpr+qmHngEjqFHGJB0RSq0dbErf2/f6iWXsDiUSLyW4ZpIgoacFb/KsQMTR8AtK2Q6bhERGCba8BkSIRsvcoIu6b9Ldximgj7DfmryKkejUXnefWkLQp4r5O1DVC2/Al6A1mPVnavwJ2lFrNbASG5KrjCINd/zcNNqlG/X7DRlz6EkYehHS6iNKFQLifuRjRaRKai9oa3FDCdewjyt5va0UJAZI6p//w47/0cTz+eiiR/oV+I1kr/GXR/vv7GvGrwj9PWKlSpUqV/kuy3TOyD2uaU+V/psZfFey7xklZ5mDaHw15Suix8s7w5+r9BUFNl09L00zFssYhg4S6kj3bsn+y5p/WecSDFGey/DCY/iiiLJvOZnhoyD+LKMvqxE0Z/zCirAzshPEvI8rKy59HlK3EI/zrETWTScsjamqAvx5Ra08zTeay4ygCpzKGX49orQkwSW6zpygcoqb7vx+xKS5IEfyxyjGqC/hriInzqc535PkfRJSk4YDdj5ruknJEpBbJLXxx9CLplW7p1ruICLHFCjheGSKAv45X8cjzmemFnE6g5J5Gevu7UTOOV414GfkAeTPu2xAln0NUG0VEcDsvimOpluUo83oopQt2f9nMtCzaXC73tHcMoAhWvblpOZalqhYdy+dvs+g2jXkZEVqsgL7PI+Jwoagfc6imKc48ThjdrpPpaZm/KnR22bPdDiSAo6mj8lMUvZTqTEe3iJj4BOLEzAoomxwieAOukdO6Oa/UKCFvrJiyz29dYZu7JP2cSHPumHJRpjNfX79j8jVEPYcII6NYNbpglzB02AOtPGHAZqJ0ObEoucoRcle7emvvE4ht1n+UvoAohUZhmZeUeqUv4wZiJ9dTocEQnWQb0ym5SFag0AdujyhxFPqCR9xG/NqHr1YMsGfXVXKbrPCSNZrWokO2cYaQXqxzJeNFRAy4z9gaCYjzE/1Lk4fosYprA/GSvp59apTeFdeIqkNHZ+EhK7huzLk8LwoFIh5RPtRUMxVTEzusNUJ4ZfxiT8WY66cRqXFLRGuwaSyby06vxQ1iye36nYgY8J+oMhQQEz5VHbyMX58VlYdUegANVktlw1eSMHizTbjVk6bEUrq0ARjG3AziXBfXcwER/GeuM5pTYY2aPKLXgiEQIvkdgdGR0GUdXNvyiC7rwmqHRKwR6cKCvbHH3ke9blQ9jZh+mnGLJ7IaKCKag4BgsU5JBxRK8hfGUda81DoD9pes8xUjnYxdeb3qZhQQ9ZC58/3Aizet3LxuSyKi4rM3FxazVoy4ZM3Ij6nQy66gjAkwEs0UauZn3cLcXuV2F61+mfk16PpJzbl11L1o9cvqSrjH5qyrqjOQkB9vWRe02V3m0FGJG22ctdAhn+XWUdpVN2POd8NJzktL1qRiK7ripVht9QVIYu0zgyJkjZ2sALlC2tzlGW2mawi/4oEzRjkPnNITFpC4Zj1Tr9NWjLgxNeup3JCcPAgzbs5QWsmQeqKiJ3T5Nv08orNPgIRBZCRe32deOyUJSwa22maz/5AZLga1o7DJr940S9+HPoESK6pTrlp0kfHTiNahyXhEJxdVBAMREbkB6KOncoOQ9pw85ObeR7f0wWIU2STXPtSMLNNudCtE7WM1LHTUQLwWaYuItFlZ2ePsD/3s9Wq6+IQF7wBL30ujmK3pbO3ylGXrfbnYk/41oqqFx3tJGG5y28SEdcwDIjCrUZsfyuA2q6txGCeHg9KVrqk62ji0s/HnOxE101IWw9L9xdx0VUDkByAnvWm4W898PQxW6CsnDBZZsfSNDzdG1ESZdOFvvsQ2N3GfcTIWECWpxdsUktBPs8qhO7FOACSWx+Lg3LgV4nYgaP5SbzR94b7/GiIssqsfxlTC+qmZvRqluGWdsvs167CzeSNENbcMJ8Xh+4ut6LOeatGeilG2BFc23KRKLYuJ6J7ilDhKboZYbvVfgwjMak4netaqlniMB0kQ93TDUkpaUx/jAyPyU6OMnOst7wlIyoIUxf0Xy9HzmA6tl1U+Me4uHy/4ZkTJ5ioacU4StdQjk3j7/eV+YgnGZ2r3N8q1Ckouc19EbmrUF5wT44xDhpqpUUd0z9J3whO6SPjtiNzUSPtm5nozX84a8pSywQ8+6uWV6M8hShKzItUwez4bJVw/k3g1CDhE65oY+29H5AZReZs1qP6xqVVz9KPy/lLOH1BY8D8WohSU+LqVt+OkyDlyRDeduPqzHrujwmtxCZpNirhmvqpWDnHJnlKu8WzcAbGR83EJk6LLRhVrJjAS5sbSBtf4p74fkVqz+ZWJzrZiYMo8AzrvnoImt331do0j9Q6IeQe6MCny3ipZr0nwcSqrwX0uTnjFrXgPRN6hmsrkj60K4RLqth9GQ/SbtWeOvGSx92CIEs5zmzoN/skmv/emKVayO27p/CtS199jI/K+0hRDeB0szu2gUqm9qwjv04qRMKYquSpDrzDkCoTTqwDvg5ibGguDB+xLgxkOMt6uJLwTYiz01EIQBmk+l0NqqhxfHbJB7wQlk1GIkCmW72XldTPvgZurH885wkyGEXe76SXxCYiNiZWzhJMgngFz/f17YbjpZ9pcXgpigxXv5xBhwZ5aCVfyuVGzfL1JLf59W6am/fHjS0OxmtJNDpvj1/ZAhPKFep64Et+K5uREtanB70ajWr/39va2WTQi/+QOziMKVtxu9+xMy2D2Af6yI8o4nHMhC78q58glpY1BG0Yac2FGyTh0rrP/JqFXX8xGzeayM+DmpWRSRK/G9gd/x+m5cuFypyeRpYLDUEtC/nC1y/ygT78j+Lpc2CxZl6XuU+TC/Iy/h5gQ/WlEJzWj/jKiegjY+8OI6uTA82cRNefteJL17yAuHbamSayGzD2BnNvxdyOu9YMjhk6NynzjsfMI2DA+vPx69zcjUhTb9wNvvQ58WzQ9hr8u/cE5fXIPsFKl36fMMD7fxZn9/IAG9HnniL2OF/36uN6vjTz7dHiqHYWdPS3X6+87tCB5KMsT14vahxaCvYjgr14VR9U/fFTyW+wWKZNiY5maaYdyCrXZzPHKfyBfDzZ22bwo2Isk2ORjqBTL6vu5BiJR3VHzu12K6vSCh2nJEws4HC6ckphGTXcWQ6F99kZ56KNiLB4lQ3Q5IgTzfPDth9Rn1j5oT09vgVgv9mMwliLC+mRYKm0fxftgHL6cC6BV2o/hCypDhLV6KiY1kfbhQyf9nP2Se9W1O3U3UgkiBrlIzXzVtUOUNhftmfhk6QI/yRzFv9a4atP8VipBhLZwFEulA6Yuxvrph2jzDStnKv1m4Lt+EPZ07tHJz8IdVESEGt/9rHYcua7vrQb8+JMeg7AZtjb3ySH2ASGYKGK5n1YR0efb0IgPGRAQpBmzqmXllYgRVU0uYsIe5ILQf1gFROATeSgRF8/CB3s4AfIRvMIGLrDYFrP9iK3In7ixQr4RCHfqWl0BH/onnhKxHT3bCX6AeSOPCDPu/Fhu0Lf5U2jCOXN1xW+RQ71XP6r3AHtfBUQuOYKTizbmQq+0gXDaUVNCwpV9rM2uPCIX6qe85iqIMcvW8Y7CSVfNGK8fdSc5h8if77MKE7cdMUnoCWFIitXqh8Ewf0juAZRD5OOOreJ9JIS64yC36lEsZTBueG4hyenPKo/IBR61LlQUR4VosjRtjNLur4cPRJlHZJEA5sulQKIT0WSaqTj6+EZBLDdQ/l7kul39ch3fnBMmiaZYg8aDOKpyiEM2oOqf+ZacjnXSsNSsdvQQDXka8VOpJiCoO+qpuEBFWT4C45WtKCHxOxNDLTskl0aYP0BfzU/93My/+WQTAARxfeJYerHPmteFWd9G+eGGnfS/PKJyVwH0w8Wr7Oi54cda/XxXzU8aXD6xknkRzyw+EYjd3M8Fzwa1ph4PkZ05KVnd4JjlMy29yyhmtBE67APkM893VG5fvHhu1lez5C07/8TBRQSf82wcz9f/qPKIfFq4gqXBpfxpgRdnEjGQO0P4CN6b/IjKr60L9iJbwCp10tlZR+1y0wuf/egBEWF/8niU4I+KCXcUMOcdQI9DfLiOmjjgNB6EK8klBdR0mzMXNUUMhOCN5ccbboR0VLKmjjJGsF84102f8Mlycit2wpwj2uDhJo00DyV/zm2fxLAkX0kWDjj0ZFeDS9GRJE5mkTy8U+cz5sp365I3XDXrs9GosR/wZpOaeID5NIiyNW2SNDQbSNDj/a0/P9qU7mm8CItNRU1ObPBLFm17+Cy4vKuy4mw3q3gU7yf81qsy/flGLN18cwendxe5pkFfzF2jq6qlisd01Ef4EroyRAy25xid+CPbQ3jhKKDzAIvwE7vE6J/cB5c1h80kEJ9ybKS6QVbcW6h8rx+l3qnjb1uPqzd4rZMbyopy/UG5m+hUyC0sn0uSF+lqXwzYwGFfKYVUrHE+fuWnhKtsqWm981toKI3ausp9zYWmW/KmGE0D/mJrCe6bJLGa3LtRovFbyF8zic8gBp2p4jgJveOo201YHiIGklebmtahYJpJvb8sCbP6QZ3JV0MncvoRLMMwbAaFlH5iOXSjJi0XLj3/Efc1zuuz6Xo+n9enUqVKlSpVqlSpUqXSOJjC9hk+iHn3b4SjTdFLhLVcbhVc1r9hBX2nKCNcPhUjX/1dzokLtffbNyMG9fvsaeBczj8EnV0uKxJ0ut/QU1+6l5Mv3UKUJ78bCtttodDNEVHqWc59EDEwclkGMermk/feHhHc193UuA+iBGNDHFugv8sn770xIoLf0Y1Z9HQnRIx3ol96KE+Ox/ozR8RZRN5fkfddlDozsDnv7t4C4t0LUbItPvUircBTcnOCFKzX3tFZliISoT506kSSNIjrJcUOjyW/s9OJ6XProBC1iGE9tgHxfoi0Y/IRJjB2bAntWmvnOIYzSWuRILrzBh/h/VonK1kCf0wL7dS6ixK6PctwDOPlGMAH3pQ+5+xatWGO5Hi8436IuBZCDlz1jYAn7/qe7wdhu9uTUkTiOny+LXgek847LI3nES22N+QAAmUbB74/2h6z1PW78xH926vvtqWJue+IKIH2zL1x3F2TtTPwk36JCI3u9IgoJLeFNkXsBrta0iBIlsYEB700xh3stpWEPvS6q/R0NJJI1v0SlrsiznZsmQHtrWQrz1nfIqPunpxAdMb74+YL2TjjyUda4+ipA9B4yjZm0LfaJW97T0Q6NWYLNoyMBakb3MoK6t2AlCNaWevj2jGytS5MxuBaXDAKxGXfbHNPRAle5I+pETqGbxvCEtV1+icQDbZEGO7YCSioz2n/Fu6/VklqwLsiYpitFkF7IWFXMD7gzTx1L7J4BOyyCFXYD+BViFKEvlNMQ3JXRMnVP76/Zv3UID0xEye9rYJZKeITqzc+sV1f6A9sS0jLCblP7fCSuyJC/SMgo29JOJkI70yrsjyByBUSEaNdY8h9T5rtdYvpTu+LiF738I0ew2SUGOTW5f5T/EXE+doyFZ3XjyMm40G64AiTd80jul9HbO46oaiSA0j3RYRaal2QN5lI2BZjfug8FxYRn8+3YrcJl74x5N6t6HcTAN9IvqvwTfwKZhw9RYURFVtn78VgJ5qcWBKfcW9E0h4kGWCTtoSGaC/CxpASROH4iW2cRRy2hDBUDNvFr7a5NyJdmnpIJpPk0/ZzVr/2RqdAsE1uHsDwPCLUFf4KZCz8eXzJnRElW92TqJumYoQX3eUWcLWnZoKI82fW27CtnkWkRieXHB+Dsm/XvjsivCm4Vz+SR7AxFSJrCom9eByRUpHVdnIWkU6uJrMu4LXkROf9EZEOgtv6oZ0oUf1gqyO1HGU/NYnRdyYH+wNhtGteQgyc+TFCCnHTLQvpuzuiJA3mWcZ16DzNR8nZ7WC/GyQjUOLYgPipvU7O0ni99xU5v7pJMqroesdNTt6Ek/fSkL77I8L+nU0W4E3fnwZz/d2pJfmFYPFP8jMcvBvzufO/iQewnZLaP1x9/2Geg8NYA269+y4/b5/eJ83SkD5c/3M5if03CiGIa4vOUvAtIXqrxaIRfHIvAuyws6iNPlv8B4QlWebxa7ncyi5RqVKlSpUqVapUqVKlSpUqVfqv6f9zn4UXLmt1uwAAAABJRU5ErkJggg==",
        "name": "Literature"
    },
    {
        "img": "",
        "name": "Biochemistry"
    },
    {
        "img": "",
        "name": "Science"
    },
    {
        "img": "",
        "name": "Anatomy"
    },
    {
        "img": "",
        "name": "Software"
    },
    {
        "img": "",
        "name": "Engineering"
    }
]

const Book = ({ genre, title, description, imageURL}) => {
    const users = '99+';
    const rating = 4;
    return (
        <div className="book">
        <div className="preview">
            <img src={imageURL} alt="" />
        </div>
        <div className="meta">
            <span className='category'>{genre}</span>
            <div className="users-rating">
                <span className='users'>
                    <img src={UserIcon} alt="" />
                    {users}
                </span>
                <span className="rating">
                    <img src={StarIcon} alt="" />
                    {rating}
                </span>
            </div>
        </div>
        <p className="title">{title}</p>
        <p className="description">{description}</p>
    </div>
   );
};

const communitiesList = [
    {
        "id": "",
        "name": "The Science Hub",
        "members": "0"
    },
    {
        "id": "",
        "name": "The Philosophers",
        "members": "0"
    },
    {
        "id": "",
        "name": "Mathematics Geek",
        "members": "0"
    },
    {
        "id": "",
        "name": "Business Book Bunch",
        "members": "0"
    },
    {
        "id": "",
        "name": "Electrical Engineering Enclave",
        "members": "0"
    },
    {
        "id": "",
        "name": "Calculus Collective",
        "members": "0"
    },
    {
        "id": "",
        "name": "Physics Pharaohs",
        "members": "0"
    },
    {
        "id": "",
        "name": "The Accountants",
        "members": "0"
    },
    {
        "id": "",
        "name": "Social Science Society",
        "members": "0"
    },
    {
        "id": "",
        "name": "Computer Engineers",
        "members": "0"
    },
    {
        "id": "",
        "name": "Business Enthusiasts",
        "members": "0"
    },
]

const Explore = () => {
    const db = useContext(dbContext);
    const [books, setBooks] = useState([]);
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "180E29",
      };
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#180E29");

    useEffect(() => {
        setLoading(true)
        const fetchBooks = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'usersBooks'));
                const fetchedBooks = [];
                querySnapshot.forEach((doc) => {
                    fetchedBooks.push({ id: doc.id, ...doc.data() });
                });
                 setLoading(false)
                await setBooks(fetchedBooks);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();
    }, [db]);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <Header title={"Explore"} />
                <div className="explore">
                    <p className="header-title" style={{marginTop: '0'}}>Stories</p>
                    <div className="stories-container">
                        {
                            storiesList.map((story, idx) => (
                                <div key={idx} className="story">
                                    <div className="img"></div>
                                    <span>{story.name}</span>
                                </div>
                            ))
                        }
                        
                        
                    </div>
                    <div className="book-community-container">
                        <div className="book-container">
                            <p className="header-title">Books</p>
                            <div className="categories">
                                <span className='active'>All</span>
                                <span>Science</span>
                                <span>Philosophy</span>
                                <span>+</span>
                            </div>
                            <div className="books">
                            <ClipLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={70}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                                {books.map((book, idx) => (
                                <Book
                                key={book.id}
                                genre={book.genre}
                                title={book.title}
                                description={book.description}
                                imageURL = {book.imageURL}
                                />
                                ))}
                            </div>
                        </div>
                        <div className="communities">
                            <div className="header-title">Communities</div>
                            <div className="communities-list">
                                {
                                    communitiesList.map((community, idx) => (
                                        <div key={idx} className="community">
                                            <div className="meta-info">
                                                <div className="img"></div>
                                                <div className="meta">
                                                    <div className="name">{community.name}</div>
                                                    <div className="members">{community.members} members</div>
                                                </div>
                                            </div>
                                            
                                            <Link to={community.id} className='join'>Join</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Explore;
