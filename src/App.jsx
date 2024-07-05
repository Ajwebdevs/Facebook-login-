// importing the user state to check adn updatre
import React, { useState } from "react";
//loading other imports
import Facebookbtn from "./Facebookbtn";
import UserProfile from "./UserProfile";
import PageInsights from "./catchinsight";
import PageSelect from "./pager";
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [selectedPage, setSelectedPage] = useState(null);

    return (
        <div className="App">
            {!user ? (
                <Facebookbtn setUser={setUser} />
            ) : (
                <>
                    <UserProfile user={user} />
                    <PageSelect user={user} setSelectedPage={setSelectedPage} />
                    {selectedPage && <PageInsights user={user} selectedPage={selectedPage} />}
                </>
            )}
        </div>
    );
};

export default App;
