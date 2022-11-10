import { Dispatch, SetStateAction } from 'react';
import { ApiService } from './api-services';

export default class PolicyService {
  static baseUrl = ['policy'];

  static async getAllPolicies(params?: any) {
    const res = await ApiService.get(`${PolicyService.baseUrl[0]}/`, {
      params,
    });
    return res;
  }

  static async getPolicyById(id: string) {
    const res = await ApiService.get(`${PolicyService.baseUrl[0]}/${id}`);
    return res;
  }

  static async addPolicy(data: any, setUploadPercentage: Dispatch<SetStateAction<number>>) {
    const res = await ApiService.post(`${PolicyService.baseUrl[0]}/`, data, {
      onUploadProgress: (progressEvent: any) => {
        setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    });
    return res;
  }

  static async addObseletePolicyApi(id: any, data: any) {
    const res = await ApiService.put(`${PolicyService.baseUrl[0]}/obselete/${id}`, data);
    return res;
  }

  static async addPolicyApi(data: any) {
    const res = await ApiService.post(`${PolicyService.baseUrl[0]}/`, data);
    return res;
  }

  static async addRevisionPolicyApi(id: any, data: any) {
    const res = await ApiService.put(`${PolicyService.baseUrl[0]}/version/${id}`, data);
    return res;
  }

  static async updatePolicyApi(data: any, id: string) {
    const res = await ApiService.put(`${PolicyService.baseUrl[0]}/${id}`, data);
    return res;
  }

  static async updatePolicy(
    id: string,
    data: any,
    setUploadPercentage: Dispatch<SetStateAction<number>>,
  ) {
    const res = await ApiService.put(`${PolicyService.baseUrl[0]}/${id}`, data, {
      onUploadProgress: (progressEvent: any) => {
        setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total));
      },
    });
    return res;
  }

  static async deletePolicy(id: string) {
    const res = await ApiService.delete(`${PolicyService.baseUrl[0]}/${id}`);
    return res;
  }
}
