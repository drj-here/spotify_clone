import styled from "styled-components";
import React from "react";
export default function Login(){
    const handleClick=()=>{
        const clientId="f4d56ef6e81b48688b537f8ec3aa9ca9";
        const redirectUrl='http://localhost:3000/';
        const apiUrl="https://accounts.spotify.com/authorize";
        const scope=[
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
            "user-read-playback-position",
        ];
        window.location.href=`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
            )}&response_type=token&show_dialog=true`;
    }
    return <Container>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt=""/>
            <button onClick={handleClick}>Connect button</button>
           </Container>
}

const Container=styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:100vh;
width:100vw;
background-color:#1db954;
gap:5rem;
img{
    height:20vh;
}
button{
    padding:1rem 5rem;
    border-radius:5rem;
    border:none;
    background-color:black;
    color:#49f585;
    font-size:1.4rem;
    cursor:pointer;
}

`;