import React, { useState } from 'react'
import axios from 'axios';
export default function SearchMovies() {
  const [query,setQuery] = useState('');
  const [movies,setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
  
     const url = `https://api.themoviedb.org/3/search/movie?api_key=a0de9f0783ece73507c0c2c4f3b9c64e&language=en-US&query=${query}&page=1&include_adult=false`;

    console.log('submitting');
    try {
      const response = await axios.get(url);
      console.log(response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button" type="submit">Search</button>
            </form>
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.name}</li>
          ))}
        </ul>
      )}
    </>
  )
}
