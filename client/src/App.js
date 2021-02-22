import React, { useState, useEffect  } from 'react';
import stock_symbol from './components/Data'
import PickedStock from './components/PickedStock'
import stockService from './services/stocks'
import './App.css'


const  App = () =>  {
  const [savedStocks, SetSavedStocks] = useState([])
  const [stockData, SetStockData] = useState ([])
  const [stockInfo, SetStockInfo] = useState([])
  const [logo,SetLogo] = useState([])
  const [newSearch, SetNewSearch] = useState('')
  const [chosenStock, SetChosenStock] = useState (null)
  // Three states: Search for searching stocks, Saved for saved stocks, Chosen for chosen stocks.
  const [displayType, SetDisplayType] = useState('Search')
 

  useEffect(() => {
    stockService.getAll().then (stocks => SetSavedStocks(stocks))
  },[])
  

  const handleStockPick = (event) => {
    event.preventDefault()
    SetDisplayType('Chosen')
    SetChosenStock(event.target.value.split(',')[1])
  }

  const handleGetSavedStock = (event) => {
    event.preventDefault()
    SetChosenStock(event.target.value)
  }

  const handleCancel = (event) => {
    event.preventDefault()
      SetDisplayType('Search')
      console.log('here is display type:',displayType)
      SetChosenStock(null)
      SetStockData([])
      SetStockInfo([])
  }

  const handleSaveStock =  (event) => {
    // saving the stock wont re render the screen.
    event.preventDefault()
    const result = stock_symbol.filter(stock => stock.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))[0]
    const name = result.split(',')[0]
    const symbol = result.split(',')[1]

    if (savedStocks.filter(stock => stock.symbol===symbol).length===0){
      const newStock = {
        name: name,
        symbol: symbol
      }

      stockService
      .create(newStock)
      .then (returnedStock => {
        SetNewSearch('')
        SetChosenStock(null)
        SetStockData([])
        SetStockInfo([])
      })
    } else {
      console.log('stock already saved')
    }
  }

  const handleRemoveStock = (event) => {
    const stock_id = event.target.value

    stockService
    .remove(stock_id)
    .then (() => {
      console.log('Deleted chosen stock')
        SetSavedStocks(savedStocks.filter(stock => stock._id !== stock_id))
    })
    
  }
 
  const FilteredStocks = () => {
    const result = stock_symbol.filter(stock => stock.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()))
    
    if (result.length > 15 ) {
      return (
        <div className= 'emptyResult_div'>
          <div >
            <p>Too many matching results.</p>
          </div>
        </div>
      )
    } 
    return (
      <div> 
        <ul>
          {result.map(stock => 
            <li key={stock} className = 'searchResult_div'>
           
                {stock}
              <button onClick = {handleStockPick} value = {stock} >Get</button>
            
            </li>)}
          </ul>    
      </div>
    )
}

  const SavedStocks = () => {
    return (
      <div>
            <h1>Saved Stocks</h1>
            {savedStocks.map(stock => <p key = {stock._id}>name: {stock.name} symbol: {stock.symbol} <button value = {stock.symbol} onClick={handleGetSavedStock}>Get</button>
              <button value = {stock._id} onClick={handleRemoveStock}>Remove</button>
            </p>)}
            <button onClick= {() => SetDisplayType('Search')}>Cancel</button>
          </div>
    )
  }

  const Display = () => {

    switch(displayType){
      case 'Search':
        return <FilteredStocks/>
      case 'Saved':
        return <SavedStocks/>
      case 'Chosen':
        return <PickedStock
                  chosenStock={chosenStock} stockData={stockData} stockInfo={stockInfo} logo = {logo}
                  SetLogo= {SetLogo} SetStockData={SetStockData} SetStockInfo={SetStockInfo} handleCancel={handleCancel}
                  handleSaveStock={handleSaveStock}
                /> 
      default:
        return <FilteredStocks/>
    }
  }

  return (
    
    <div className = 'container_div'>
      
      {displayType !== 'Search' ? null :
        <div className = 'search_div'>
        <form >
          <input className = 'input_field' placeholder ='Search for a stock' value = {newSearch} onChange = { e => SetNewSearch(e.target.value)}/>
        </form> 
        <button className='getsaved_button' onClick={() => SetDisplayType('Saved')}>get saved</button>
      </div> 
      }
        
      <div className='result'>
        <Display/> 
      </div>
    </div>
  )
}

export default App;
