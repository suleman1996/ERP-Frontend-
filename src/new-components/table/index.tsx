import { Dispatch, SetStateAction, useState } from 'react';

import TableFilter from 'components/table-filter';
import NoData from 'components/no-data-found-card';

import editIcon from 'new-assets/table-edit.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import eye from 'new-assets/table-view.svg';
import pdf from 'assets/employee-page/print.svg';
import style from './table.module.scss';

interface Props {
  rows: any[];
  total?: any[];
  loading?: boolean;
  setRowIndex?: Dispatch<SetStateAction<number | undefined>>;
  columns: {
    key: string;
    name: string;
    icon?: string;
    selectedIcon?: string;
    eyeIcon?: boolean;
    width?: string;
    alignText?: any;
    toLocalString?: any;
    currency?: boolean;
  }[];
  handleEducation?: (index: number) => void;
  handleDeleteIndex?: (id: number) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleView?: (id: string) => void;
  onPrint?: (id: string) => void;
  handleModalOpen?: () => void;
  colWidth?: string;
  minWidth?: string;
  width?: string;
  tableHeight?: string;
  overFlow?: string;
  className?: string;
  apiCall?: string;
  filters?: boolean;
  setFilters?: boolean;
  sorts?: boolean;
  setSorts?: boolean;
  headingText?: string;
}

const Table = ({
  rows,
  total,
  loading,
  columns,
  minWidth,
  className,
  onPrint,
  handleView,
  handleEdit,
  handleDelete,
  handleEducation,
  handleModalOpen,
  handleDeleteIndex,
  tableHeight,
  setFilters,
  setSorts,
  apiCall,
  filters,
  sorts,
  headingText,
}: Props) => {
  const [isFilter, setIsFilter] = useState<string | number>('');
  const [isFilterSelected, setIsFilterSelected] = useState<string | number>('');

  const toggleFilter = (index: number) => {
    isFilter === index ? setIsFilter('') : setIsFilter(index);
    setIsFilterSelected(index);
  };

  const clearFilter = () => {
    setIsFilter('');
    setIsFilterSelected('');
  };

  const handlePencilIcon = ({ id, index }: { id: string; index: number }) => {
    handleEdit && handleEdit(id);
    handleEducation && handleEducation(index);
  };
  const handleDeleteIcon = ({ id, index }: { id: string; index: number }) => {
    handleDelete && handleDelete(id);
    handleDeleteIndex && handleDeleteIndex(index);
    handleModalOpen && handleModalOpen();
  };

  return (
    <>
      {rows?.length >= 1 && (
        <div
          className={`${style.tableWrapper} ${tableHeight}`}
          style={{
            textTransform: 'capitalize',
          }}
        >
          <div className={style.table} style={{ minWidth: minWidth || '1200px' }}>
            <div className={style.thead} style={{ display: 'flex' }}>
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
                    <span className={`${style.headingTitle} ${headingText}`}>{column.name}</span>
                    {column.icon && (
                      <img
                        src={isFilterSelected === index ? column.selectedIcon : column.icon}
                        className={style.sortIcon}
                        alt=""
                        // onClick={() => {
                        //   toggleFilter(index);
                        // }}
                        style={{
                          position: 'relative',
                          top: '3px',
                          left: '5px',
                        }}
                      />
                    )}
                  </p>
                  {isFilter === index && (
                    <TableFilter
                      filterKey={column.key}
                      toggleFilter={() => {
                        toggleFilter(index);
                      }}
                      clearFilter={() => {
                        clearFilter();
                      }}
                      apiCall={apiCall}
                      filters={filters}
                      setFilters={setFilters}
                      sorts={sorts}
                      setSorts={setSorts}
                    />
                  )}
                </div>
              ))}
            </div>
            {rows?.map((row, index) => (
              <div
                className={style.tr}
                style={{ display: 'flex', alignItems: 'center' }}
                key={index}
              >
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
                    {row[column.key]}
                    {column.key === 'actions' &&
                      !column?.eyeIcon &&
                      (row?.isActive !== false ? (
                        <>
                          <img
                            onClick={() => handleDeleteIcon({ id: row.id, index })}
                            className={style.pencilIcon}
                            src={deleteIcon}
                            alt="deleteIcon"
                          />
                          <img
                            className={style.pencilIcon}
                            data-testid="edit-element"
                            onClick={() => handlePencilIcon({ id: row.id, index })}
                            src={editIcon}
                            alt="editIcon"
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
                            handleView && handleView(row.id);
                          }}
                        />
                        <img
                          src={pdf}
                          alt=""
                          className={style.pencilIcon}
                          onClick={() => {
                            onPrint && onPrint(row.id);
                          }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
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
  );
};

export default Table;
