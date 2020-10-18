import { me as appbit } from "appbit";

export default class PermissionHelper {

  static exerciseAvailable() {
    return permissionAvailable("access_exercise")
  }

  static heartRateAvailable() {
    return permissionAvailable("access_heart_rate")
  }

  static activityAvailable() {
    return permissionAvailable("access_activity")
  }

  private

  static permissionAvailable(permissionName) {
    return appbit.permissions.granted(permissionName)
  }



}

