import Activity from "../utils/activity";

export const MAX_RUNNING_SPEED = 18000;
export const MAX_CYCLING_SPEED = 50000;

export default class ActivityService {
  constructor() {}

  saveActivity(activity: Activity) {
    this.isValid(activity);
  }

  isValid(activity: Activity): boolean {
    switch (activity.sport) {
      case "CYCLING":
        return this.isValidCycling(activity);
      case "RUNNING":
        return this.isValidRunning(activity);
    }
  }

  isValidRunning(activity: Activity): boolean {
    return (
      activity.distance / (activity.duration / (1000 * 3600)) <=
      MAX_RUNNING_SPEED
    );
  }

  isValidCycling(activity: Activity): boolean {
    return (
      activity.distance / (activity.duration / (1000 * 3600)) <=
      MAX_CYCLING_SPEED
    );
  }
}
