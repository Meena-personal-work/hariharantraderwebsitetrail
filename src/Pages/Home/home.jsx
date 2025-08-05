import React from "react";
import Counter from "../../Components/home-counter/counter";
import Highlights from "../../Components/home-highlights/highlights";
import YouTubePlayer from "../../Components/youtube-player/youtube-player";
import MarqueeItems from "../../Components/marquee/marquee";

import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <img className="home-banner" src="./crackers-website-banner3.jpg" alt="home banner"></img>
      <Counter />
      <Highlights />
      <MarqueeItems />
      <div className="video-section">
        <YouTubePlayer videoId="RM6NebcJh0E" />
        <YouTubePlayer videoId="3ExDiZ4T4ks" />
      </div>
    </div>
  );
};

export default Home;
