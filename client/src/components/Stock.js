import React from 'react'


const Stock = ({stock,handleStockPick }) => {

  return (
    <div>
      {stock}
      <button onClick = {handleStockPick} value = {stock} >Get</button>
    </div>
  )
}


export default Stock