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

    if (stockData.length === 0) {
      // fetching company's stock price
      fetch(urlData)
      .then((reponse) => reponse.json())
      .then((data)=> {
       console.log('here is data: ',data)
        SetStockData(data[0])
      })
      // fetching data about the compmany
      fetch(urlInfo)
      .then((response) => response.json())
      .then((data) => {
      //  console.log('here is company data: ',data)
        SetStockInfo(data)
      })
    }
    // fetching logo of the company
    fetch(urlLogo)
    .then((reponse) => reponse.json())
    .then((data) => {
     // console.log('here is logo:',data)
      SetLogo(data)

    })
    

  },[SetStockData, SetStockInfo, stockData.length, urlData, urlInfo,urlLogo,SetLogo])
    
  
  return (
    <div className = 'container'>
        <section className = 'section1'>
          <img src = {logo.url} alt ='Company Logo'/>
          <div>
            <p id = 'info'><strong>Company Name: </strong>{stockInfo.companyName}</p>
          </div>
          <div>
            <p id = 'info'><strong>Stock: </strong>{stockInfo.symbol}</p>
          </div>
          <div>
            <p id = 'info'><strong>Description: </strong>{stockInfo.description}</p>
          </div>
          <div>
            <p id = 'info'><strong>Exchange: </strong>{stockInfo.exchange}</p>
          </div>
          <div>
            <p id = 'info'><strong>Sector: </strong>{stockInfo.sector}</p>
          </div>
          <div>
            <p id = 'info'><strong>Security Name: </strong>{stockInfo.securityName}</p>
          </div>
          <div>
            <p id = 'info'><strong>State: </strong>{stockInfo.state}</p>
          </div>
        </section>
        <section className='section2'>
          <div>
            <p id = 'info'><strong>Date: </strong>{stockData.date}</p>
          </div>
          <div>
            <p id = 'info'><strong>Close: </strong>{stockData.close}</p>
          </div>
          <div>
            <p id = 'info'><strong>High: </strong>{stockData.high}</p>
          </div>
          <div>
            <p id = 'info'><strong>Low: </strong>{stockData.low}</p>
          </div>
          <div>
            <p id = 'info'><strong>Average: </strong>{stockData.average}</p>
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