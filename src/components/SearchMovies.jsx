import React, { useState } from 'react'
import axios from 'axios';
import CardBlog from './CardBlog';

export default function SearchMovies() {
  const [query,setQuery] = useState('');
  const [movies,setMovies] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);


  const searchMovies = async (e) => {
    e.preventDefault();

    const searchQuery = document.getElementById('searchInput').value.trim();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=a0de9f0783ece73507c0c2c4f3b9c64e&language=en-US&query=${query}&page=1&include_adult=false`;

    if (!searchQuery) {
      return; 
    }

    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
      setShowNoResults(true);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Movie Name</label>
        <input id='searchInput' className="input" type="text" name="query"
            placeholder="i.e. Jurassic Park"
            value={query} onChange={(e) => setQuery(e.target.value)}
            />
        <button className="button" type="submit">Search</button>
      </form>
      {showNoResults && movies.length === 0 && (
        <p>No movies found matching your search criteria.</p>
      )}
      {movies.length > 0 && (
        <CardBlog movies={movies} />
      )}

    </>
  )
}
