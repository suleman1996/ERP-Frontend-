import style from './leave-quota.module.scss'
import Table from 'components/table'
import editIcon from 'assets/newEdit.svg'
import revisionHistoryIcon from 'assets/revision-icon.svg'
import reviseIcon from 'assets/revise-icon.svg'
import deleteIcon from 'assets/table-delete.svg'

const ColumnsData = [
  {
    key: 'quota',
    name: 'Leave Type',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'effectiveDate',
    name: 'Applied On',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'start',
    name: 'From',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'end',
    name: 'To',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'sick',
    name: 'Duration',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'casual',
    name: 'Status',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'annual',
    name: 'Action',
    alignText: 'center',
    width: '60px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '120px',
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
        minWidth="540"
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
