import { Dispatch, SetStateAction, Fragment, useEffect, useState } from 'react'

import NoData from 'components/no-data-found-card'
import FiltersComponent from 'components/filters'
import AddUser from 'pages/new-settings/manage-user/add-user'

import editIcon from 'assets/new-edit.svg'
import eye from 'assets/table-view.svg'
import reloadIcon from 'assets/reset.png'
import deleteIcon from 'assets/table-delete.svg'
import pdf from 'assets/employee-page/print.svg'
import clearFilter from 'assets/clear-filter.svg'

import style from './table.module.scss'

interface Props {
  rows: any[]
  loading?: boolean
  tableClass?: string
  rowText?: string
  setRowIndex?: Dispatch<SetStateAction<number | undefined>>
  setIsFilter?: Dispatch<SetStateAction<number | undefined>>
  isFilter?: number
  columns: {
    key: string
    name: string
    icon?: string
    selectedIcon?: string
    eyeIcon?: boolean
    width?: string
    alignText?: string
    toLocalString?: string
    currency?: boolean
  }[]
  handleEducation?: (index: number) => void
  handleDeleteIndex?: (id: number) => void
  handleDelete?: (id: string) => void
  handleEdit?: (id: string, index: number) => void
  handleResetIconClick?: (id: string, index: number) => void
  handleView?: (id: string, index: number) => void
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
  loader?: boolean
  headingText?: string
  editIndex?: boolean
  setEditIndex?: Dispatch<SetStateAction<number>>
  setNewUser?: Dispatch<SetStateAction<boolean>>
  tableHeaderClass?: string
  customRoles?: any[]
  allIDs?: string[]
  singleUser?: any[]
  getAllUsers?: () => void
  onSubmit?: any
  allUsers: any[]
  newUser?: boolean
  setBtnHideShow?: Dispatch<SetStateAction<boolean>>
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
  setIsFilter,
  isFilter,
  allUsers,
  onSubmit,
  loader,
  newUser,
  setBtnHideShow,
}: Props) => {
  const [first, setFirst] = useState<any>(null)

  useEffect(() => {
    if (!first || first?.length === 0) setFirst(allUsers)
  }, [first, allUsers])

  const handlePencilIcon = ({ id, index }: { id: string; index: number }) => {
    handleEdit && handleEdit(id, index)
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
      {rows?.length >= 1 ? (
        <div className={`${style.tableWrapper} ${tableHeight}`}>
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
                        onClick={() => {
                          setIsFilter(index)
                        }}
                        src={column.icon ? column.icon : clearFilter}
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

                  {isFilter === index && (
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        inset: 0,
                        position: 'fixed',
                        zIndex: 1000,
                      }}
                      onClick={() => setIsFilter(-1)}
                    ></div>
                  )}
                  {isFilter === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50px',
                        zIndex: 2000,
                      }}
                    >
                      <FiltersComponent
                        isFilter={isFilter}
                        setIsFilter={setIsFilter}
                        names={
                          first?.map(({ name, role, employeeId, email }: any) =>
                            isFilter === 1
                              ? name
                              : isFilter === 2
                              ? email
                              : isFilter === 3
                              ? role[0].name
                              : employeeId
                              ? employeeId
                              : ''
                          ) || []
                        }
                        selected={
                          allUsers?.map(({ name, role, employeeId, email }) =>
                            isFilter === 1
                              ? name
                              : isFilter === 2
                              ? email
                              : isFilter === 3
                              ? role[0].name
                              : employeeId
                              ? employeeId
                              : ''
                          ) || []
                        }
                        onSubmit={onSubmit}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <div>
                {newUser && (
                  <AddUser
                    setNewUser={setNewUser}
                    setBtnHideShow={setBtnHideShow}
                    customRoles={customRoles}
                    allIDs={allIDs}
                    getAllUsers={getAllUsers}
                  />
                )}
                {rows?.map((row, index) => (
                  <Fragment key={index}>
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
                          loader={loader}
                        />
                      ) : (
                        <>
                          {columns.map((column, colIndex) => (
                            <div
                              key={colIndex}
                              style={{
                                minWidth: column?.width
                                  ? column?.width
                                  : '250px',
                                textAlign: column?.alignText,
                                padding: '12px 10px',
                                width: '100%',
                              }}
                              className={`${style.td}  ${className}`}
                            >
                              <span
                                style={{ overflowWrap: 'anywhere' }}
                                className={`${rowText}`}
                              >
                                {row[column.key] || '-'}
                              </span>
                              {column.key === 'actions' &&
                                !column?.eyeIcon &&
                                (row?.isActive !== false ? (
                                  <>
                                    {column?.editView && (
                                      <img
                                        src={eye}
                                        alt=""
                                        className={style.pencilIcon}
                                        onClick={() => {
                                          handleView &&
                                            handleView(row?._id, index)
                                        }}
                                      />
                                    )}
                                    <img
                                      className={style.pencilIcon}
                                      data-testid="edit-element"
                                      onClick={() =>
                                        handlePencilIcon({
                                          id: row?._id,
                                          index,
                                        })
                                      }
                                      src={editIcon}
                                      alt="editIcon"
                                    />
                                    {column?.lockIcon && (
                                      <img
                                        className={style.pencilIcon}
                                        data-testid="edit-element"
                                        onClick={() =>
                                          handleResetIcon({
                                            id: row._id,
                                            index,
                                          })
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
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
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
