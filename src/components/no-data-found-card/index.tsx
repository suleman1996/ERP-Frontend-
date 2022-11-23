import React from 'react'
import style from './data-card.module.scss'

const NoData = ({ className }: any) => {
  return (
    <div className={`${style.container} ${className}`}>
      <p className={style.heading}>Not data found</p>
    </div>
  )
}

export default NoData
