import './App.css';
import { getMovieList, searchMovie } from "./api"
import { useEffect, useState } from 'react';

const App = () => {
  const [movieList, setmovieList] = useState([])

  useEffect(() => {
    getMovieList().then((res) => {
      setmovieList(res)
    })
  }, [])
  
  const MovieList = () => {
    return movieList.map((movie, i) => {
      return(
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
          <div className="Movie-date">Release Date : {movie.release_date}</div>
          <div className="Movie-rate">Rate : {movie.vote_average}</div>
        </div>
      )
    })
  }
      
      const search = async(q) =>{
        if(q.length > 2){
          const query = await searchMovie(q)
          setmovieList(query.results)
        }
      }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Popular Movie List</h1>
        <input type="text" placeholder='Cari Judul Film' className='Movie-search' onChange={({target}) => search(target.value)}/>
        <div className="Movie-container">
          <MovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
