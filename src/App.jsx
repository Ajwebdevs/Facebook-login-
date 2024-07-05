import React, { useState, useEffect } from 'react';
import FacebookLoginButton from './Facebookbtn';
import PageInsights from './catchinsight';
import './index.css'; 
import './App.css';


const App = () => {
    //get the user named state
    const [user, setUser] = useState(null);
    const [pages, setPages] = useState([]); // dont set to null //=> linter error caught 
    const [selectedPage, setSelectedPage] = useState(null);
    const [insights, setInsights] = useState(null);

    useEffect(() => {
        if (user && user.accessToken) {
            // Fetch the list of pages managed by the user
            fetchPages(); // call the func to fetch the pagesxc
        }
    }, [user]);

    const fetchPages = () => {
        //fethc the account 
        window.FB.api('/me/accounts', { access_token: user.accessToken }, (response) => {
            if (response && !response.error) {
                setPages(response.data);
            } else {
                console.error('Error in fetching the pages', response.error);
            }
        });
    };

    const handlePageChange = (e) => {
        //error try catch --> fixed in post
        const pageId = e.target.value;
        setSelectedPage(pageId);
        fetchPageInsights(pageId);
    };

    const fetchPageInsights = (pageId) => {
        const since = '2023-01-01'; // date is set to manul adjustment 
        const until = '2023-12-31';
        const metrics = 'page_fans,page_engaged_users,page_impressions,page_reactions';
        // meta for devs info //
        //https://developers.facebook.com/docs/graph-api/reference/v20.0/insights --> source
        window.FB.api(
            `/${pageId}/insights`,
            {
                access_token: user.accessToken,
                metric: metrics,
                since,
                until,
                period: 'day',
            },
            // error fixed ==> https://stackoverflow.com/questions/37163715/facebook-graph-api-object-insights-returning-no-data ref
            (response) => {
                if (response && !response.error) {
                    setInsights(response.data);
                } else {
                    console.error('Error fetching page insights', response.error);
                }
            }
        );
    };

    return (
        <div>
            <h1>Facebook Login using React</h1>
            {!user ? (
                <FacebookLoginButton setUser={setUser} />
            ) : (
                <div>
                    <div>
                        <img src={user.picture} alt="User profile" />
                        <h2>Welcome, {user.name}</h2>
                    </div>
                    <div>
                        <h3>Select a page to see insights</h3>
                        <select onChange={handlePageChange}>
                            <option className='buton' value="">Select a page : </option>
                            {pages.map((page) => (
                                <option key={page.id} value={page.id}>
                                    {page.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedPage && insights && <PageInsights insights={insights} />}
                </div>
            )}
        </div>
    );
};

export default App;
