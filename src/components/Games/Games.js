import React, { useState, useEffect } from 'react';
import GameSummary from './GameSummary'
import Select from 'react-select';
import styles from "./Games.module.css";

const Games = () => {
   const [games, setGames] = useState([]);
   const [allGames, setAllGames] = useState([]);
   
   const [searchName, setSearchName] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedPlatform, setSelectedPlatform] = useState('');
   const [categories, setCategories] = useState([]);
   const [sortBy, setSortBy] = useState('release-date');
   const [loading,setLoading] = useState(false);

   const platformOptions = [{value:'', label:'All'},{value:'pc', label:'PC'},{value:'browser', label:'Browser'}]
   const sortByOptions = [{value:'release-date', label:'Release Date'},{value:'alphabetical', label:'Alphabetical'},{value:'relevance', label:'Relevance'}]

   useEffect(() => {
    if (sessionStorage.selectedPlatform)
      setSelectedPlatform(sessionStorage.selectedPlatform)
    if (sessionStorage.selectedCategory)
      setSelectedCategory(sessionStorage.selectedCategory)
    if (sessionStorage.sortBy)
      setSortBy(sessionStorage.sortBy)
    if (sessionStorage.searchName)
      setSearchName(sessionStorage.searchName)

    getCategories();
    getAllGames();
    
  }, []);

  useEffect(() => {
    sessionStorage.setItem('searchName', searchName);
  }, [searchName]);

   useEffect(() => {
    sessionStorage.setItem('selectedPlatform', selectedPlatform);
    sessionStorage.setItem('selectedCategory', selectedCategory);
    sessionStorage.setItem('sortBy', sortBy);

    getAllGames();
  }, [selectedPlatform,selectedCategory,sortBy]);

  const getCategories = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/categories", requestOptions)
        .then(response => response.json())
        .then(response => setCategories(response.sort().map((category)=> {return {value:category, label:category}} )))
        .catch(error => console.log('error', error));
   }

   const getAllGames = () => {

    setLoading(true);

    let params = new URLSearchParams();
    if (selectedCategory)
      params.set('category', selectedCategory);
    if (selectedPlatform)
      params.set('platform', selectedPlatform);
    if (sortBy)
      params.set('sort-by', sortBy);
  
    let apiUrl = `/api/games?${params}`;

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(response => {setAllGames(response); setLoading(false)})
        .catch(error => {console.log('error', error); setLoading(false)});
   }
  
   const gamesList = allGames.filter((game)=>game.title.toLowerCase().includes(searchName.toLowerCase())).map((game) =>
    <div key={game.id} className={styles.Col6}>
      <GameSummary key={game.id} data={game} />
    </div>);

   return (
    <div>
      <div className={styles.Row}>
        <div className={styles.Col12} style={{textAlign:"center"}}>
          <input
                type="text"
                placeholder="Search by Name..."
                maxLength="50"
                defaultValue={searchName}
                className={styles.SearchInputText} 
                onChange={(event)=> setSearchName(event.target.value)}/>

          <a className={styles.Link} style={{fontWeight:"bold"}} href="#"
                    onClick={() => {
                      setSearchName('');
                      setSelectedCategory('');
                      setSelectedPlatform('');
                    }}>  {`Clear Filters`}
          </a>
        </div>

      </div>

      <div className={styles.Row}>
        <div className={styles.Col3}>
          <label htmlFor="platform">Filter by Platform</label> 
          <Select
            id="platform"
                className="basic-single"
                classNamePrefix="select"
                value={platformOptions.filter((option)=>option.value===selectedPlatform)[0]}
                options={platformOptions}
                onChange={(event)=> setSelectedPlatform(!event?'':event.value)}
              />
        </div>

        <div className={styles.Col3}>

          <label htmlFor="category">Filter by Category</label> 
          <Select
                id="category"
                className="basic-single"
                classNamePrefix="select"
                placeholder={"Start Typing"}
                isClearable={true}
                isSearchable={true}
                options={categories}
                value={categories.filter((option)=>option.value===selectedCategory)[0]}
                onChange={(event)=> setSelectedCategory(!event?'':event.value)} />
        </div>

        <div className={styles.Col3}>
          <label htmlFor="sortBy">Sort by</label> 
          <Select
          id="sortBy"
                    className="basic-single"
                    classNamePrefix="select"
                    value={sortByOptions.filter((option)=>option.value===sortBy)[0]}
                    options={sortByOptions}
                    onChange={(event)=> setSortBy(!event?'':event.value)}/>
        </div>

</div>
    <div className={styles.Row}>
    {loading?'Loading...':gamesList}
    </div>
 </div>
   )
}
export default Games;