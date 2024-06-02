import { useState,useEffect,useLayoutEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList.jsx';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';



function App() {
  const [movies,setMovies] = useState([]);
  const Base_URL = "http://localhost:3000";
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    fetchMovieList()
  },[])
  
  async function fetchMovieList (){
    try{
        const response = await axios.get(`${Base_URL}/movielist`);
        console.log('response',response)
        if(response.data.length > 0){
            const arr = [];
            response.data.forEach(element => {
                arr.push(element)
            });
            console.log("arr",arr);
            setMovies(response.data);
            console.log('movies',movies);
        }else{
           console.log("error")
        }  
    }catch(err){
        console.log(err);
    }
}


  return (
    <>
    <div className='container'>
   <h1 className="header">Movies</h1>
   <div className="header1"><button onClick={()=>navigate("/addmovies")}>Add Movie</button></div>
   </div>
      {movies.length >= 1 && 
        <MovieList movielist={movies}/>     
      }
    </>
  )
}

export default App
