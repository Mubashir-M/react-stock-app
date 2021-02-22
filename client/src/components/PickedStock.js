import React, { useEffect} from 'react'
import './PickedStock.css'

const PickedStock =  ({
  chosenStock,stockData, stockInfo,logo,
  SetLogo,SetStockData,SetStockInfo, handleCancel, handleSaveStock
}) => {
  // get balance sheet, logo, company, price using IEXcloud.io
  //
  const symbol = chosenStock.toLocaleLowerCase()
  const api_key = process.env.REACT_APP_API_KEY
  const urlData = `https://cloud.iexapis.com/stable/stock/${symbol}/intraday-prices?chartLast=1&token=${api_key}`
  const urlInfo = `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${api_key}`
  const urlLogo = `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=${api_key}`
  
  
  
  useEffect(() => {
    console.log('here again')
    console.log('here is stockdata before:', stockData.length === 0)
      // fetching company's stock price
      const getStock = async () => {
        if (stockData.length === 0){
          let response = await fetch(urlData)
          response = await response.json()
          console.log('here is response:', response)
          SetStockData(response[0])

          // info
          response = await fetch(urlInfo)
          response = await response.json()
          SetStockInfo(response)
          // fetching logo of the company
          response = await fetch(urlLogo)
          response = await response.json()
          SetLogo(response)
        }
      }
    getStock()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    
  
  return (
    <div className = 'container'>
        <section className = 'section1'>
          <img src = {logo.url} alt ='Company Logo'/>
          <div className='info'>
            <p ><strong>Company Name: </strong>{stockInfo.companyName}</p>
          </div>
          <div className='info'>
            <p ><strong>Stock: </strong>{stockInfo.symbol}</p>
          </div>
          <div className='info'>
            <p ><strong>Description: </strong>{stockInfo.description}</p>
          </div>
          <div className='info'>
            <p ><strong>Exchange: </strong>{stockInfo.exchange}</p>
          </div>
          <div className='info'>
            <p ><strong>Sector: </strong>{stockInfo.sector}</p>
          </div>
          <div className='info'>
            <p ><strong>Security Name: </strong>{stockInfo.securityName}</p>
          </div>
          <div className='info'>
            <p ><strong>State: </strong>{stockInfo.state}</p>
          </div>
        </section>
        <section className='section2'>
          <div className='info'>
            <p ><strong>Date: </strong>{stockData.date}</p>
          </div>
          <div className='info'>
            <p ><strong>Close: </strong>{stockData.close}</p>
          </div>
          <div className='info'>
            <p ><strong>High: </strong>{stockData.high}</p>
          </div>
          <div className='info'>
            <p ><strong>Low: </strong>{stockData.low}</p>
          </div>
          <div className='info'>
            <p ><strong>Average: </strong>{stockData.average}</p>
          </div>
          <div className = 'buttons'>
            <button onClick = {handleCancel}>Cancel</button>
            <button value = {chosenStock} onClick={handleSaveStock}>Save</button>
        </div>
        </section>
    </div>
  )
}


export default PickedStock