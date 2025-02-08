import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/News.css"; // Make sure your CSS is up to date
import myImage from "../Pics/undefined.png"; // You can use this as a fallback image
import TopBar from "./TopBar";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://news-api14.p.rapidapi.com/v2/trendings?topic=health&language=en",
          {
            headers: {
              "x-rapidapi-host": "news-api14.p.rapidapi.com",
              "x-rapidapi-key": "95b193bd28msh6971b2a7b2a67fcp103c30jsn3f8defe1cbc5", // Replace with your own API key
            },
          }
        );
        setNewsData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <TopBar/>
    <div className="news-container">
      <h1>Healthcare News</h1>
      <div className="news-items">
        {newsData.map((item, index) => (
          <div key={index} className="news-item">
            <img
              src={item.thumbnail || myImage} // Fallback image if the thumbnail is missing
              alt={item.title}
              className="news-thumbnail"
            />
            <div className="news-content">
              <h3 style={{color:"black"}}>{item.title}</h3>
              <p>{item.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </> 
  );
};

export default News;
