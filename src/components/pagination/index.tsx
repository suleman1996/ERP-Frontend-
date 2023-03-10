import { SetStateAction } from 'react'

import Selection from 'components/selection'

import left from 'assets/double-arrow-left.svg'
import right from 'assets/double-arrow-right.svg'
import leftArrow from 'assets/single-arrow-left.svg'
import rightArrow from 'assets/single-arrow-right.svg'

import style from './pagination.module.scss'

interface Props {
  count: number
  setCount: React.Dispatch<SetStateAction<number>>
  totalCount: number
  setPage: (value: number) => void
  page: number
  control: any
}

const Pagination = ({
  setCount,
  count,
  totalCount,
  setPage,
  page,
  control,
}: Props) => {
  return (
    <>
      <div className={style.pagination}>
        <div className={style.leftFlex}>
          <p style={{ marginLeft: '0px', marginRight: '10px' }}>View</p>
          <div style={{ maxWidth: '100px' }}>
            <Selection
              control={control}
              name={'pagination'}
              defaultValue={{
                label: selectOptions[0]?.value,
                value: selectOptions[0]?.value,
              }}
              options={selectOptions}
              placeholder=""
              changeHandler={setCount}
              backClass={style.back}
              backStyle={{
                height: '30px !important',
                minHeight: '30px !important',
                borderRadius: '0px !important',
                alignItems: 'flex-start !important',
              }}
              imgStyle={{
                marginTop: '-1px ',
                marginRight: '1px',
              }}
              valuePag={{
                padding: '0px 3px',
              }}
            />
          </div>
          <p>user per page</p>
        </div>
        <div className={style.rightFlex}>
          <p className={style.p}>
            {` Showing ${
              (page - 1) * count === 0 ? 1 : (page - 1) * count
            } to ${page * count} of ${totalCount}`}{' '}
          </p>
          <img src={left} alt="" onClick={() => setPage(() => 1)} />
          <img
            src={leftArrow}
            alt=""
            onClick={() => setPage((prev: any) => (prev === 1 ? 1 : --prev))}
          />

          {/* {pages()} */}
          {page - 1 === 0 ? '' : page - 1}
          <span>
            <b style={{ color: '#57b894', margin: '0px 10px' }}>{page}</b>
          </span>

          <span>
            <b> {page + 1 > Math.ceil(totalCount / count) ? '' : page + 1}</b>
          </span>

          <img
            src={rightArrow}
            alt=""
            onClick={() =>
              setPage((prev: any) =>
                prev === Math.ceil(totalCount / count)
                  ? Math.ceil(totalCount / count)
                  : ++prev
              )
            }
          />
          <img
            src={right}
            alt=""
            onClick={() => setPage(() => Math.ceil(totalCount / count))}
          />
        </div>
      </div>
    </>
  )
}

export default Pagination

export const selectOptions = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
]
