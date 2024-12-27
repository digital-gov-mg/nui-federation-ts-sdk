import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { axiosConfig } from '../config/axios'

export abstract class Base {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create(axiosConfig())
  }

  protected async request<T>(
    endpoint: string,
    options?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await this.client.request<T>({
        url: endpoint,
        ...options,
      })

      return response.data
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred while sending request'

      throw new Error(errorMessage)
    }
  }
}
