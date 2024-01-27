import React from 'react'
import { useStateProvider } from '../utils/StateProvider'
import styled from 'styled-components';
import axios from 'axios';
function Volume() {

  const [{token}]=useStateProvider();

  const setVolume=async(e)=>{
    try{
    await axios.put(`https://api.spotify.com/v1/me/player/volume`,{},
        {   params:{
          Volume_percent:parseInt(e.target.value),
        },
            headers:{
                Authorization:"Bearer "+token,
                "Content-Type":"application/json",
            },
        })
      }
      catch(error){
        if (error.response && error.response.status === 403) {
          alert("Premium account required to perform this action.");
         
      } else {
          console.error("An error occurred:", error.message);
      }
      }
  }

  return (
    <Container>
      <input type='range' min={0} max={100} onMouseUp={(e)=>setVolume(e)}/>
    </Container>
  )
}

export default Volume

const Container=styled.div`
display:flex;
justify-content:center;
align-content:center;
input{
  width:15rem;
  border-radius:2rem;
  height:0.5rem;
}
`
