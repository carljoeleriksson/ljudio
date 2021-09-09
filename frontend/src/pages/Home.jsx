import React, { useState } from 'react'

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';

function Home() {

	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [searchResult, setSearchResult] = useState();
	const [searchTerm, setSearchTerm] = useState('');

	async function fetchSearchResult(){

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
		console.log('Unfiltered searchresult:', data.content)
		if(data){
			setIsLoaded(true)
			setSearchResult(data.content)
		} else {
			setIsLoaded(true)
			setError(error)
		}
	}

	return (
		<div>
			<SearchBar onChange={e => setSearchTerm(e.target.value)} onClick={fetchSearchResult} />
			{console.log(searchResult)}
			{searchResult && <SearchRender searchResult={searchResult}/>}
		</div>
	)
}

export default Home
