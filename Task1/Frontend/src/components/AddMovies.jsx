import React from 'react';
import axios from 'axios';
import AddActor from './AddActor';
import Dropdown from 'react-dropdown';
import NewInsertion from './NewInsertion'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';

function AddMovies(){
   const [actorlist,setActorlist] = React.useState([]);
   const [selectedActors,setSelectedActors] = React.useState([]);
   const [producerlist,setProducerlist] = React.useState([]);
   const [selectedProducer,setSelectedProducer] = React.useState(null);
   const [name,setName] = React.useState('');
   const [year,setYear] = React.useState(null);
   const [poster,setPoster] = React.useState('');
   const [plot,setPlot] = React.useState('');
   const [moviemethod,setMoviemethod] = React.useState("");
   const [userchoice,setUserchoice] = React.useState(null);
   const [yearList,setYearList] = React.useState([]);
   const Base_URL = "http://localhost:3000";
   const [addField,setAddField] = React.useState(false);
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const [id,setId] = React.useState(null);
   const userindex = searchParams.get("id");
   const notify = () => toast.success('Data saved successfully');


   React.useLayoutEffect(()=>{
    fetchMovieList()
    for (let year = currentYear; year > 2000 ; year--) {
        yearList.push(year);
      }
  },[])

  const currentYear = new Date().getFullYear();
  

  function deleteActorList(e){
     console.log("item",e);
     setActorlist(()=>{
        return actorlist.filter((item,index)=>{
            return item != e;
        })
     })
     const res = actorlist.find((element)=>(element == e));
     setSelectedActors((preValue)=>[...preValue,res]);
     
  }

  const onSelect = (option) => {
    setSelectedProducer(option.value);
    
  };

  const fieldChange = (e)=>{
    setUserchoice(e.target.name);
    setAddField(!addField);
  }

  function hidemodal(){
    setAddField(!addField);
  }

  const onSelectYear = (option) => {
    setYear(option.label);
  };

  async function InsertMovieDetails(e){
    e.preventDefault();
    const arr = [];
    console.log("arradAFavq",selectedActors);
    selectedActors.forEach((element)=>arr.push(element));
    console.log("arradAFavq",arr);
    const movieDetails = {
      id:parseInt(userindex),
      name,
      year,
      poster,
      plot,
      actor: arr,
      producer: selectedProducer
    };
    try{
      if(moviemethod == "Save"){
        const response = await fetch(`${Base_URL}/edit/movielist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movieDetails)
        });
        const result = await response.json();
        notify();
        navigate("/");
        
      }else{
        const response = await fetch(`${Base_URL}/add/movielist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(movieDetails)
        });
        const result = await response.json();
        navigate("/");
        notify();
      }
    }catch(err){
        console.log(err);
    }
  }


  async function fetchMovieList (){
    try{
        const actorlistresponse = await axios.get(`${Base_URL}/actorlist`);
        const producerlistresponse = await axios.get(`${Base_URL}/producerlist`);
        const response = await axios.get(`${Base_URL}/movielist`);
        if(actorlistresponse.data.length > 0 || producerlistresponse.data.length > 0){
            const arr = [];
            const arr2 = [];
            actorlistresponse.data.forEach(element => {
                arr.push(element.name)
            });
            producerlistresponse.data.forEach(element => {
                arr2.push(element.name)
            });
            await setActorlist(arr);
            console.log("actorlist1",actorlist);
            await setProducerlist(arr2);
            if(userindex != null){
              const userresult = response.data.filter((element)=>{ return element.id == userindex});
              console.log(userresult[0]);
              setName(userresult[0].name);
              setPlot(userresult[0].plot);
              setYear(userresult[0].year);
              setPoster(userresult[0].poster);
              setSelectedProducer(userresult[0].producer);
              setSelectedActors(userresult[0].actor);
              console.log(selectedActors.length);
              if(selectedActors.length > 0){
                const filteredActorList = actorlist.filter(actor => !selectedActors.includes(actor));
                await setActorlist(filteredActorList);
                console.log("actorlist2",filteredActorList);
              }
            }
             
            
        }else{
           console.log("error")
        }  
    }catch(err){
        console.log(err);
    }
}
  

 return <>
    <h2 className='headerelement' >{userindex ? "Edit Movie" : "Add Movie"}</h2>
    <div className='div-container'>
    <div className='addmovie'>         
    <form className='form-container' onSubmit={InsertMovieDetails}>
        <div className='form-group'>
        <input type="text" name="title" id="name" placeholder='Movie Title' value={name} onChange={(e)=>setName(e.target.value)} required/>
        <Dropdown
        className='yeardropdown'
        options={yearList}
        onChange={(selectedYear) => {
          setYear(selectedYear);
          onSelectYear(selectedYear); // Call the onSelectYear function
        }}
        value={year}
        placeholder="Select Year of movie release"
      />
        {/* <Dropdown className='yeardropdown' options={yearList} onChange={onSelectYear} value={year} placeholder="Select Year of movie release"/> */}
        <input type="text" name="poster" id="poster"  placeholder='Poster' value={poster} onChange={(e)=>setPoster(e.target.value)}  required/>
        <input type="text" name="plot" id="plot"  placeholder='Plot' value={plot} onChange={(e)=>setPlot(e.target.value)}  required/>
        <div>Add Actors from Below suggestions</div>
        <AddActor index={userindex} selected={selectedActors} list={actorlist} removeList={deleteActorList} changeState={fieldChange} required/>
        
        <div>Add Producers from Below suggestions</div>
        <div id="addContainer">
        <Dropdown className='producerdropdown' options={producerlist} onChange={onSelect} value={selectedProducer}  placeholder="Select an option" />
        <button className="add" name="producer" onClick={(e)=>{ e.preventDefault(); fieldChange(e)}}>Add Producer</button></div>
        </div>
        <input id="addButton" type="submit" value={userindex ? "Save" : "Add"} onClick={(e)=>{setMoviemethod(e.target.value)}}/>
    </form> 
    </div>
     <div  className='addNew'>
    {addField && 
         <NewInsertion choice={userchoice} hidemodal={hidemodal}/>
        }
        </div>
        </div>
 </>
}

export default AddMovies