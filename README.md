# Nui Federation TypeScript SDK

This SDK connects to the NUI Federation API for getting or creating, revoke, generating batch for NUI from the API.


## Installation

### Package Manager

```sh
npm install @ugd/nui-federation-ts-sdk
```

# Example

```ts
import NuiFederation from "@ugd/nui-federation-ts-sdk";

const nuiFederation = NuiFederation({})

// GET OR CREATE NUI
nuiFederation.getOrCreate({})
    .then((res) => console.log(res))
    .catch(err) => console.log(err))

```