import React from 'react'
import './LableComponent.scss'

interface LableInterface {
    lable:string;
}

const LableComponent:React.FC<LableInterface> = ({lable}) => {
  return (
    <div className='lable'><span className='lable-style'>{lable}</span></div>
  )
}

export default LableComponent