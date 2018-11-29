import React from 'react'
import classes from './Input.css'
const input = (props) => {
  const classValidation=[classes.InputElement];
  let inputElement = null;
  if(props.invalid&&props.touched){
    classValidation.push(classes.Invalid)
  }
  switch (props.elementType) {
    case ('input'):
      inputElement =
        <input
          className={classValidation.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value} />
      break;

    case ('textarea'):
      inputElement =
        <input
          className={classValidation.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value} />
      break;

    case ('select'):
      inputElement =
        <select
          className={classValidation.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {
            props.elementConfig.options.map(option => (
              <option
                key={option.value}
                value={option.value}>
                {option.displeyValue}
              </option>
            ))
          }
        </select>
      break;

    default:
      inputElement =
        <input
          className={classes.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value} />
  }


  return (<div className={classes.Input}>
    <label className={classes.Label}>{props.labael}</label>
    {inputElement}
  </div>
  )

}

export default input
