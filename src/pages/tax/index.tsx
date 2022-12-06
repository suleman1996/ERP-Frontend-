import { useState } from 'react'

import TaxSlab from './tax-slab'
import CardContainer from 'components/card-container'
import Loading from 'components/loading'
import Button from 'components/button'

import plusIcon from 'assets/plusIcon.svg'
import style from './tax.module.scss'

const Tax = () => {
  const [active] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [singleId, setSingleId] = useState('')
  const [slabs, setSlab] = useState<any>([])

  const clickHanlder = () => {
    setSingleId('')
    setOpen(true)
    setSlab([])
  }

  return (
    <>
      <CardContainer className={style.className}>
        <div>
          <div className={style.header}>
            <h2>Tax Groups</h2>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div className={style.addTaxBtnDiv}>
                <div className={style.addTaxBtnChildDiv}>
                  <Button
                    text="Add Tax Group"
                    iconStart={plusIcon}
                    handleClick={clickHanlder}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        {active === 0 && (
          <TaxSlab
            setIsLoading={setIsLoading}
            open={open}
            setOpen={setOpen}
            singleId={singleId}
            setSingleId={setSingleId}
            slabs={slabs}
            setSlab={setSlab}
          />
        )}
      </CardContainer>
    </>
  )
}

export default Tax
