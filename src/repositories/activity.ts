import { ProviderName, Sport } from "../utils/activity";

export default class ActivityRepo {
  /** Find an activity register by a user with date between 2 given date */
  findByUserInPeriod({
    userId,
    startingDate,
    endingDate,
  }: {
    userId: string;
    startingDate: Date;
    endingDate: Date;
  }): ActivityModel {
    `SELECT * FROM activities WHERE userId = ${userId} AND date BETWEEN ${startingDate} AND ${endingDate}`;
    // Dummy return because db isn't implemented
    return false as unknown as ActivityModel;
  }

  save(activity: Omit<ActivityModel, "id" | "createdAt">) {
    console.log("Save activity :", activity);
  }
}

export interface ActivityModel {
  id: number;
  provider: ProviderName;
  sport: Sport;
  distance: number;
  duration: number;
  climb: number;
  isValid: boolean;
  createdAt: Date;
  userId: string;
  date: Date;
}
