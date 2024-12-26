import { UIN } from './api/uin'

export default class NuiFederation {
  public uin: UIN

  constructor() {
    this.uin = new UIN()
  }
}
