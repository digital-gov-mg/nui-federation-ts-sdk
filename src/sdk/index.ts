import { Uin } from './uin'

export class NuiFederation {
  public uin: Uin

  constructor(baseUrl: string, clientId: string, clientSecret: string) {
    this.uin = new Uin(baseUrl, clientId, clientSecret)
  }
}
