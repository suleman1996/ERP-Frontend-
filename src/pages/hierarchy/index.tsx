import { useForm } from 'react-hook-form'

import Button from 'components/button'
import CardContainer from 'components/card-container'
import Container from 'components/container'
import Selection from 'components/selection'
import Table from 'components/table'
import { columns, columns1, options, rows, rows1 } from './helper'

import imgShare from 'assets/shareIcon.svg'
import heri from 'assets/heri.svg'
import arrow from 'assets/rowLong.svg'

import style from './hierarchy.module.scss'

const Hierarchy = () => {
  const { control } = useForm()

  return (
    <Container>
      <CardContainer className={style.container}>
        <div className={style.headContainer}>
          <div className={style.mainDiv}>
            <Selection
              placeholder="Select"
              options={options}
              name="department"
              control={control}
              backClass={style.backClass}
            />
          </div>
          <div className={style.flexInner}>
            <img src={heri} alt="" />
            <img src={imgShare} alt="" />
          </div>
        </div>
        <div className={style.bodyDiv}>
          <div className={style.container}>
            <div className={style.grid}>
              <div className={style.mainCard}>
                <p className={style.heading}>All</p>
                <Table columns={columns} rows={rows} minWidth="600px" />
              </div>
              <img src={arrow} alt="" className={style.arrowLong} />
              <div className={style.mainCard}>
                <p className={style.heading}>Reporting To</p>
                <Table columns={columns1} rows={rows1} minWidth="600px" />
              </div>
            </div>
          </div>
        </div>
        <div className={style.btnDiv}>
          <Button text="Save" />
        </div>
      </CardContainer>
    </Container>
  )
}

export default Hierarchy
