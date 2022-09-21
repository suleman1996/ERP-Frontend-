import { useEffect, useState } from "react";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import EmployeeService from "services/employee-service";
import { removeKeys } from "helper";

interface Props {
  handleBack: (data?: string) => void;
  handleNext: (data?: string) => void;
  formData: any;
  setFormData: any;
  employeeId: string;
}
interface Data {
  startDate: string;
  endDate: string;
  joiningDate: string;
  loginTime: string;
  logoutTime: string;
  workingTime?: string;
  probation: string;
}

export const useCompanyInfo = ({
  handleBack,
  handleNext,
  formData,
  setFormData,
  employeeId,
}: Props) => {
  const { id } = useParams();
  const [probation, setProbation] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (
      formData?.companyInformation !== undefined &&
      Object.keys(formData?.companyInformation)?.length
    ) {
      const temp = { ...formData?.companyInformation };
      reset({
        joiningDate: new Date(formData?.companyInformation?.joiningDate),
        department: formData?.companyInformation?.department,
        designation: formData?.companyInformation?.designation,
        annualLeaves: formData?.companyInformation?.annualLeaves,
        medicalLeaves: formData?.companyInformation?.medicalLeaves,
        casualLeaves: formData?.companyInformation?.casualLeaves,
        probationDurationDays: formData?.companyInformation?.probationDurationDays,
        employmentType: formData?.companyInformation?.employmentType,
        probation: formData?.companyInformation?.probation,
        note: formData?.companyInformation?.note,
        workingHours: formData?.companyInformation?.workingHours,
        loginTime: formData?.companyInformation?.loginTime,
        logoutTime: formData?.companyInformation?.logoutTime,
        startDate: formData?.companyInformation
          ? new Date(formData?.companyInformation?.startDate)
          : "",
        endDate: formData?.companyInformation
          ? new Date(formData?.companyInformation?.endDate)
          : "",
        probationEndDate: temp?.probationEndDate ? new Date(temp?.probationEndDate) : "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    id && getSingleEmployeeData();
  }, []);

  const getSingleEmployeeData = async () => {
    const res = await EmployeeService.getEmployee(id);

    // it is helpfull for put api integration //

    // reset({
    //   joiningDate: new Date(res?.data?.companyInformation?.joiningDate),
    //   department: res?.data?.companyInformation?.department,
    //   designation: res?.data?.companyInformation?.designation,
    //   annualLeaves: res?.data?.companyInformation?.annualLeaves,
    //   medicalLeaves: res?.data?.companyInformation?.medicalLeaves,
    //   casualLeaves: res?.data?.companyInformation?.casualLeaves,
    //   probationDurationDays: res?.data?.companyInformation?.probationDurationDays,
    //   employmentType: res?.data?.companyInformation?.employmentType,
    //   probation: res?.data?.companyInformation?.probation,
    //   note: res?.data?.companyInformation?.note,
    //   workingTime: res?.data?.companyInformation?.workingTime,
    //   loginTime: res?.data?.companyInformation?.loginTime,
    //   logoutTime: res?.data?.companyInformation?.logoutTime,
    //   startDate: res?.data?.companyInformation
    //     ? new Date(res?.data?.companyInformation?.startDate)
    //     : '',
    //   endDate: res?.data?.companyInformation
    //     ? new Date(res?.data?.companyInformation?.endDate)
    //     : '',
    //   probationEndDate: res?.data?.companyInformation?.probationEndDate
    //     ? new Date(res?.data?.companyInformation?.probationEndDate)
    //     : '',
    // });
  };

  const onSubmit = async (data: Data) => {
    setBtnLoader(true);
    setFormData({ ...formData, companyInformation: { ...data } });
    removeKeys(data, ["startDate", "endDate"]);
    const { joiningDate, loginTime, probation, workingTime, logoutTime } = data;
    if (id) {
      const userData = {
        type: 3,
        companyInformation: {
          ...data,
          joiningDate: moment(joiningDate).format("YYYY-MM-DD"),
          workingHours: workingTime && moment(workingTime, "HH:mm").format("hh:mm a"),
          loginTime: loginTime && moment(loginTime, "HH:mm").format("hh:mm a"),
          logoutTime: logoutTime && moment(logoutTime, "HH:mm").format("hh:mm a"),

          probation: probation === "true" ? true : false,
        },
        employeeId: employeeId.toUpperCase(),
      };
      const res = await EmployeeService.updateAddedEmployee(userData, id);
      if (res.status === 200) {
        handleNext("Education");
      }
    } else {
      const res = await EmployeeService.addEmployee({
        type: 3,
        companyInformation: {
          ...data,
          joiningDate: moment(joiningDate).format("YYYY-MM-DD"),
          workingHours: workingTime && moment(workingTime, "HH:mm").format("hh:mm a"),
          loginTime: loginTime && moment(loginTime, "HH:mm").format("hh:mm a"),
          logoutTime: logoutTime && moment(logoutTime, "HH:mm").format("hh:mm a"),

          probation: probation === "true" ? true : false,
        },
        employeeId: employeeId,
      });
      if (res.status === 201) {
        handleNext("Education");
      }
    }
    setBtnLoader(false);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    control,
    watch,
    btnLoader,
    setProbation,
    probation,
  };
};

export const schema = yup.object().shape({
  joiningDate: yup.string().required("Joining date is a required field"),
  annualLeaves: yup.string().required("Annual leaves are a required field"),
  medicalLeaves: yup.string().required("Medical leaves are a required field"),
  casualLeaves: yup.string().required("Casual leaves are a required field"),
  department: yup.string().required("Department is a required field"),
  designation: yup.string().required("Designation is a required field"),
  note: yup.string().required("Note is a required field"),
  employmentType: yup.string().required("employmentType is a required field"),
  workingHours: yup.string().when("employmentType", {
    is: "Part-Time",
    then: yup.string().required("Working time is required."),
  }),
  loginTime: yup.string().when("employmentType", {
    is: "Full-Time",
    then: yup.string().required("login time is required."),
  }),
  logoutTime: yup.string().when("employmentType", {
    is: "Full-Time",
    then: yup.string().required("Logout time is required."),
  }),
});

export const selectCountry = [
  {
    value: "hr",
    description: "Hr",
  },
  {
    value: "employee",
    description: "Employee",
  },
  {
    value: "admin",
    description: "Admin",
  },
];

export const employmentType = [
  {
    value: "Part-Time",
    description: "Part-Time",
  },
  {
    value: "Full-Time",
    description: "Full-Time",
  },
];

export const department = [
  {
    value: "Front-end Developer",
    description: "Front-end Developer",
  },
  {
    value: "Backend-developer",
    description: "Backend-developer",
  },
];
