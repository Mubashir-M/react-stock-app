import React, { useState, useEffect  } from 'react';
import stock_symbol from './components/Data'
import Stock from './components/Stock'
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

  const handleSaveStock = (event) => {
    event.preventDefault()
    const result = stock_symbol.filter(stock => stock.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))[0]
    console.log('here is stock found:' , result)
    const name = result.split(',')[0]
    const symbol = result.split(',')[1]
    console.log('here is stock name:' , name)

    if (savedStocks.filter(stock => stock.symbol===symbol).length===0){
      console.log('heihei')
      const newStock = {
        name: name,
        symbol: symbol
      }

      stockService
      .create(newStock)
      .then (returnedStock => {
        console.log('saved stock: ', returnedStock)
        SetNewSearch('')
      })
    } else {
      console.log('stock already saved')
    }
  }
 
  const Stocks = () => {
    const result = stock_symbol.filter(stock => stock.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()))
    
    if (result.length > 15 ) {
      return (
        <div>
          <div>
            <p>Too many matching results.</p>
          </div>
          <div>
            <h2>Saved Stocks</h2>
            {savedStocks.map(stock => <p key = {stock._id}>name: {stock.name} symbol: {stock.symbol} <button value = {stock.symbol} onClick={handleGetSavedStock}>Get</button></p>)}
          </div>
        </div>
      )
    } 
    return (
      <div>
        <div>
        {result.map(stock => <Stock key = {stock} stock = {stock} handleStockPick = {handleStockPick}/>)}
        </div>
      </div>
    )
}
 

  return (
    <div className = 'window_div'>
      <h1>Stock Picker</h1>
      <div className = 'data_div'>
        { chosenStock === null ? <form><input value = {newSearch} onChange = { e => SetNewSearch(e.target.value)}/></form> : null}
        {
        chosenStock === null ? <Stocks/> : 
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
