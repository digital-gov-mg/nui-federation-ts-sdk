export const axiosConfig = () => {
  const baseUrl =
    process.env.NUI_FED_API_URL || 'https://staging-api.registry.digital.gov.mg'
  const apiKey = process.env.NUI_FED_API_KEY

  if (!apiKey) {
    throw new Error('Environment variable NUI_FED_API_KEY is missing')
  }

  return {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
  }
}
