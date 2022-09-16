import NavLinks from 'components/nav-links';
import SingleEmployeeOverview from './employee-overview/single-employee-overview';
import SingleEmployeeAttendance from './employee-attendence/single-employee-attendance';
import SingleEmployeeSalary from './employee-salary/single-employee-salary';
import SingleEmployeeChart from './employee-chart/single-employee-chart';
import DatePicker1 from 'components/react-daterange-picker';
import DeletePopup from 'components/delete-modal';
import Loading from 'components/loading';
import CardContainer from 'components/card-container';

import { useSingleEmployee } from './helper';

import style from './single-employee.module.scss';
import back from 'assets/employee-page/Group 1992.svg';
import deleteIcon from 'assets/delete.svg';
import editIcon from 'assets/edit.svg';
import small from 'assets/mobile-view/crossSmall.svg';
import girl from 'assets/employee-page/Mask Group 3.svg';

const SingleEmployee = () => {
  const {
    Link,
    active,
    page,
    count,
    deletePopupOpen,
    deleteLoading,
    attendanceData,
    currentUser,
    loading,
    employeeData,
    pageSize,
    id,
    navigate,
    setCalendar,
    setActive,
    setPage,
    handleDelete,
    setDeletePopupOpen,
  } = useSingleEmployee();

  return (
    <>
      <CardContainer>
        {loading && (
          <div className={style.loaderDiv}>
            <Loading loaderClass={style.loadingStyle} />
          </div>
        )}
        <div className={style.heightFixed}>
          <NavLinks navLinkClass={style.navLink} links={[{ title: 'Employees', left: '45px' }]} />
          {currentUser?.role && currentUser?.role !== 'Employee' && (
            <Link to="/employee">
              <img src={back} alt="" className={style.imgBack} />
              <img src={small} alt="" className={style.imgSmall} />
            </Link>
          )}

          <div className={style.header}>
            <div className={style.employeeDetails}>
              <div style={{ width: '115px', height: '115px', borderRadius: '7px' }}>
                <img src={employeeData?.personalInformation?.img || girl} alt="" />
              </div>
              <div className={style.detail} style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <h3>
                    {employeeData?.personalInformation?.firstName}{' '}
                    {employeeData?.personalInformation?.lastName}
                  </h3>
                  {currentUser?.role !== 'Employee' && (
                    <div className={style.iconDiv}>
                      <img
                        src={editIcon}
                        alt=""
                        onClick={() => id && navigate(`/employee/edit/${id}`)}
                      />
                      <img src={deleteIcon} alt="" onClick={() => setDeletePopupOpen(true)} />
                    </div>
                  )}
                </div>

                <h5>{employeeData?.personalInformation?.employeeId} </h5>
              </div>
            </div>
            <div style={{ width: '100%s' }}>
              {active === 1 && <SingleEmployeeChart chartData={attendanceData?.chart} />}
            </div>
          </div>
        </div>

        <div className={style.tabs}>
          <div className={style.tabsDatePickerDiv}>
            <div style={{ position: 'absolute' }}>
              <div
                style={{
                  position: 'fixed',
                  height: '80px',
                  backgroundColor: '#FAFAFA',
                }}
              >
                <NavLinks links={links} setActive={setActive} active={active} />
              </div>
            </div>

            {active === 1 && (
              <div className={style.datePickerPosition}>
                <div
                  className={style.datePickerDiv}
                  style={{
                    position: 'fixed',
                    height: '80px',
                    backgroundColor: '#FAFAFA',
                  }}
                >
                  <DatePicker1 variant="double" setCalendar={setCalendar} />
                </div>
              </div>
            )}
          </div>
          <div style={{ paddingTop: '100px' }}>
            {active === 0 && <SingleEmployeeOverview employeeData={employeeData} />}
            {active === 1 && (
              <SingleEmployeeAttendance
                attendanceData={attendanceData?.attendances}
                setPage={setPage}
                count={count}
                pageSize={pageSize}
                page={page}
              />
            )}
            {active === 2 && <SingleEmployeeSalary employeeData={employeeData} />}
          </div>
        </div>
      </CardContainer>

      {deletePopupOpen && (
        <DeletePopup
          open={deletePopupOpen}
          setOpen={setDeletePopupOpen}
          handleDelete={handleDelete}
          btnLoader={deleteLoading}
        />
      )}
    </>
  );
};

export default SingleEmployee;

const links = [
  { title: 'Overview', left: '58px' },
  { title: 'Attendance', left: '60px' },
  { title: 'Salary Information', left: '37px' },
];
