import React from 'react'
import './Alert.css'
import greenTick from '../../../assets/check.png'
import redCross from '../../../assets/cross.png'

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.alert.type}`}>
        <img src={props.alert.type == "success" ? greenTick : redCross} alt="" />
        <span>
            {props.alert.message}
        </span>
    </div>
  )
}

export default Alert;