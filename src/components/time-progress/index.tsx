import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import style from './time-progress.module.scss'

const TimeProgress = () => {
  const percentage = 20

  return (
    <>
      <div className={style.main}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}h : 00m`}
          styles={{
            path: {
              stroke: '#57B894',
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease 0s',
              transformOrigin: 'center center',
            },
            trail: {
              stroke: '#E2E2EA',
              strokeLinecap: 'round',
              transformOrigin: 'center center',
            },
            text: {
              fill: '#2D2D32',
              fontSize: '15px',
              fontWeight: 600,
            },
          }}
        />
      </div>
    </>
  )
}

export default TimeProgress
