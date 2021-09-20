import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';
import Playlists from '../components/Playlists';

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
      <div className="search-bar">
         <img className="logo-header" src="../../assets/logo.svg" alt="Logo" />
         <SearchBar
            onChange={(e) => {
               console.log(e.target.value);

               if (e.target.type == 'text') {
                  setSearchTerm(e.target.value);
               } else {
                  setSearchType(e.target.value);
               }
            }}
            onClick={fetchSearchResult}
         />
         {searchResult && <SearchRender result={searchResult} />}
         <aside>
            <Playlists></Playlists>
         </aside>
      </div>
   );
}

export default Home;
