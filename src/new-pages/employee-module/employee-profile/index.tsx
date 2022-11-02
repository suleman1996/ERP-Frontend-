import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CvView from './cv-view';
import ProfileView from './profile-view';
import Button from 'new-components/button';
import Pagination from 'new-components/pagination';
import EmployeeDropdown from 'new-components/employee-card-dropdown';
import EmployeeProfileCard from 'new-components/employee-profile-card';

import EmployeeService from 'services/employee-service';

import filter from 'new-assets/filter-icon.svg';
import plus from 'new-assets/add.svg';
import style from './employee-profile.module.scss';
import Loading from 'new-components/loading';
import EmployeeFilter from 'pages/employee-details/employee-filter';

interface Employee {
  handleClick?: any;
  profilePicture: string;
  fullName: string;
  firstName: string;
  lastName: string;
  companyInformation: any;
  department: string;
  phone: string;
  id: string;
  _id: string;
  employeeId: string;
}

const EmployeeProfileDetails = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);

  useEffect(() => {
    getEmployeesData();
  }, [pageSize, page, pageSize]);

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await EmployeeService.getAllEmployees({ pageSize: pageSize, page: page - 1 });
    if (res?.status === 200) {
      setEmployees(res?.data?.employees[0]?.data);
      setTotalCount(res.data?.employees[0]?.count);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={style.loaderDiv}>
          <Loading loaderClass={style.loadingStyle} />
        </div>
      )}
      <div className={style.main}>
        <div className={style.headerFlex}>
          <img src={filter} alt="" className={style.img} onClick={() => setOpenFilter(true)} />

          <Button
            text="Add Employee"
            type="button"
            handleClick={() => navigate('/employee/add')}
            iconStart={plus}
          />
        </div>
        <EmployeeFilter
          open={openFilter}
          setOpen={setOpenFilter}
          setEmployees={setEmployees}
          getEmployeesData={getEmployeesData}
        />
        {employees?.length > 0 ? (
          <div className={style.cardSection}>
            {employees?.map(
              (
                {
                  profilePicture,
                  fullName,
                  firstName,
                  lastName,
                  companyInformation,
                  phone,
                  id,
                  employeeId,
                  department,
                  _id,
                }: Employee,
                index,
              ) => (
                <>
                  <div key={employeeId} style={{ position: 'relative' }}>
                    <EmployeeProfileCard
                      img={profilePicture}
                      name={`${firstName} ${lastName}`}
                      designation={companyInformation?.designationInformation?.name}
                      department={companyInformation?.departmentInformation?.name}
                      phone={phone}
                      id={employeeId}
                      handleClick={() =>
                        setOpen((prev) => (prev === employeeId ? null : employeeId))
                      }
                    />
                    {open === employeeId && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '85%',
                          padding: '15px',
                          zIndex: 2000,
                        }}
                      >
                        <div onClick={() => setOpen(null)} className={style.absoluteClass}></div>
                        <div style={{ zIndex: 2600, width: '145px' }}>
                          <EmployeeDropdown
                            setOpenModal={setOpenModal}
                            setOpenModalProfile={setOpenModalProfile}
                            id={_id}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ),
            )}
          </div>
        ) : (
          <h1 style={{ textAlign: 'center', marginTop: '20px' }}>No Record Found</h1>
        )}
      </div>
      <div className={style.position}>
        <Pagination
          setCount={setPageSize}
          count={pageSize}
          totalCount={totalCount}
          setPage={setPage}
          page={page}
        />
      </div>
      <CvView openModal={openModal} setOpenModal={setOpenModal} id={open} />
      <ProfileView
        openModalProfile={openModalProfile}
        setOpenModalProfile={setOpenModalProfile}
        id={open}
      />
    </>
  );
};

export default EmployeeProfileDetails;
