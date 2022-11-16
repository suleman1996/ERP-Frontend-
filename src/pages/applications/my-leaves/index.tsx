import Table from 'components/table';
import style from './index.module.scss';

import editIcon from 'assets/table-edit.svg';
import cancel from 'assets/cancel.svg';
import view from 'assets/viewIconnew.svg';
import deleteIcon from 'assets/table-delete.svg';
import Button from 'components/button';
import Pagination from 'components/pagination';
import { useEffect, useState } from 'react';
import CreateApplicationModal from './create-applications';
import ApplicationService from 'services/application-service';
import moment from 'moment';
import Loading from 'components/loading';
import DeleteModal from 'components/delete-modal';
import { createNotification } from 'common/create-notification';

const ColumnsData = [
  {
    key: 'leaveType',
    name: 'Leave Type',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'total',
    name: 'Total',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'remaining',
    name: 'Remaining',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '150px',
  },
];
const ColumnsData1 = [
  {
    key: 'leaveType',
    name: 'Leave Type',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'appliedOn',
    name: 'Applied On',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'from',
    name: 'From',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'to',
    name: 'To',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'duration',
    name: 'Duration',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'status1',
    name: 'Status',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'action',
    name: 'Action',
    alignText: 'center',
    width: '150px',
  },
];

const MyLeaves = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [cancelModal, setCancelModal] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [RowsData, setRowsData] = useState([]);
  const [leaveRowsData, setLeaveRowsData] = useState([]);
  const [defaultLeaveType, setDefaultLeaveType] = useState({});
  const [page, setPage] = useState(1);

  const getHistory = async () => {
    setLoading(true);
    const res = await ApplicationService.getLeaveHistory();
    setRowsData(res.data);
    console.log(RowsData);
    setLoading(false);
  };
  const getAllLeaveApplications = async () => {
    setLoading(true);
    let {
      data: { msg, total },
    } = await ApplicationService.getAllLeaveApplications({ pageSize: pageSize, page: page - 1 });
    setTotalCount(total);
    msg = msg?.map((el: any) => {
      return {
        id: el._id,
        leaveType: el.leaveType.name,
        appliedOn: moment(el.applyDate).format('D MMM, YYYY'),
        from: moment(el.dateFrom).format('D MMM, YYYY (hh:mm A)'),
        to: moment(el.dateTo).format('D MMM, YYYY (hh:mm A)'),
        duration: el.noOfDays,
        status1: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color:
                  el.status === 'Pending'
                    ? '#E0AD00'
                    : el.status === 'Approved'
                    ? '#57B894'
                    : el.status === 'Rejected'
                    ? '#E92424'
                    : el.status === 'Cancelled'
                    ? '#6E6E6E'
                    : el.status === 'Updated'
                    ? '#5DC124'
                    : '',
                fontWeight: '500',
                backgroundColor:
                  el.status === 'Pending'
                    ? '#FFE48A'
                    : el.status === 'Approved'
                    ? '#B0DECD'
                    : el.status === 'Rejected'
                    ? '#F7B0B0'
                    : el.status === 'Cancelled'
                    ? '#BBBBBB'
                    : el.status === 'Updated'
                    ? '#B3EB94'
                    : '',
                width: '60%',
                height: '32px',
                fontSize: '16px',
                borderRadius: '1.55086px',
              }}
            >
              {el.status}
            </div>
          </div>
        ),
      };
    });
    setLeaveRowsData(msg);
    setLoading(false);
  };

  useEffect(() => {
    getHistory();
    getAllLeaveApplications();
  }, [pageSize, page]);

  const handleCancel = async () => {
    const res = await ApplicationService.deleteApplication(selectedId);
    if (res?.response?.status === 400) {
      createNotification('error', 'Error', res?.response?.data?.message);
      setCancelModal(false);
    }
    if (res?.data) {
      createNotification('success', 'success', 'Canceled');
      setCancelModal(false);
    }
  };

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      {cancelModal && (
        <DeleteModal
          open={cancelModal}
          setOpen={setCancelModal}
          heading={'Are you sure you want to cancel this?'}
          description={`If you cancel this you can’t reverse it.`}
          handleDelete={handleCancel}
        />
      )}
      {openModal && (
        <CreateApplicationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={data}
          defaultLeaveType={defaultLeaveType}
        />
      )}
      <div className={style.container}>
        <div className={style.historyTable}>
          <Table
            tableClass={style.tableHight}
            tableHeaderClass={style.tableHeaderClass}
            headingText={style.headingText}
            columns={ColumnsData}
            rows={RowsData?.map((row: any) => ({
              ...row,
              action: (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    text="Apply Now"
                    btnClass={style.btnClass}
                    handleClick={() => {
                      setDefaultLeaveType({ value: row.id, label: row.leaveType });
                      setOpenModal(true);
                    }}
                  />{' '}
                </div>
              ),
            }))}
            minWidth="700px"
            handleDelete={(id) => console.log(id)}
          />
        </div>
        <div className={style.historyTable}>
          <Table
            tableClass={style.tableHight}
            tableHeaderClass={style.tableHeaderClass}
            headingText={style.headingText}
            columns={ColumnsData1}
            rows={leaveRowsData?.map((row: any) => ({
              ...row,
              action: (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ marginRight: '10px' }}>
                    <img alt="" src={view} width={30} />
                  </div>
                  <div style={{ marginRight: '10px' }}>
                    <img alt="" src={editIcon} width={30} />
                  </div>
                  <div style={{ marginRight: '10px' }}>
                    <img
                      alt=""
                      src={cancel}
                      width={30}
                      onClick={() => {
                        setCancelModal(true);
                        console.log(row, 'row Data');
                        setSelectedId(row?.id);
                      }}
                    />
                  </div>
                </div>
              ),
              // status: (
              //   <div
              //     style={{
              //       display: 'flex',
              //       justifyContent: 'center',
              //       alignItems: 'center',
              //     }}
              //   >
              //     {/* <Switch title={'Active'} /> */}
              //   </div>
              // ),
            }))}
            minWidth="700px"
            handleDelete={(id) => console.log(id)}
            //   handleModalOpen={() => setDeletePopUp(true)}
            //   handleEdit={handleEdit && handleEdit}
          />
        </div>
        <div className={style.position}>
          <Pagination
            hide={false}
            setCount={setPageSize}
            count={pageSize}
            totalCount={totalCount}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

export default MyLeaves;
