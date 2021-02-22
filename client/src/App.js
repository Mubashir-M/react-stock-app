import React, { useState, useEffect  } from 'react';
import stock_symbol from './components/Data'
import Stock from './components/Stock'
import PickedStock from './components/PickedStock'
import stockService from './services/stocks'
import Searchbar from './components/Searchbar'
import './App.css'


const  App = () =>  {
  const [savedStocks, SetSavedStocks] = useState([])
  const [stockData, SetStockData] = useState ([])
  const [stockInfo, SetStockInfo] = useState([])
  const [logo,SetLogo] = useState([])
  const [newSearch, SetNewSearch] = useState('')
  const [chosenStock, SetChosenStock] = useState (null)
 

  useEffect(() => {
    stockService.getAll().then (stocks => SetSavedStocks(stocks))
  },[])
  

  const handleStockPick = (event) => {
    event.preventDefault()
    SetChosenStock(event.target.value.split(',')[1])
  }

  const handleGetSavedStock = (event) => {
    event.preventDefault()
    SetChosenStock(event.target.value)
  }

  const handleCancel = (event) => {
    event.preventDefault()
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
        <div className= 'filteredStocks_div'>
          <div >
            <p>Too many matching results.</p>
          </div>
          <div>
            <h2>Saved Stocks</h2>
            {savedStocks.map(stock => <p key = {stock._id}>name: {stock.name} symbol: {stock.symbol} <button value = {stock.symbol} onClick={handleGetSavedStock}>Get</button>
              <button value = {stock._id} onClick={handleRemoveStock}>Remove</button>
            </p>)}
          </div>
        </div>
      )
    } 
    return (
      <div className= 'filteredStocks_div'> 
        <div>
        {result.map(stock => <Stock key = {stock} stock = {stock} handleStockPick = {handleStockPick}/>)}
        </div>
        <div>
            <h2>Saved Stocks</h2>
            {savedStocks.map(stock => <p key = {stock._id}>name: {stock.name} symbol: {stock.symbol} <button value = {stock.symbol} onClick={handleGetSavedStock}>Get</button>
              <button value = {stock._id} onClick={handleRemoveStock}>Remove</button>
            </p>)}
          </div>
      </div>
    )
}
 

  return (
    <div className = 'container_div'>
      <Searchbar chosenStock= {chosenStock} newSearch= {newSearch} SetNewSearch = {SetNewSearch}/>
      <div>
        {
        chosenStock === null ? <FilteredStocks/> : 
          <PickedStock
            chosenStock={chosenStock} stockData={stockData} stockInfo={stockInfo} logo = {logo}
            SetLogo= {SetLogo} SetStockData={SetStockData} SetStockInfo={SetStockInfo} handleCancel={handleCancel}
            handleSaveStock={handleSaveStock}
          /> 
        }
      </div>
    </div>
  );
}

export default App;
