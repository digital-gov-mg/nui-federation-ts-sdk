import axios from 'axios'

export const fetchAccessToken = ({
  baseUrl,
  clientId,
  clientSecret,
}: {
  baseUrl: string
  clientId: string
  clientSecret: string
}) => {
  return axios.post(`${baseUrl}/sytems/token`, { clientId, clientSecret })
}

export const getAccessToken = () => {
  return sessionStorage.getItem('nui-access-token')
}

export const saveAccessToken = (accessToken) => {
  sessionStorage.setItem('nui-access-token', accessToken)
}
