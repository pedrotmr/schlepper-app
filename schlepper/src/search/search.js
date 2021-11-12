import { useState } from 'react';
import './search.css';
import apiService from '../APIservice'
import ReleaseMini from '../search-minis/release-mini/release-mini';

function Search () {
    const [searchQuery, changeSearchQuery] = useState('')
    const [results, changeResults] = useState([])
    
    function handleChange(e){
        const query = e.target.value;
        changeSearchQuery(query)
    }
    
    async function handleSubmit (e) {
       e.preventDefault()
       const res = await apiService.search(searchQuery, 'release')
       if (res){
           changeResults(res.results.slice(0,30))
           console.log(results)
       }
    }

    return (
        <div className="searchContainer">
            <h1>Search</h1>
            <div className="search-bar">   
                <form onSubmit={handleSubmit}>
                    <input
                      type="search"
                      placeholder="Search for album..."
                      name="search"
                      value={searchQuery}
                      onChange={handleChange}
                    />
                    <input type="submit" value="Search" className="button"/>
                    {results.length > 0 && 
                    results.map(r => <ReleaseMini key={r.uri} r={r}/>)
                    }
                </form>
             </div>
        </div>
    )
}

export default Search;