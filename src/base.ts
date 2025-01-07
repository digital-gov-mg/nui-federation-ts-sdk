import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export abstract class Base {
  private client: AxiosInstance

  constructor(baseUrl: string, apiKey: string) {
    if (!baseUrl || !apiKey) {
      throw new Error('Please provide a base URL and an API key')
    }

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    })
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
