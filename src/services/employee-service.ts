import { ApiService } from './api-services';
import { EmployeeFilterData } from 'pages/employee-details/employee-cards-helper';

export default class EmployeeService {
  static baseUrl = ['employees', 'settings'];

  static async getAllEmployees(data?: any) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/`, {
      ...(data && {
        params: data,
      }),
    });
    return res;
  }
  static async getAllEmployeesID(data: string = '') {
    const res = await ApiService.get(
      `${
        EmployeeService.baseUrl[0]
      }/personal-information/get-new-employee-id/${data?.toLocaleLowerCase()}`,
    );
    return res;
  }
  // static async getAllEmployeesID(data: string = '') {
  //   const res = await ApiService.get(
  //     `${EmployeeService.baseUrl[0]}/generate-employee-id/${data?.toLowerCase()}`,
  //   );
  //   return res;
  // }

  static async getSearchedEmployees(data: EmployeeFilterData) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }
  static async getEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/personal-information/${id}`);
    return res;
  }
  static async getOverView(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/overview/${id}`);
    return res;
  }
  static async getAllDocuments(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/documents/all/${id}`);
    return res;
  }
  static async getSalary(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/salary-information/${id}`);
    return res;
  }
  static async getGenders(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/profile-setting/`);
    return res;
  }
  static async getDepartments(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/department-setting`);
    return res;
  }
  static async getDesignation(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/designation-setting/${id}`);
    return res;
  }
  static async getLeaves(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/leave-setting`);
    return res;
  }
  static async getAllowence(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/allownce-setting/`);
    return res;
  }
  static async getAddressEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/address-information/${id}`);
    return res;
  }
  static async getEmployeeAttendance(params: any) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/calculate-attendance`, {
      params: params,
    });
    return res;
  }
  static async addEmployee(data: any) {
    const res = await ApiService.post(`${EmployeeService.baseUrl[0]}/personal-information`, data);
    return res;
  }
  static async addCompany(data: any) {
    const res = await ApiService.post(`${EmployeeService.baseUrl[0]}/company-information`, data);
    return res;
  }
  static async updateAddedEmployee(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/personal-information/${id}`,
      data,
    );
    return res;
  }
  static async addPostCompany(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/company-information/${id}`,
      data,
    );
    return res;
  }

  static async getCompanyEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/company-information/${id}`);
    return res;
  }
  static async addPostEducation(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/education-information/${id}`,
      data,
    );
    return res;
  }
  static async getEducationEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/education-information/${id}`);
    return res;
  }
  static async addPostExperience(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/experience-information/${id}`,
      data,
    );
    return res;
  }
  static async getExperienceEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/experience-information/${id}`);
    return res;
  }
  static async addPostExperties(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/expertise-information/${id}`,
      data,
    );
    return res;
  }
  static async getExpertiesEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/expertise-information/${id}`);
    return res;
  }
  static async addPostPayroll(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/payroll-information/${id}`,
      data,
    );
    return res;
  }

  static async getPayrollEmployee(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/payroll-information/${id}`);
    return res;
  }
  static async addressAddPost(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${EmployeeService.baseUrl[0]}/address-information/${id}`,
      data,
    );
    return res;
  }
  static async deleteEmployee(id: string | number) {
    const res = await ApiService.delete(`${EmployeeService.baseUrl[0]}/${id}`);
    return res;
  }
  static async deleteDocument(id: string | number) {
    const res = await ApiService.delete(`${EmployeeService.baseUrl[0]}/documents/${id}`);
    return res;
  }

  static async getByIdDocument(id: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/documents/${id}`);
    return res;
  }

  static async addDocument(data: any) {
    const res = await ApiService.post(`${EmployeeService.baseUrl[0]}/documents`, data);
    return res;
  }

  static async updateDocument(data: any, id: string | Number) {
    const res = await ApiService.put(`${EmployeeService.baseUrl[0]}/documents/${id}`, data);
    return res;
  }

  static async getEmployeePayroll(id: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/${id}/payroll`);
    return res;
  }
}
