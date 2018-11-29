import React from 'react'
import classes from './Order.css'
const order=(props)=>{
  let ingridients=[];
  for(let ingridientsName in props.ingridients){
    ingridients.push({
      name: ingridientsName, amount: props.ingridients[ingridientsName]
    });

  }

  const ingridientsOutput= ingridients.map(ig=>{
    return(<span key={ig.name}>{ig.name} ({ig.amount})</span>)
  })

  return(
    <div className={classes.Order}>
    <p>Ingridients: {ingridientsOutput}</p>
    <p>Price <strong>USD {props.price}</strong></p>
  </div>
  
  )
}
  



export default order