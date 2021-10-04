import React, { useState, createContext } from 'react'

export const SearchContext = createContext();

function SearchContextProvider() {
	const [searchState, setSearchState] = useState({
		searchResult: [],
		searchTerm: '',
		searchType: 'search'
	})

	const updateSearchState = function updateSearch(updates) {
		setSearchState({
			...searchState,
			...updates
		})
	}

	const fetchSearchResult = async function fetchSearchRes(e) {
		e.preventDefault();
		console.log('searchType: ' + searchState.searchType);
  
		const response = await fetch('/api/search', {
		   method: 'POST',
		   body: JSON.stringify({
			  searchType: searchState.searchType,
			  keyWord: searchState.searchTerm,
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

	 const providerValue = {
		searchState,
		updateSearchState,
		fetchSearchResult
	 }

	console.log('SearchContext searchState: ', searchState);

	return (
		<>
			<SearchContext.Provider value={providerValue}>
				{props.children}
			</SearchContext.Provider>
		</>
	)
}

export default SearchContextProvider
