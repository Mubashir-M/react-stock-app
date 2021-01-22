import React, { useState  } from 'react';
import stock_symbol from './components/Data'
import Stock from './components/Stock'
import PickedStock from './components/PickedStock'
import './App.css'


const  App = () =>  {

  const [stockData, SetStockData] = useState ([])
  const [stockInfo, SetStockInfo] = useState([])
  const [logo,SetLogo] = useState([])
  const [newSearch, SetNewSearch] = useState('')
  const [chosenStock, SetChosenStock] = useState (null)
  //console.log('here is stokcData: ', stockData)
 
  const handleStockPick = (event) => {
    event.preventDefault()
    SetChosenStock(event.target.value.split(',')[1])
  }

  const handleCancel = (event) => {
    event.preventDefault()
      SetChosenStock(null)
      SetStockData([])
      SetStockInfo([])
  }
  

  const Stocks = () => {
    const result = stock_symbol.filter(stock => stock.toLocaleLowerCase().includes(newSearch.toLocaleLowerCase()))
    
    if (result.length > 15 ) {
      return <p>Too many matching results.</p>
    } 
    return result.map(stock => <Stock key = {stock} stock = {stock} handleStockPick = {handleStockPick}/>)
}


  return (
    <div className = 'window_div'>
      <h1>Stock Picker</h1>
      <div className = 'data_div'>
        { chosenStock === null ? <input value = {newSearch} onChange = { e => SetNewSearch(e.target.value)}/> : null}
        {
        chosenStock === null ? <Stocks/> : 
          <PickedStock
            chosenStock={chosenStock} stockData={stockData} stockInfo={stockInfo} logo = {logo}
            SetLogo= {SetLogo} SetStockData={SetStockData} SetStockInfo={SetStockInfo} handleCancel={handleCancel}
          /> 
        }
      </div>
    </div>
  );
}

export default App;
