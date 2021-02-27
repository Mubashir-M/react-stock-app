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
      <div className = 'table-div'>
        <div className='img-div'>
          <img className='img-item' src = {logo.url} alt ='Company Logo'/>
        </div>
        <table className = 'content-table'>
          <tbody className= 'content-table-tbody'>
            <tr className ='tr' id = 'tr-first'>
              <th className ='th' id = 'th-first'>Company Name: </th>
              <td className ='td' id = 'td-first'>{stockInfo.companyName}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Stock: </th>
              <td className ='td'>{stockInfo.symbol}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Description: </th>
              <td className ='td'>{stockInfo.description}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Exchange: </th>
              <td className ='td'>{stockInfo.exchange}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Sector: </th>
              <td className ='td'>{stockInfo.sector}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Security Name: </th>
              <td className ='td'>{stockInfo.securityName}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>State: </th>
              <td className ='td'>{stockInfo.state}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Date: </th>
              <td className ='td'>{stockData.date}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Close: </th>
              <td className ='td'>{stockData.close}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>High: </th>
              <td className ='td'>{stockData.high}</td>
            </tr>
            <tr className ='tr'>
              <th className ='th'>Low: </th>
              <td className ='td'>{stockData.low}</td>
            </tr>
            <tr className ='tr' id = 'tr-last'>
              <th className ='th' id= 'th-last'>Average: </th>
              <td className ='td' id = 'td-last'>{stockData.average}</td>
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