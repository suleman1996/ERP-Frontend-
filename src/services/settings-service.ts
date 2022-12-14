import { ApiService } from './api-services'
import { ManageAccountsEditEmployee } from 'pages/settings/manage-accounts/manage-accounts-helper'
import { GeneralSettingUpdateUser } from 'pages/settings/general-settings/helper'

export default class SettingsService {
  static baseUrl = ['settings', '']

  static async switchUser(id, data) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[1]}/users/toggle/${id}`,
      data
    )
    return res
  }

  static async switchUserPolicy(id, data) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/policyCategory/toggle/${id}`,
      data
    )
    return res
  }

  static async updateRole(id, data) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/customRoles/${id}`,
      data
    )
    return res
  }

  static async resetPasswordAdmin(id, data) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[1]}/users/reset/${id}`,
      data
    )
    return res
  }

  static async addDepartment(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[0]}/department-setting`,
      data
    )
    return res
  }

  static async addPolicy(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[0]}/policyCategory`,
      data
    )
    return res
  }

  static async updateDepartment(data: any, id: string | number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/department-setting/${id}`,
      data
    )
    return res
  }

  static async updatePolicy(data: any, id: string | number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/policyCategory/${id}`,
      data
    )
    return res
  }

  static async deleteDepartment(id: string | number) {
    const res = await ApiService.delete(
      `${SettingsService.baseUrl[0]}/department-setting/${id}`
    )
    return res
  }

  static async emailVerify(id: string | number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/verifyEmailLink/${id}`,
      {}
    )
    return res
  }

  static async getDepartments() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/department-setting`
    )
    return res
  }
  static async getAllAccessLevels() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/accessLevels`
    )
    return res
  }

  static async getAllPolicies() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/policyCategory`
    )
    return res
  }

  static async getDesignation() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/designation-setting/all`
    )
    return res
  }

  static async getUsers(data?: any) {
    const res = await ApiService.get(`${SettingsService.baseUrl[1]}/users`, {
      ...(data && {
        params: data,
      }),
    })
    return res
  }

  static async updateUser(data, id) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[1]}/users/${id}`,
      data
    )
    return res
  }

  static async deleteUser(id) {
    const res = await ApiService.delete(
      `${SettingsService.baseUrl[1]}/users/${id}`
    )
    return res
  }

  static async getUserById(id?: string | number) {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[1]}/users/${id}`
    )
    return res
  }

  static async addDesignation(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[0]}/designation-setting/`,
      data
    )
    return res
  }

  static async deleteDesignation(id: string | number) {
    const res = await ApiService.delete(
      `${SettingsService.baseUrl[0]}/designation-setting/${id}`
    )
    return res
  }

  static async deletePolicy(id: string | number) {
    const res = await ApiService.delete(
      `${SettingsService.baseUrl[0]}/policyCategory/${id}`
    )
    return res
  }

  static async updateDesignation(data: any, id: string | number) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/designation-setting/${id}`,
      data
    )
    return res
  }

  static async getUserData(id: string | number) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/${id}`)
    return res
  }

  static async getPolicyCat() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/policyCategory`
    )
    return res
  }

  static async getAllUsers(data?: any) {
    const res = await ApiService.get(`${SettingsService.baseUrl[0]}/`, {
      params: data,
    })
    return res
  }

  static async getAllCustomRoles(data?: any) {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/customRoles`,
      {
        params: data,
      }
    )
    return res
  }

  static async editEmployee(
    id: string,
    employeeData: ManageAccountsEditEmployee
  ) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/${id}/manage-account`,
      employeeData
    )
    return res
  }

  static userUpdate(
    id: string | number,
    credentials: GeneralSettingUpdateUser
  ) {
    const res = ApiService.put(
      `${SettingsService.baseUrl[0]}/${id}/general`,
      credentials
    )

    return res
  }

  static async deleteEmployee(id: string | number) {
    const res = await ApiService.delete(`${SettingsService.baseUrl[0]}/${id}`)
    return res
  }

  ///////////// Account Setting //////////

  static async updateAccount(data: any) {
    const res = await ApiService.put(
      `${SettingsService.baseUrl[0]}/accountSetting/`,
      data
    )
    return res
  }

  static async resendEmail(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[0]}/resendConfirmationEmail/`,
      data
    )
    return res
  }

  static async addUser(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[1]}/users`,
      data
    )
    return res
  }

  static async addCustomRole(data: any) {
    const res = await ApiService.post(
      `${SettingsService.baseUrl[0]}/customRoles`,
      data
    )
    return res
  }

  static async getLeaveTypesApi() {
    const res = await ApiService.get(
      `${SettingsService.baseUrl[0]}/leaveTypes`,
      { params: { balance: true } }
    )
    return res
  }
}
