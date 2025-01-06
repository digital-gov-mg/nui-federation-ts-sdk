import { UIN } from './uin-service'

export default class NuiFederation {
  public uin: UIN

  constructor() {
    this.uin = new UIN()
  }
}
