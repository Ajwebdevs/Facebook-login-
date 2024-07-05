import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageSelect = ({ user, setSelectedPage }) => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            const response = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${user.accessToken}`);
            setPages(response.data.data);
        };

        fetchPages();
    }, [user.accessToken]);

    return (
        <div>
            <select onChange={(e) => setSelectedPage(e.target.value)}>
                {pages.map((page) => (
                    <option key={page.id} value={page.id}>{page.name}</option>
                ))}
            </select>
        </div>
    );
};

export default PageSelect;
