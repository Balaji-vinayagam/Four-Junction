import React from 'react';

function AddActor(props){
    console.log("props",props);
 return <>
 {(props.selected).length > 0 && 
        <div className='selectedActor'> 
        {props.selected.map((list,index)=>(
            <span className='subselectedactor'>{ list}  </span>
        ))}
        </div>
         }
          {props.list.map((list,index)=>(
         <button className='addactorbutton' key={list.id} onClick={(e)=>{ e.preventDefault(); props.removeList(list)}}>+ {list}</button>
         ))} <button name="actor" className="add" onClick={(e)=>{ e.preventDefault();props.changeState(e)}}>Add Actor</button><br/>
         
        
 </>
}

export default AddActor;