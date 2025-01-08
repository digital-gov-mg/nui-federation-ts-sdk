import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { fetchAccessToken, getAccessToken, saveAccessToken } from './utils'

export abstract class Request {
  private client: AxiosInstance
  private accessToken: string | null
  private isAlreadyFetchingAccessToken: boolean

  constructor(
    baseUrl: string,
    apiKey: string,
    clientId: string,
    clientSecret: string,
  ) {
    if (!baseUrl || !apiKey || !clientId || !clientSecret) {
      throw new Error(
        'Please provide a base URL and an API key and client ID and client secret',
      )
    }

    this.accessToken = getAccessToken()
    this.isAlreadyFetchingAccessToken = false

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    })

    if (!this.accessToken) {
      fetchAccessToken({ baseUrl, clientId, clientSecret })
        .then((data) => {
          saveAccessToken(data)
        })
        .catch((error) => console.error(error))
    }

    this.client.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${this.accessToken}`
        return config
      },
      (error) => Promise.reject(error),
    )

    this.client.interceptors.response.use(null, (error) => {
      if (!error.response) return Promise.reject(error)

      const {
        config,
        response: { status },
      } = error
      const originalRequest = config

      if (status === 401 || status === 403) {
        if (!this.isAlreadyFetchingAccessToken) {
          this.isAlreadyFetchingAccessToken = true

          fetchAccessToken({ baseUrl, clientId, clientSecret })
            .then((data) => {
              this.isAlreadyFetchingAccessToken = false
              saveAccessToken(data)
            })
            .catch((error) => console.error(error))
        }

        return new Promise((resolve) => {
          originalRequest.headers.Authorization = `Bearer ${this.accessToken}`
          resolve(this.client(originalRequest))
        }).catch(() => {
          console.error('Stop request')
        })
      }

      return Promise.reject(error)
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
