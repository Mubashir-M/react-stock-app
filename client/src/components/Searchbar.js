import React from 'react'
import './Searchbar.css'
const Searchbar = ({chosenStock, newSearch, SetNewSearch}) => {

  return (
    <div className='searchBar'>
      <div className='searchBar__header' >
       <h1>Stock Picker</h1>
      </div >
      <div className = 'searchBar__input'>
        { chosenStock === null ? <div className = 'search_div'><input placeholder ='Search for a stock' value = {newSearch} onChange = { e => SetNewSearch(e.target.value)}/></div> : null}
      </div>
      <div className='searchBar__button'>
        <button className='getSaved__button'>Saved stocks</button>
      </div>  
    </div>
  )
}



export default Searchbar
