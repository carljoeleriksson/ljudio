import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';
import Player from '../components/Player';
import PlayerContextProvider from '../contexts/PlayerContext';

function Home() {
  const [searchResult, setSearchResult] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('search');

  async function fetchSearchResult(e) {
    e.preventDefault();
    console.log('searchType: ' + searchType);

    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        searchType: searchType,
        keyWord: searchTerm,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data) {
      setSearchResult(data.content);
    } else {
      console.log('Failed to fetch. Got no data from backend.');
    }
  }

  return (
  <PlayerContextProvider>
      <SearchBar
        onChange={(e) => {
          

          if (e.target.type == 'text') {
            setSearchTerm(e.target.value);
          } else {
            setSearchType(e.target.value);
          }
        }}
        onClick={fetchSearchResult}
      />
      {searchResult && <SearchRender result={searchResult} />}
    <Player></Player>
    </PlayerContextProvider>
  );
}

export default Home;
