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
      <div>
      <img src = {logo.url} alt ='Company Logo'/>
      </div>

      <div>
        <table>
          <tbody>
        <tr>
          <th><strong>Company Name: </strong></th>
          <td>{stockInfo.companyName}</td>
        </tr>
        <tr>
          <th><strong>Stock: </strong></th>
          <td>{stockInfo.symbol}</td>
        </tr>
        <tr>
          <th><strong>Description: </strong></th>
          <td>{stockInfo.description}</td>
        </tr>
        <tr>
          <th><strong>Exchange: </strong></th>
          <td>{stockInfo.exchange}</td>
        </tr>
        <tr>
          <th><strong>Sector: </strong></th>
          <td>{stockInfo.sector}</td>
        </tr>
        <tr>
          <th><strong>Security Name: </strong></th>
          <td>{stockInfo.securityName}</td>
        </tr>
        <tr>
          <th><strong>State: </strong></th>
          <td>{stockInfo.state}</td>
        </tr>
        <tr>
          <th><strong>Date: </strong></th>
          <td>{stockData.date}</td>
        </tr>
        <tr>
          <th><strong>Close: </strong></th>
          <td>{stockData.close}</td>
        </tr>
        <tr>
          <th><strong>High: </strong></th>
          <td>{stockData.high}</td>
        </tr>
        <tr>
          <th><strong>Low: </strong></th>
          <td>{stockData.low}</td>
        </tr>
        <tr>
          <th><strong>Average: </strong></th>
          <td>{stockData.average}</td>
        </tr>
        </tbody>
        </table>
      </div>
      <div className = 'buttons'>
            <button onClick = {handleCancel}>Cancel</button>
            <button value = {chosenStock} onClick={handleSaveStock}>Save</button>
        </div>  
    </div>
  )
}


export default PickedStock