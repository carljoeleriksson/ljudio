import React, { useState } from 'react'

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';
import Player from '../components/Player';

function Home() {

	const [searchResult, setSearchResult] = useState();
	const [searchTerm, setSearchTerm] = useState('');

	async function fetchSearchResult(e){
		e.preventDefault();
		
		const response = await fetch('http://localhost:8000/api/search', {
			method: 'POST',
			body: JSON.stringify({
				"searchType": "search",
				"keyWord": searchTerm
			}),
			headers: {
			  'Content-Type': 'application/json'
			}
		})
		const data = await response.json();
		
		if(data){
			setSearchResult(data.content)
		} else {
			console.log('Failed to fetch. Got no data from backend.');
		}
	}

	return (
		<div>
			
			<SearchBar onChange={e => setSearchTerm(e.target.value)} onClick={fetchSearchResult} />
			{searchResult && <SearchRender result={searchResult} />}

		</div>
	)
}

export default Home
