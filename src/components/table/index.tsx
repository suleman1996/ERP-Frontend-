import { Dispatch, SetStateAction, useState } from 'react'

import NoData from 'components/no-data-found-card'
import AddUser from 'pages/new-settings/manage-user/add-user'

import editIcon from 'assets/new-edit.svg'
import reloadIcon from 'assets/reset.png'
import deleteIcon from 'assets/table-delete.svg'
import eye from 'assets/table-view.svg'
import pdf from 'assets/employee-page/print.svg'
import style from './table.module.scss'
import FiltersComponent from 'components/filters'

interface Props {
  rows: any[]
  total?: any[]
  loading?: boolean
  tableClass?: string
  rowText?: string
  setRowIndex?: Dispatch<SetStateAction<number | undefined>>
  columns: {
    key: string
    name: string
    icon?: string
    selectedIcon?: string
    eyeIcon?: boolean
    width?: string
    alignText?: any
    toLocalString?: any
    currency?: boolean
  }[]
  handleEducation?: (index: number) => void
  handleDeleteIndex?: (id: number) => void
  handleDelete?: (id: string) => void
  handleEdit?: (id: string) => void
  handleResetIconClick?: (id: string, index: number) => void
  handleView?: (id: string) => void
  onPrint?: (id: string) => void
  handleModalOpen?: () => void
  colWidth?: string
  minWidth?: string
  width?: string
  tableHeight?: string
  overFlow?: string
  className?: string
  apiCall?: string
  filters?: boolean
  setFilters?: boolean
  sorts?: boolean
  setSorts?: boolean
  headingText?: string
  editIndex?: boolean
  setEditIndex?: Dispatch<SetStateAction<number>>
  setNewUser?: Dispatch<SetStateAction<boolean>>
  tableHeaderClass?: string
  customRoles?: any
  allIDs?: any
  singleUser?: any
  getAllUsers?: any
}

const Table = ({
  rows,
  columns,
  minWidth,
  className,
  onPrint,
  handleView,
  handleEdit,
  handleResetIconClick,
  handleDelete,
  handleEducation,
  handleModalOpen,
  handleDeleteIndex,
  tableHeight,
  headingText,
  rowText,
  editIndex,
  setEditIndex,
  setNewUser,
  tableHeaderClass,
  tableClass,
  customRoles,
  allIDs,
  singleUser,
  getAllUsers,
}: Props) => {
  const [tblScroll, setTblScroll] = useState(false)
  const [isFilter] = useState<string | number>('')
  const [isFilterSelected] = useState<string | number>('')

  const handlePencilIcon = ({ id, index }: { id: string; index: number }) => {
    handleEdit && handleEdit(id)
    handleEducation && handleEducation(index)
  }

  const handleResetIcon = ({ id, index }: { id: string; index: number }) => {
    handleResetIconClick && handleResetIconClick(id, index)
  }

  const handleDeleteIcon = ({ id, index }: { id: string; index: number }) => {
    handleDelete && handleDelete(id)
    handleDeleteIndex && handleDeleteIndex(index)
    handleModalOpen && handleModalOpen()
  }

  return (
    <>
      {rows?.length >= 1 && (
        <div
          className={`${style.tableWrapper} ${tableHeight}`}
          onMouseEnter={() => setTblScroll(true)}
          onMouseLeave={() => setTblScroll(false)}
          style={{
            textTransform: 'capitalize',
            overflowX: tblScroll && 'auto',
            overflowY: tblScroll && 'auto',
          }}
        >
          <div
            className={`${style.table} ${tableClass}`}
            style={{ minWidth: minWidth || '1200px' }}
          >
            <div
              className={`${style.thead}  ${tableHeaderClass}`}
              style={{ display: 'flex' }}
            >
              {columns.map((column, index) => (
                <div
                  key={index}
                  className={style.heading}
                  style={{
                    minWidth: column?.width ? column?.width : '250px',
                    textAlign: column?.alignText,
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  <p>
                    <span className={`${style.headingTitle} ${headingText}`}>
                      {column.name}
                    </span>
                    {column.icon && (
                      <img
                        src={
                          isFilterSelected === index
                            ? column.selectedIcon
                            : column.icon
                        }
                        className={style.sortIcon}
                        alt=""
                        style={{
                          position: 'relative',
                          top: '3px',
                          left: '5px',
                        }}
                      />
                    )}
                  </p>
                  {isFilter === index && <FiltersComponent />}
                </div>
              ))}
            </div>
            {rows?.map((row, index) => (
              <>
                <div
                  className={style.tr}
                  style={{ display: 'flex', alignItems: 'center' }}
                  key={index}
                >
                  {editIndex === index ? (
                    <AddUser
                      singleUser={singleUser}
                      customRoles={customRoles}
                      allIDs={allIDs}
                      setNewUser={setNewUser}
                      setEditIndex={setEditIndex}
                      getAllUsers={getAllUsers}
                    />
                  ) : (
                    <>
                      {columns.map((column, colIndex) => (
                        <div
                          key={colIndex}
                          style={{
                            minWidth: column?.width ? column?.width : '250px',
                            textAlign: column?.alignText,
                            padding: '12px 10px',
                            width: '100%',
                          }}
                          className={`${style.td}  ${className}`}
                        >
                          <span className={`${rowText}`}>
                            {row[column.key]}
                          </span>
                          {column.key === 'actions' &&
                            !column?.eyeIcon &&
                            (row?.isActive !== false ? (
                              <>
                                <img
                                  className={style.pencilIcon}
                                  data-testid="edit-element"
                                  onClick={() =>
                                    handlePencilIcon({ id: row?._id, index })
                                  }
                                  src={editIcon}
                                  alt="editIcon"
                                />
                                {column?.lockIcon && (
                                  <img
                                    className={style.pencilIcon}
                                    data-testid="edit-element"
                                    onClick={() =>
                                      handleResetIcon({ id: row._id, index })
                                    }
                                    src={reloadIcon}
                                    alt="editIcon"
                                  />
                                )}
                                <img
                                  onClick={() =>
                                    handleDeleteIcon({ id: row._id, index })
                                  }
                                  className={style.pencilIcon}
                                  src={deleteIcon}
                                  alt="deleteIcon"
                                />
                              </>
                            ) : (
                              '-'
                            ))}
                          {column.key === 'actions' && column?.eyeIcon && (
                            <>
                              <img
                                src={eye}
                                alt=""
                                className={style.pencilIcon}
                                onClick={() => {
                                  handleView && handleView(row.id)
                                }}
                              />
                              <img
                                src={pdf}
                                alt=""
                                className={style.pencilIcon}
                                onClick={() => {
                                  onPrint && onPrint(row.id)
                                }}
                              />
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      )}
      {!rows && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '0 20px',
            }}
          >
            <NoData />
          </div>
        </div>
      )}
    </>
  )
}

export default Table
