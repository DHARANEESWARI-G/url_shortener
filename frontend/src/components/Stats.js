import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Stats() {
    const { shortUrl } = useParams();
    const [urlData, setUrlData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/url/stats/${shortUrl}`);
                setUrlData(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch stats');
                setLoading(false);
            }
        };
        
        fetchStats();
    }, [shortUrl]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>URL Statistics</h1>
            <div className="stats">
                <p><strong>Original URL:</strong> <a href={urlData.fullUrl} target="_blank" rel="noopener noreferrer">{urlData.fullUrl}</a></p>
                <p><strong>Short URL:</strong> <a href={`http://localhost:5000/api/url/${urlData.shortUrl}`} target="_blank" rel="noopener noreferrer">{urlData.shortUrl}</a></p>
                <p><strong>Clicks:</strong> {urlData.clicks}</p>
                <p><strong>Created:</strong> {new Date(urlData.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default Stats;