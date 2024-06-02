import React from 'react';
import { useNavigate} from 'react-router-dom';

function Movielist(props){
    const movies = props.movielist;
    const navigate = useNavigate();

   function handleClick(movie){
    navigate(`/addmovies?id=${movie.id}`)
   }
return <>
  
   <table>
    <thead>
        <tr>
        <th>Poster</th>
        <th>Title</th>
        <th>Year of release</th>
        <th>Actors</th>
        <th>Producer</th>
        <th>Plot</th>
        </tr>
    </thead>
    <tbody>
    {movies.map((movie,index)=>(
      <tr key={movie.id}>
      <td className='moviedata'><img src={movie.poster} alt=""/></td>
      <td className='moviedata'>{movie.name}</td>
      <td className='moviedata'>{movie.year}</td>
      <td className='moviedata'>
      {Array.isArray(movie.actor) ? movie.actor.map(actor => actor).join(', ') : movie.actor}
    </td>
      <td className='moviedata'>{movie.producer}</td>
      <td className='moviedata'>{movie.plot}</td>
      <td className='moviedata'><button onClick={(e)=>{e.preventDefault(); handleClick(movie)}}>Edit</button></td>
      </tr>  
    ))}    
    </tbody>
   </table>

</>
}


export default Movielist;