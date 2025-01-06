export function axiosConfig(baseUrl: string, apiKey: string) {
  if (!baseUrl || !apiKey) {
    throw new Error('Please provide a base URL and an API key')
  }

  return {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  }
}
