import React, { useState, useEffect  } from 'react';
import { FiSearch } from 'react-icons/fi'
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
    SetNewSearch('')
  }

  const handleGetSavedStock = (event) => {
    event.preventDefault()
    SetChosenStock(event.target.value)
    SetDisplayType('Chosen')
  }

  const handleCancel = (event) => {
    event.preventDefault()
      SetDisplayType('Search')
      console.log('here is display type:',displayType)
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
        SetStockData([])
        SetStockInfo([])
        SetSavedStocks([...savedStocks, returnedStock])
        SetDisplayType('Saved')
      })
    } else {
      SetDisplayType('Saved')
      SetStockData([])
      SetStockInfo([])
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
        <div>
            <p className = 'filtered-empty-p'>Too many matching results.</p>
        </div>
      )
    } 
    return (
      <div className = 'app-filtered'> 
        <table className = 'app-filtered-table'>
          <tbody className = 'app-filtered-table-tbody'>
            {result.map(stock => 
              <tr className = 'app-filtered-table-tr'>
               <th className = 'app-filtered-table-th' key = {stock}>{stock} <button className='app-filtered-table-button' onClick = {handleStockPick} value = {stock} >Get</button></th>
               </tr>
              )}
            </tbody>
        </table>
      </div>
    )
}

  const SavedStocks = () => {
    return (
      <div className = 'saved-div'>
        
        <h1 className= 'saved-h1'>Saved Stocks</h1>
        <table className='saved-table'>
          <tbody className='saved-tbody'>
            {savedStocks.map(stock => 
            <div className = 'saved-table-div'>
              <tr className = 'saved-tr'>
                <th className='saved-th' key = {stock._id}> 
                  Company:  {stock.name} Symbol: {stock.symbol} 
                </th>
              </tr>
              <tr className = 'saved-tr-buttons'>
                  <button className = 'saved-tr-button' value = {stock.symbol} onClick={handleGetSavedStock}>Get</button>
                  <button  className = 'saved-tr-button' value = {stock._id} onClick={handleRemoveStock}>Remove</button>
              </tr>
            </div>
            )}
          </tbody>
        </table>
        <button id ='saved-cancelButton' onClick= {() => SetDisplayType('Search')}>Cancel</button>
              
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
    
    <div className = 'container-div'>
      { displayType !== 'Search' ? null :
        
       <div className='search-elements'>
          <div className = 'search-div'>
            <div className = 'search-box'>
              <input className = 'search-text' placeholder ='Type to search for a stock' value = {newSearch} onChange = { e => SetNewSearch(e.target.value)}/>
              <FiSearch className='search-icon'/>
            </div> 
          </div>
          <div className = 'button-div'>
            <button className='getsaved_button' onClick={() => SetDisplayType('Saved')}>get saved</button>
          </div>
        </div>

      }

      <div className='result'>
        <Display/> 
      </div>
    </div>
  )
}

export default App;
