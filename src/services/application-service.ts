import { ApiService } from './api-services'

export default class ApplicationService {
  static baseUrl = ['applications']

  static async getAllLeaveApplications(data?: {
    page: number
    pageSize: number
  }) {
    const res = await ApiService.get(`${ApplicationService.baseUrl[0]}/`, {
      ...(data && {
        params: data,
      }),
    })
    return res
  }

  static async applyApplication(data: any) {
    const res = await ApiService.post(`${ApplicationService.baseUrl[0]}/`, data)
    return res
  }

  static async editApplication(data: any) {
    const res = await ApiService.put(`${ApplicationService.baseUrl[0]}/`, data)
    return res
  }

  static async getLeaveHistory() {
    const res = await ApiService.get(`${ApplicationService.baseUrl[0]}/history`)
    return res
  }

  static async deleteApplication(id: string) {
    const res = await ApiService.delete(
      `${ApplicationService.baseUrl[0]}/${id}`
    )
    return res
  }

  static async getPendingApplications(data?: {
    page: number
    pageSize: number
  }) {
    const res = await ApiService.get(
      `${ApplicationService.baseUrl[0]}/approvals`,
      {
        ...(data && {
          params: data,
        }),
      }
    )
    return res
  }

  static async approveApplication(id: string, obj: any) {
    const res = await ApiService.post(
      `${ApplicationService.baseUrl[0]}/approve/${id}`,
      obj
    )
    return res
  }

  static async addLeaveQuotaApi(obj: any) {
    const res = await ApiService.post('leave-quota', obj)
    return res
  }

  static async editLeaveQuotaApi(id: string, obj: any) {
    const res = await ApiService.put(`leave-quota/${id}`, obj)
    return res
  }

  static async getAllQuotaLeavesApi() {
    const res = await ApiService.get('leave-quota')
    return res
  }

  static async deleteQuotaLeavesApi(id: string) {
    const res = await ApiService.delete(`leave-quota/${id}`)
    return res
  }
}
