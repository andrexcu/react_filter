
import './App.css';
import {useEffect, useState} from 'react';
import Movie from './components/Movie';
import Filter from './components/Filter';
import { motion, AnimatePresence } from 'framer-motion';

function App() {

  const [popular, setPopular] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6b89607e9b1a01be96dc996f57e5f184");
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  }
  
  // popular.map(movie => {
  //   console.log(movie)
  //   return null
  // })

  return (
    <div className="App">
      <Filter popular={popular} 
      setFiltered={setFiltered} 
      activeGenre={activeGenre} 
      setActiveGenre={setActiveGenre}/>
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered && filtered.map(movie => <Movie key={movie.id} movie={movie}/>)}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default App;
