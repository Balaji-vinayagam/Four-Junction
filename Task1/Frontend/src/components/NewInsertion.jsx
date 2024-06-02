import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewInsertion(props){
 const [name,setname] = React.useState('');
 const [Bio,setBio] = React.useState('');
 const [date,setDate] = React.useState('');
 const [gender,setGender] =  React.useState('');
 const Base_URL = "http://localhost:3000";
 const notify = () => toast.success('Data saved successfully');
 

  const InsertDetails = async(e)=>{
    e.preventDefault();
    const Details = {
        name,
        DOB: date,
        Bio,
        gender,
      };
      console.log(Details);
      try{
        if(props.choice == "actor"){
            const response = await fetch(`${Base_URL}/add/actors`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(Details)
              });
              const result = await response.json();
              notify();
              props.hidemodal();
              console.log(result);
        }else if(props.choice == "producer"){
            const response = await fetch(`${Base_URL}/add/producers/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(Details)
              });
              const result = await response.json();
              notify();
              props.hidemodal();
              console.log(result);
        }
        
       }catch(err){
           console.log(err);
       }
  }

 return<>
    <h2>Add {props.choice}</h2>
    <form  className='subform-container' onSubmit={InsertDetails}>
    <div className='subform-group'>
        <input type="text" name="name" placeholder='Enter Name' onChange={(e)=>setname(e.target.value)} required/>
        <input type="text" name="Bio" placeholder='BIO' onChange={(e)=>setBio(e.target.value)} required/>
        <div>Date of Birth:</div>
        <input type="date" id="dob" name="dob" min="1900-01-01" max="2022-12-31"  onChange={(e)=>setDate(e.target.value)} required/><br/>
        <div>Select Gender:</div>
        <label><input type="radio" name="gender" value="male" onChange={(e)=>setGender(e.target.value)} required/>Male</label>
        <label><input type="radio" name="gender" value="female" onChange={(e)=>setGender(e.target.value)} required/>Female</label><br/>
        <input type="submit" value="Add"/>
    </div>
    </form>
 </>
}

export default  NewInsertion;