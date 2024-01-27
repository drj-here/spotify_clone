import React from 'react'
import styled from 'styled-components'
import {BsPlayCircleFill,BsPauseCircleFill,BsShuffle} from 'react-icons/bs'
import {CgPlayTrackNext,CgPlayTrackPrev} from 'react-icons/cg'
import {FiRepeat} from 'react-icons/fi'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
import axios from 'axios'
function PlayerControls() {
   
  const [{token,playerState},dispatch]=useStateProvider();

  const changeState=async ()=>{
    const state=playerState? "pause":"play";
try{
    const response=await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},
        {
            headers:{
                Authorization:"Bearer "+token,
                "Content-Type":"application/json",
            },
        })
  dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:!playerState})
  }
  catch(error){
    if (error.response && error.response.status === 403) {
      alert("Premium account required to perform this action.");
     
  } else {
      console.error("An error occurred:", error.message);
  }
  }
  }
  const changeTrack=async (type)=>{

    try{
    await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{},
        {
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
        const response=await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
        {
            headers:{
                Authorization:"Bearer "+token,
                "Content-Type":"application/json",
            },
        })
        
        if(response.data!==""){
            const {item}=response.data;
            const currentlyPlaying={
                id:item.id,
                name:item.name,
                artists:item.artists.map((artist)=>artist.name),
                image:item.album.images[2].url,
            }
            console.log(response.data)
            dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying});
        }
        else{
          dispatch({type:reducerCases.SET_PLAYING,currentlyPlaying:null});
        }
  }
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle/>
      </div>
      <div className="previous" onClick={()=>changeTrack("previous")}>
        <CgPlayTrackPrev/>
      </div>
      <div className="state">
        {playerState? <BsPlayCircleFill onClick={changeState}/>:<BsPauseCircleFill onClick={changeState}/>}
      </div>
      <div className="next" onClick={()=>changeTrack("next")}>
        <CgPlayTrackNext/>
      </div>
      <div className="repeat">
        <FiRepeat/>
      </div>
    </Container>
  )
}

export default PlayerControls

const Container=styled.div`
display:flex;
align-items:center;
justify-content:center;
gap:2rem;
svg{
  color:#b3b3b3;
  transition:0.2s ease-in-out;
  &:hover{
    color:white;
  }
}
.state{
  svg{
    color:white;
  }
}
.previous,.next,.state{
  font-size:2rem;
}
`
