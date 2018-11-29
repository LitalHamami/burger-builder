import React from 'react'
import BurgerIngridient from './BurgerIngridient/BurgerIngridient'
import classes from './Burger.css'
import propTypes from 'prop-types';


const burger =(props)=>
{
  let tranformedIngridient= Object.keys(props.ingridients)
  .map(igKey=>{
    return [...Array(props.ingridients[igKey])].map((_, i)=>{
      return <BurgerIngridient key={igKey+i} type={igKey}></BurgerIngridient>
    });
  }).reduce((arr,el)=>{
    return arr.concat(el)
  },[]);
  if(tranformedIngridient.length===0)
  {
    tranformedIngridient=<p>Please start adding ingredients!</p>
  }
 
  
  return(
    <div className={classes.Burger}>
    <BurgerIngridient type="bread-top"/>
     {tranformedIngridient}
    <BurgerIngridient type="bread-buttom"/>
    </div>    
  )

}

burger.propTypes={
  ingridients: propTypes.object,
  
}

export default burger