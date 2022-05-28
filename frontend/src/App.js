import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tweet } from 'react-twitter-widgets';

function App() {

  const [IDs, setIDs] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await axios.get("http://localhost:8000/users/{Pitbull}/tweets");
      const tweetIDs = response.data.map((tweet) => {
        const id = tweet.id_str;
        return id;
      });
      setIDs(tweetIDs);
    };
    fetchTweets();
  }, []);

  return (
    <div className="tweets">
      {
        IDs.map((id, key) => {
          return (
            <Tweet tweetId={id} key={key} />
          )
        })
      }
    </div>
  );
}

export default App;
