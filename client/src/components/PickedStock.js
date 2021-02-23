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
   
  /*
  className ='tr'
  className ='td'
  className ='th'
  */
  return (
    <div className = 'container'>
      <div>
      <img src = {logo.url} alt ='Company Logo'/>
      </div>

      <div className = 'body-table'>
        <table className = 'content-table'>
          <tbody>
        <tr className ='tr'>
          <th className ='th'><strong>Company Name: </strong></th>
          <td className ='td'>{stockInfo.companyName}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Stock: </strong></th>
          <td className ='td'>{stockInfo.symbol}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Description: </strong></th>
          <td className ='td'>{stockInfo.description}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Exchange: </strong></th>
          <td className ='td'>{stockInfo.exchange}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Sector: </strong></th>
          <td className ='td'>{stockInfo.sector}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Security Name: </strong></th>
          <td className ='td'>{stockInfo.securityName}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>State: </strong></th>
          <td className ='td'>{stockInfo.state}</td>
        </tr>
        <tr className ='tr'>
          <th><strong>Date: </strong></th>
          <td className ='td'>{stockData.date}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Close: </strong></th>
          <td className ='td'>{stockData.close}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>High: </strong></th>
          <td className ='td'>{stockData.high}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Low: </strong></th>
          <td className ='td'>{stockData.low}</td>
        </tr>
        <tr className ='tr'>
          <th className ='th'><strong>Average: </strong></th>
          <td className ='td'>{stockData.average}</td>
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