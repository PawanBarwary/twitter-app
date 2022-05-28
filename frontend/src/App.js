import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tweet, Timeline } from 'react-twitter-widgets';


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
    <div className='app'>
      <header>
        <img src={require('./assets/twitter-logo.png')} id='logo' />
        <h1>Tweet <strong>Finder</strong></h1>
      </header>
      <main>
        <div className="tweets">
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'kanyewest'
            }}
          />
        </div>
        <form>
          <label for="user-name"> Enter twitter username:</label>
          <input type="text" id="user-name" name="user-name" />
          <button> Submit </button>
        </form>
      </main>
    </div>
  );
}

export default App;
