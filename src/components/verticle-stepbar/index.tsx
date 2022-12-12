/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, Fragment, SetStateAction } from 'react'

import style from './verticleStepbar.module.scss'
import miniClock from 'assets/icons/miniClock.svg'

interface Props {
  activeTab: any
  setStepBarActive: Dispatch<SetStateAction<string[]>>
  setActive: Dispatch<SetStateAction<any>>
  controlWidth: string
  tabs: any
}

const VerticleStepBar = ({
  activeTab,
  controlWidth,
  setActive,
  tabs = {},
}: Props) => {
  return (
    <div className={style.wrapper}>
      {tabs?.map(({ key }: any, index: number) => {
        const isActive = activeTab?.includes(key)
        return (
          <Fragment key={key}>
            <div className={style.timelineWrapper}>
              <div className={style.node}>
                <span>{key}</span>
                <p>
                  <img src={miniClock} alt="" />
                  10:00 AM
                </p>
              </div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default VerticleStepBar
