# Nui Federation TypeScript SDK

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/digital-gov-mg/nui-federation-ts-sdk/build.yml?style=for-the-badge)
![NPM License](https://img.shields.io/npm/l/%40digital-gov-mg%2Fnui-federation-ts-sdk?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/%40digital-gov-mg%2Fnui-federation-ts-sdk?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40digital-gov-mg%2Fnui-federation-ts-sdk?style=for-the-badge)

This TypeScript SDK connects to the NUI Federation API for getting or creating, revoke, generating batch for NUI from the API.

## Installation

### Package Manager

```sh
npm install nui-federation-ts-sdk
```

# Example

```ts
import NuiFederation from '@digital-gov-mg/nui-federation-ts-sdk'

// Initialize NUIFederation
const baseUrl = 'https://example.com/api'
const clientId = 'your-client-id'
const clientSecret = 'your-client'

const nuiFederation = new NuiFederation(baseUrl, clientId, clientSecret)

// Example 1: Get or Create UIN
citizenDatas = [
  {
    externalId: '123',
    firstname: 'John',
    lastname: 'Doe',
    dateOfBirth: '2000-01-01',
    birthCertificateId: 'BC123',
    motherName: 'Jane Doe',
  },
]

try {
  const res = await nuiFederation.uin.getOrCreate(citizenDatas)
  console.log('UIN Response:', res)
} catch (err) {
  console.log('Error creating or fetching UIN:', err.message)
}

// Example 2: Revoke a UIN
const uin = '1234567890'
try {
  const res = await nuiFederation.uin.revoke(uin)
  console.log('Revoke UIN Response:', res)
} catch (err) {
  console.log('Error revoking UIN:', err.message)
}

// Example 3: Generate UIN Batch
const count = 5
try {
  const res = await nuiFederation.uin.generateBatch(count)
  console.log('Generate UIN Batch Response:', res)
} catch (err) {
  console.log('Error generating UIN Batch:', err.message)
}
```
