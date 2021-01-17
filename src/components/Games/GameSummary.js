import React from 'react';
import styles from "./Games.module.css";

import {
   Link
 } from "react-router-dom";

 const baseAPIUrl = 'https://api.dev.cloud.barbooksaustralia.com/code-challenge';

const GameSummary = (props) => {
    const {
        data
      } = props;
   return (
     <div className={styles.GameCard}>
         <div className={styles.Row} style={{textAlign:"center"}}>
            <div className={styles.Col12}>
               <h3>{data.title}</h3>
            </div>  
            <div className={styles.Row}>
               <div className={styles.Col6}>
                  <img className={styles.Thumbnail} src={baseAPIUrl+data.thumbnail} alt={data.title} />
               </div>  
               <div className={`${styles.Col5}`} style={{padding:"5px",textAlign: "left"}} >
                  <p>{data.shortDescription}</p>
                  <Link className={styles.Link} style={{float:"right",fontWeight: "bold"}}
                     to={{
                        pathname: `/game/${data.id}`,
                        state: { fromDashboard: true }
                     }}>{`View more >`}
                  </Link>   
               </div>  
            </div>  
         </div>  
      </div>
   )
}
export default GameSummary;