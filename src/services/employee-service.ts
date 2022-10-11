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
  static async getGenders(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/profile-setting/`);
    return res;
  }
  static async getDepartments(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/department-setting`);
    return res;
  }
  static async getDesignation(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/designation-setting`);
    return res;
  }
  static async getLeaves(id?: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[1]}/leave-setting`);
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
  static async getEmployeePayroll(id: string | number) {
    const res = await ApiService.get(`${EmployeeService.baseUrl[0]}/${id}/payroll`);
    return res;
  }
}
