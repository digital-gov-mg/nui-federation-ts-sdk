import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { axiosConfig } from './config'

export abstract class Base {
  private client: AxiosInstance

  constructor(baseUrl: string, apiKey: string) {
    this.client = axios.create(axiosConfig(baseUrl, apiKey))
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
