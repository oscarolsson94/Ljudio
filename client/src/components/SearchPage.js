import React from 'react'
import "../css/SearchPage.css"
import { FaSearch } from 'react-icons/fa';
function SearchPage() {
    return (
        
        <div className="container-search-page">
            <h1 className="title">Tillgängliga låter/Artister</h1>
            <input className="input-search" 
            type="text" placeholder="Sök på låt eller artist">
            </input>
            <SearchButton></SearchButton>
        </div>
       
    )
}
function SearchButton(){
	return (
		<button onClick className="search-button">
			<FaSearch size={17} />
		</button>
	);
};
export default SearchPage
