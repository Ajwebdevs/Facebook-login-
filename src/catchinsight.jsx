import React from 'react';

const PageInsights = ({ insights }) => {
    const getMetricValue = (metricName) => {
        const metric = insights.find((insight) => insight.name === metricName);
        return metric ? metric.values.reduce((acc, value) => acc + value.value, 0) : 0;
    };

    return (
        <div>
            <h3>Page Insights</h3>
            <div>
                <h4>Total Followers / Fans</h4>
                <p>{getMetricValue('page_fans')}</p>
            </div>
            <div>
                <h4>Total Engagement</h4>
                <p>{getMetricValue('page_engaged_users')}</p>
            </div>
            <div>
                <h4>Total Impressions</h4>
                <p>{getMetricValue('page_impressions')}</p>
            </div>
            <div>
                <h4>Total Reactions</h4>
                <p>{getMetricValue('page_reactions')}</p>
            </div>
        </div>
    );
};

export default PageInsights;
