import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

function Home() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch existing URLs on component mount
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/url/urls");
        console.log("API Response:", res.data); // Debug log
        setUrls(res.data);
        setError("");
      } catch (err) {
        console.error("Full error:", err);
        setError("Failed to load URL history. Server may be down.");
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/url/shorten", {
        fullUrl,
      });
      const newShortUrl = `http://localhost:5000/api/url/${res.data.shortUrl}`;
      setShortUrl(newShortUrl);
      setUrls([res.data, ...urls]); // Add new URL to beginning of list
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to shorten URL");
      console.error("Shorten error:", err);
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>

      {/* URL Shortening Form */}
      <form onSubmit={handleSubmit} className="shorten-form">
        <input
          type="url"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
          className="url-input"
        />
        <button type="submit" className="shorten-button">
          Shorten
        </button>
      </form>

      {/* Error Display */}
      {error && <p className="error-message">{error}</p>}

      {/* Newly Created Short URL */}
      {shortUrl && (
        <div className="result-box">
          <p>
            <strong>Short URL:</strong>{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <p>
            <a
              href={`/stats/${shortUrl.split("/").pop()}`}
              className="stats-link"
            >
              View Stats
            </a>
          </p>
        </div>
      )}

      {/* Existing URLs List */}
      <div className="urls-list">
        <h2>Your Short URLs</h2>
        {loading ? (
          <p>Loading URLs...</p>
        ) : urls.length > 0 ? (
          <table className="urls-table">
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a
                      href={url.fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.fullUrl.length > 40
                        ? `${url.fullUrl.substring(0, 40)}...`
                        : url.fullUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`http://localhost:5000/api/url/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{url.clicks}</td>
                  <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                  <td>
                    <a href={`/stats/${url.shortUrl}`} className="stats-link">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No URLs have been shortened yet</p>
        )}
      </div>
    </div>
  );
}

export default Home;
