import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageInsights = ({ user, selectedPage }) => {
    const [insights, setInsights] = useState({});

    useEffect(() => {
        const fetchInsights = async () => {
            if (!selectedPage || !user.accessToken) return;
            try {
                const response = await axios.get(`https://graph.facebook.com/${selectedPage}/insights`, {
                    params: {
                        access_token: user.accessToken,
                        metric: 'page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_total',
                        since: '2024-01-01', 
                        until: '2024-07-01', 
                        period: 'total_over_range'
                    }
                });
                setInsights(response.data.data);
            } catch (error) {
                console.error('Error fetching insights:', error);
            }
        };

        fetchInsights();
    }, [selectedPage, user.accessToken]);

    return (
        <div>
            {insights.length > 0 ? (
                insights.map((insight) => (
                    <div key={insight.name}>
                        <h3>{insight.title}</h3>
                        <p>{insight.values[0].value}</p>
                    </div>
                ))
            ) : (
                <p>No insights available</p>
            )}
        </div>
    );
};

export default PageInsights;
