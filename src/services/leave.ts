import { ApiService } from './api-services'

export default class LeaveService {
  static baseUrl = ['settings']

  static async AddLeave(data: any) {
    const res = await ApiService.post(
      `${LeaveService.baseUrl[0]}/leaveTypes`,
      data
    )
    return res
  }

  static async getAllLeaves() {
    const res = await ApiService.get(`${LeaveService.baseUrl[0]}/leaveTypes`)
    return res
  }

  static async deleteLeave(id: string) {
    const res = await ApiService.delete(
      `${LeaveService.baseUrl[0]}/leaveTypes/${id}`
    )
    return res
  }

  static async updateLeave(id: string, data: any) {
    const res = await ApiService.put(
      `${LeaveService.baseUrl[0]}/leaveTypes/${id}`,
      data
    )
    return res
  }
}
