import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CvView from "./cv-view";
import ProfileView from "./profile-view";
import Button from "new-components/button";
import Pagination from "new-components/pagination";
import EmployeeDropdown from "new-components/employee-card-dropdown";
import EmployeeProfileCard from "new-components/employee-profile-card";

import EmployeeService from "services/employee-service";

import filter from "new-assets/filter-icon.svg";
import plus from "new-assets/add.svg";
import user from "new-assets/user-img.svg";
import style from "./employee-profile.module.scss";

interface Employee {
  handleClick?: any;
  img: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  id: string;
}

const EmployeeProfileDetails = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);

  useEffect(() => {
    getEmployeesData();
  }, []);

  useEffect(() => {
    getEmployeesData();
  }, []);

  const handleClick = (index: any) => {
    if (index === open) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  const getEmployeesData = async () => {
    const res = await EmployeeService.getAllEmployees({ pageSize: 20, page: 0 });
    if (res?.status === 200) {
      setEmployees(res.data.employees);
    }
  };

  return (
    <>
      <div className={style.main}>
        <div className={style.headerFlex}>
          <img src={filter} alt="" className={style.img} />
          <Button
            text="Add Account"
            type="button"
            handleClick={() => navigate("/employee/add")}
            iconStart={plus}
          />
        </div>
        <div className={style.cardSection}>
          {employees?.map(({ img, name, designation, phone, id, department }: Employee, index) => (
            <>
              <div key={index} style={{ position: "relative" }}>
                <EmployeeProfileCard
                  img={img}
                  name={name}
                  designation={designation}
                  phone={phone}
                  id={id}
                  department={department}
                  handleClick={() => handleClick(index)}
                />
                {open === index && (
                  <div
                    style={{
                      position: "absolute",
                      top: "85%",
                      padding: "15px",
                      zIndex: 2000,
                    }}
                  >
                    <div onClick={() => setOpen(null)} className={style.absoluteClass}></div>
                    <div style={{ zIndex: 2600, width: "145px" }}>
                      <EmployeeDropdown
                        setOpenModal={setOpenModal}
                        setOpenModalProfile={setOpenModalProfile}
                        id={id}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={style.position}>
        <Pagination />
      </div>
      <CvView openModal={openModal} setOpenModal={setOpenModal} />
      <ProfileView openModalProfile={openModalProfile} setOpenModalProfile={setOpenModalProfile} />
    </>
  );
};

export default EmployeeProfileDetails;

const cardData = [
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
  {
    name: "John Virked",
    designation: "UI Designer",
    department: "Design",
    phone: "+92 333 8494808",
    id: "SPX001",
    img: user,
  },
];
