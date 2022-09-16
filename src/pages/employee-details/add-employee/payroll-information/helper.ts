import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { removeKey } from 'main-helper';

export const usePayrollInfo = ({ setFormData, formData, employeeId }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const temp = removeKey({ ...data });
    setFormData({
      ...formData,
      payrollDetail: { ...temp },
    });
    if (!id) {
      setIsLoading(true);
      const res = await EmployeeService.addEmployee({
        type: 5,
        payrollDetail: { ...data },
        employeeId,
      });
      if (res.status === 201) {
        navigate(`/employee`);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const res = await EmployeeService.updateAddedEmployee(
        {
          type: 5,
          employeeId,
          payrollDetail: { ...data },
        },
        id,
      );
      if (res.status === 200) {
        id && navigate(`/employee/${id}`);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(formData?.payrollDetail)?.length) {
      const temp = { ...formData?.payrollDetail };
      reset({
        ...temp,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    errors,
    register,
    handleSubmit,
    onSubmit,
  };
};

const schema = yup
  .object()
  .shape({
    basicSalary: yup.string().required('Basic Salary is required'),
    houseRentAllowance: yup.string().optional(),
    conveyanceAllowance: yup.string().optional(),
    medicalAllowance: yup.string().optional(),
    spacialAllowance: yup.string().optional(),
    bankName: yup.string().required('Bank Name is a required '),
    accountHolderName: yup
      .string()
      .required()
      .matches(/^[A-Za-z ]*$/, 'Only alphabets are allowed'),
    accountNumber: yup
      .string()
      .required('AccountNumber is a required ')
      .min(11, 'AccountNumber must be at least 11 characters')
      .max(20, 'AccountNumber must be at most 20 characters'),
  })
  .required();

export const banksData = [
  'ALBARAKA BANK (PAKISTAN)LIMITED',
  'ALFALAH SECURITIES (PRIVATE) LIMITED',
  'ALI HUSSAIN RAJABALI (BROKERS)',
  'ALLIED BANK LIMITED',
  'AMERICAN EXPRESS BANK LTD.',
  'AQEEL KARIM DHEDHI (BROKERS)',
  'ARIF HABIB LIMITED',
  'ASKARI BANK LIMITED',
  'ASKARIBANK LIMITED',
  'AZIZ FIDA HUSSAIN (BROKERS)',
  'B. SALEEM GAZIPURA (BROKERS)',
  'BANK AL HABIB LIMITED',
  'BANK ALFALAH LIMITED',
  'BANK OF CHINA LIMITED KARACHI BRANCH',
  'BANK OF KHYBER, THE',
  'BANK OF PUNJAB, THE',
  'BANK OF TOKYO-MITSUBISHI UFJ, LTD., THE',
  'BANKISLAMI PAKISTAN LIMITED',
  'BHAYANI SECURITIES (PVT) LTD.',
  'BMA CAPITAL MANAGEMENT LIMITED',
  'CENTRAL DEPOSITORY COMPANY OF PAKISTAN LIMITED',
  'CITIBANK N.A.',
  'DEUTSCHE BANK AG, ISLAMABAD BRANCH',
  'DEUTSCHE BANK AG, KARACHI BRANCH',
  'DEUTSCHE BANK AG, LAHORE BRANCH',
  'DUBAI ISLAMIC BANK PAKISTAN LIMITED',
  'EFG HERMES PAKISTAN LIMITED',
  'ELIXIR SECURITIES PAKISTAN (PVT) LTD',
  'FAISAL ISLAMIC BANK OF BAHRAIN',
  'FAYSAL BANK LIMITED',
  'FIRST CAPITAL EQUITIES LIMITED',
  'FIRST WOMEN BANK LIMITED',
  'HABIB BANK LIMITED',
  'HABIB METROPOLITAN BANK LIMITED',
  'HSBC BANK OMAN S.A.O.G. (FORMERLY OMAN INTERNATIONAL BANK)',
  'I. PURI SECURITIES (PVT) LIMITED',
  'IFIC BANK LTD',
  'IGI FINEX SECURITIES',
  'INDUSTRIAL AND COMMERCIAL BANK OF CHINA, KARACHI BRANCH',
  'INSIGHT SECURITIES (PRIVATE) LTD',
  'INTERMARKET SECURITIES LIMITED',
  'INVISOR SECURITIES (PVT) LIMITED',
  'JARDINE FLEMING PAKISTAN LTD.',
  'JEHANGIR SIDDIQUI AND CO . LIMITED',
  'JS BANK LIMITED',
  'JS GLOBAL CAPITAL LTD.',
  'KARACHI STOCK EXCHANGE (GUARANTEE) LIMITED, THE',
  'KHADIM ALI SHAH BUKHARI AND CO. LTD',
  'MAJEED ADAM',
  'MCB BANK LIMITED',
  'MCB ISLAMIC BANK LIMITED',
  'MEEZAN BANK LIMITED',
  'NATIONAL BANK OF PAKISTAN',
  'NEXT CAPITAL LIMITED',
  'OPTIMUS CAPITAL MANAGEMENT (PVT) LTD',
  'PAKISTAN KUWAIT INVESTMENT COMPANY PRIVATE LIMITED',
  'PAKISTAN TOBACCO COMPANY LIMITED',
  'PAKLIBYA HOLDING COMPANY (PRIVATE) LIMITED',
  'ROYAL EXCHANGE LTD',
  'RUPALI BANK LIMITED',
  'SAMBA BANK LIMITED',
  'SILK FINANCE',
  'SILKBANK LIMITED',
  'SINDH BANK LIMITED',
  'SME BANK LTD',
  'SOCIETE GENERALE, THE FRENCH AND INTERNATIONAL BANK',
  'SONERI BANK LIMITED',
  'STANDARD CHARTERED BANK (PAKISTAN) LIMITED',
  'STATE BANK OF PAKISTAN',
  'SULTAN GHULAM HUSEIN DATTOO (BROKERS)',
  'SUMMIT BANK LTD',
  'TAURUS SECURITIES LIMITED',
  'THE ROYAL BANK OF SCOTLAND LIMITED',
  'TOPLINE SECURITIES PVT LTD.',
  'TRUST BANK LIMITED',
  'TRUST INVESTMENT BANK LIMITED',
  'UNITED BANK LIMITED',
  'WALL STREET EXCHANGE COMPANY (PVT) LTD.',
];
