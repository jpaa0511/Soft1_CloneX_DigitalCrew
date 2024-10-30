// src/Components/TweetList.js
import React from "react";

const TweetList = ({ tweets }) => {
  return (
    <div>
      {tweets.slice(0, 10).map((tweet, index) => (
        <div key={index} className="bg-dark p-3 rounded mb-4">
          <p>
            <strong>{tweet.username}</strong> · {tweet.date}
          </p>
          <p>{tweet.content}</p>
          <div className="d-flex justify-content-start">
            <span className="me-3">💬 {tweet.comments}</span>
            <span className="me-3">🔁 {tweet.retweets}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
