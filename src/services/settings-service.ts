import { ApiService } from './api-services';
import { GeneralSettingUpdateUser } from 'pages/settings/general-settings/helper';
import { ManageAccountsEditEmployee } from 'pages/settings/manage-accounts/manage-accounts-helper';

export default class SettingsService {
  static baseUrl = ['settings'];

  static async addDepartment(data: any) {
    const res = await ApiService.post(`${SettingsService.baseUrl[0]}/department-setting`, data);
    return res;
  }

  static async updateDepartment(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/department-setting/${id}`,
      data,
    );
    return res;
  }

  static async deleteDepartment(id: string | number) {
    const res = await ApiService.delete(`${SettingsService.baseUrl[0]}/department-setting/${id}`);
    return res;
  }

  static async getDepartments(id?: string | number) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/department-setting`);
    return res;
  }

  //////////////   designation ////////////////////

  static async getDesignation(id?: string | number) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/designation-setting/all`);
    return res;
  }

  static async addDesignation(data: any) {
    const res = await ApiService.post(`${SettingsService.baseUrl[0]}/designation-setting/`, data);
    return res;
  }

  static async deleteDesignation(id: string | number) {
    const res = await ApiService.delete(`${SettingsService.baseUrl[0]}/designation-setting/${id}`);
    return res;
  }

  static async updateDesignation(data: any, id: string | Number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/designation-setting/${id}`,
      data,
    );
    return res;
  }

  ////////////////////////////////////////////////////////////////////////////

  static async getUserData(id: string | number) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/${id}`);
    return res;
  }

  static async getAllUsers(data?: any) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/`, {
      params: data,
    });
    return res;
  }

  static async editEmployee(id: string, employeeData: ManageAccountsEditEmployee) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/${id}/manage-account`,
      employeeData,
    );
    return res;
  }

  static userUpdate(id: string | number, credentials: GeneralSettingUpdateUser) {
    const res = ApiService.put(`${SettingsService.baseUrl[0]}/${id}/general`, credentials);

    return res;
  }

  static async deleteEmployee(id: string | number) {
    const res = await ApiService.delete(`${SettingsService.baseUrl[0]}/${id}`);
    return res;
  }
}
