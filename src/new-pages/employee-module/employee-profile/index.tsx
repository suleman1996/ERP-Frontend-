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
import user from 'new-assets/user-img.svg';
import style from './employee-profile.module.scss';
import Loading from 'new-components/loading';
import EmployeeFilter from 'pages/employee-details/employee-filter';

interface Employee {
  handleClick?: any;
  profilePicture: string;
  fullName: string;
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
  const [userId, setUserId] = useState<string>();
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);

  useEffect(() => {
    getEmployeesData();
  }, [count, page]);

  const handleClick = (index: any) => {
    if (index === open) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const getEmployeesData = async () => {
    setLoading(true);
    const res = await EmployeeService.getAllEmployees({ pageSize: count, page });
    console.log('res', res?.data?.employees);
    if (res?.status === 200) {
      setEmployees(res?.data?.employees[0].data);
      setTotalCount(res.data?.employees[0].count);
      console.log('count', res.data?.employees[0].count);
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
            text="Add Account"
            type="button"
            handleClick={() => navigate('/employee/add')}
            iconStart={plus}
          />
        </div>
        <EmployeeFilter open={openFilter} setOpen={setOpenFilter} setCount={setCount} />

        <div className={style.cardSection}>
          {employees?.map(
            (
              {
                profilePicture,
                fullName,
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
                <div key={index} style={{ position: 'relative' }}>
                  <EmployeeProfileCard
                    img={profilePicture}
                    name={fullName}
                    designation={companyInformation?.designationInformation?.name}
                    department={companyInformation?.departmentInformation?.name}
                    phone={phone}
                    id={employeeId}
                    handleClick={() => handleClick(index)}
                  />
                  {open === index && (
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
                          handleClick={() => setUserId(id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ),
          )}
        </div>
      </div>
      <div className={style.position}>
        <Pagination setCount={setCount} count={count} totalCount={totalCount} />
      </div>
      <CvView openModal={openModal} setOpenModal={setOpenModal} id={userId} />
      <ProfileView
        openModalProfile={openModalProfile}
        setOpenModalProfile={setOpenModalProfile}
        id={userId}
      />
    </>
  );
};

export default EmployeeProfileDetails;
