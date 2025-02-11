import image from "../../images/MediTrackerLogo.png";
import "../../styles/Home.css";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=3b3cf30a09ad45bf887dc95e9cf241a7")
      .then((response) => response.json())
      .then((data) => setNews(data.articles.slice(0, 5)))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <>
      <TopBar />
      <div className="news-container">
        <motion.h2 
          className="news-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Latest Medical News
        </motion.h2>
        <motion.div 
          className="news-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {news.map((article, index) => (
            <motion.div 
              key={index} 
              className="news-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img 
                src={article.urlToImage} 
                alt={article.title} 
                className="news-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
              />
              <div className="news-content" style={{ textAlign: "center", padding: "10px" }}>
                <h3 className="news-headline" style={{ fontSize: "16px", fontWeight: "bold" }}>{article.title}</h3>
                <p className="news-description" style={{ fontSize: "14px", color: "#555" }}>{article.description}</p>
                <motion.a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="news-link"
                  whileHover={{ scale: 1.1 }}
                  style={{ display: "inline-block", marginTop: "10px", fontSize: "14px", color: "#007bff" }}
                >
                  Read more
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;