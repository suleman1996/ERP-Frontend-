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
}
