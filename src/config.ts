export function axiosConfig() {
  const baseUrl = process.env.NUI_FEDERATION_API_URL
  const apiKey = process.env.NUI_FEDERATION_API_KEY

  if (!baseUrl) {
    throw new Error('Environment variable NUI_FEDERATION_API_URL is missing')
  }

  if (!apiKey) {
    throw new Error('Environment variable NUI_FEDERATION_API_KEY is missing')
  }

  return {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  }
}
