import React, {useState,useEffect} from 'react';
import styles from "./Games.module.css";

import {
    useParams,
    useHistory
  } from "react-router-dom";

const Game = () => {
    const params = useParams();
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const [game,setGame] = useState({});
    const baseAPIUrl = 'https://api.dev.cloud.barbooksaustralia.com/code-challenge';

    useEffect(() => {
        getGame();
      }, []);

      const getGame = () => {
        setLoading(true);
        let apiUrl = `/api/game?id=${params.id}`;
  
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(response => {setGame(response); setLoading(false)})
            .catch(error => {console.log('error', error); setLoading(false)});
       }

    if (loading){
      return (<div style={{textAlign:"center"}}>Loading...</div>)
    }

    return (
    <div>
        <div className={styles.Row}>
          <div className={styles.Col5}>
             <img className={styles.Thumbnail} src={baseAPIUrl+game.thumbnail} alt={game.title} />
          </div>
          <div className={styles.Col7}>
            <div className={styles.Row} >
                <div className={styles.Col4}><b>Requirements</b></div>
                <div className={styles.Col6}><b>{game.title}</b></div>
            </div>

            <div className={styles.Row} >
              <div className={styles.Col4}>
                {game.minimumSystemRequirements?Object.entries(game.minimumSystemRequirements)?.map(([key, value]) => 
                { if (!value)
                    return "";
                  return (<div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                  <nobr><b>{key.toUpperCase()}</b>:</nobr> {value}
                </div>)}
                ):""}  

                {game.status && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                <b>STATUS: </b> {game.status}
                </div>}

                {game.genre && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                <b>GENRE: </b> {game.genre}
                </div>}

                {game.platform && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                  <b>PLATAFORM: </b> {game.platform}
                </div>}

                {game.publisher && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                <b>PUBLISHER: </b> {game.publisher}
                </div>}

                {game.developer && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                <b>DEVELOPER: </b> {game.developer}
                </div>}

                {game.releaseDate && <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                <b>RELEASE DATE: </b> {game.releaseDate}
                </div>}
                
              </div>

              <div className={styles.Col6}>
                <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                  {game.shortDescription}
                </div>

                <div className={`${styles.Row}`} style={{justifyContent:"left", padding:"5px"}}>
                  {game.description}
                </div>
                  <a className={styles.Link} style={{float:"right", fontWeight:"bold"}} href="#"
                  onClick={() => { history.goBack();}}>  {`< Back`}
                  </a>
                </div>
            </div>
          </div>
         </div>

         <div className={styles.Row}>
           {game.screenshots?.map((screenshot) =>
            <div className={`${styles.Col3}`} style={{padding:"5px"}}> 
               <img className={styles.Thumbnail} src={baseAPIUrl+screenshot.image} /> 
            </div>)}
         </div>
    </div>
    );
  }

export default Game;