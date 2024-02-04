import ActivityRepo from "../repositories/activity";
import Activity from "../utils/activity";

export const MAX_RUNNING_SPEED = 18000;
export const MAX_CYCLING_SPEED = 50000;

export default class ActivityService {
  activityRepo: ActivityRepo;

  constructor() {
    this.activityRepo = new ActivityRepo();
  }

  async saveActivity(activity: Activity) {
    const isValid = this.isValid(activity);

    const existinActivity = await this.activityRepo.findByUserInPeriod({
      userId: activity.userId,
      startingDate: activity.date,
      // endingDate is the starting date + the duration of the activity
      endingDate: new Date(activity.date.getTime() + activity.duration),
    });
    if (existinActivity) {
      console.warn("An activity already exist at this date");
      throw new Error("CONFLICTING_ACTIVITY");
    }

    return this.activityRepo.save({
      climb: activity.climb,
      date: activity.date,
      distance: activity.distance,
      duration: activity.duration,
      isValid,
      provider: activity.provider,
      sport: activity.sport,
      userId: activity.userId,
    });
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
