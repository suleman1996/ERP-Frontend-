import style from './leave-quota.module.scss'
import Table from 'components/table'
import editIcon from 'assets/newEdit.svg'
import revisionHistoryIcon from 'assets/revision-icon.svg'
import reviseIcon from 'assets/revise-icon.svg'
import deleteIcon from 'assets/table-delete.svg'

const ColumnsData = [
  {
    key: 'quota',
    name: 'Quota',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'effectiveDate',
    name: 'Effective Date',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'start',
    name: 'Start',
    alignText: 'center',
    width: '100px',
  },
  {
    key: 'end',
    name: 'End',
    alignText: 'center',
    width: '100px',
  },
  {
    key: 'sick',
    name: 'Sick',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'casual',
    name: 'Casual',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'annual',
    name: 'Annual',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '200px',
  },
]

const RowsData = [
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
  {
    quota: 'a',
    effectiveDate: 'a',
    start: 'a',
    end: 'v',
    sick: 'sa',
    casual: 'as',
    annual: 'qw',
    action: 'qw',
  },
]
const LeaveQuota = () => {
  return (
    <div className={style.mainDiv}>
      <Table
        tableClass={style.tableHight}
        tableHeaderClass={style.tableHeaderClass}
        headingText={style.headingText}
        columns={ColumnsData}
        tableHeight={style.tableMaxHight}
        minWidth="840px"
        rows={RowsData?.map((row: any) => ({
          ...row,
          action: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ marginRight: '10px' }}>
                <img
                  alt=""
                  src={reviseIcon}
                  width={30}
                  onClick={() => {
                    // setCancelModal(true)
                    // setSelectedId(row?.id)
                  }}
                />
              </div>
              <div style={{ marginRight: '10px' }}>
                <img
                  alt=""
                  src={editIcon}
                  width={30}
                  onClick={() => {
                    // setEditData(row)
                    // setOpenModal(true)
                  }}
                />
              </div>
              <div style={{ marginRight: '10px' }}>
                <img alt="" src={deleteIcon} width={30} />
              </div>

              <div style={{ marginRight: '10px' }}>
                <img
                  alt=""
                  src={revisionHistoryIcon}
                  width={30}
                  onClick={() => {
                    // setCancelModal(true)
                    // setSelectedId(row?.id)
                  }}
                />
              </div>
            </div>
          ),
        }))}
      />
    </div>
  )
}

export default LeaveQuota
