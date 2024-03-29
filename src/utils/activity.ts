export type ProviderName = "GARMIN" | "SUUNTO";
export type Sport = "RUNNING" | "CYCLING";
export type GarminSport = "Run" | "Spinning" | "Biking";
export type SuuntoSport = "TRAIL" | "RUNNING" | "INDOOR_CYCLING" | "BIKE";

type GarminActivity = {
  sport: GarminSport;
  distance: number; // In meters
  duration: number; // In seconds
  climb: number;
  distinct_id: string;
  date: string;
};

type SuuntoActivity = {
  sport: SuuntoSport;
  distance: number; // In kilometers
  duration: number; // In milliseconds
  user_id: string;
  timestamp: number;
};

type ProviderActivity =
  | {
      providerName: "GARMIN";
      providerActivity: GarminActivity;
    }
  | {
      providerName: "SUUNTO";
      providerActivity: SuuntoActivity;
    };

/** Format different providers activity */
export default class Activity {
  provider: ProviderName;
  sport: Sport;
  distance: number; // In meters
  duration: number; // In milliseconds
  climb: number;
  date: Date;
  userId: string;

  constructor({ providerName, providerActivity }: ProviderActivity) {
    switch (providerName) {
      case "GARMIN":
        this.provider = "GARMIN";
        this.sport = Activity.garminSportMapper(providerActivity.sport);
        this.distance = providerActivity.distance;
        this.duration = providerActivity.duration * 1000;
        this.climb = providerActivity.climb;
        this.date = new Date(providerActivity.date);
        this.userId = providerActivity.distinct_id;
        break;
      case "SUUNTO":
        this.provider = "SUUNTO";
        this.sport = Activity.suuntoSportMapper(providerActivity.sport);
        this.distance = providerActivity.distance * 1000;
        this.duration = providerActivity.duration;
        this.climb = 0;
        this.date = new Date(providerActivity.timestamp);
        this.userId = providerActivity.user_id;
        break;
      default:
        console.warn("Provider not supported :", providerName);
        throw new Error("UNKNOWN_PROVIDER");
    }
  }

  static suuntoSportMapper(sport: SuuntoSport): Sport {
    switch (sport) {
      case "TRAIL":
      case "RUNNING":
        return "RUNNING";
      case "BIKE":
      case "INDOOR_CYCLING":
        return "CYCLING";
      default:
        console.warn("Sport not supported :", sport);
        throw new Error("UNKNOWN_SPORT");
    }
  }

  static garminSportMapper(sport: GarminSport): Sport {
    switch (sport) {
      case "Run":
        return "RUNNING";
      case "Spinning":
      case "Biking":
        return "CYCLING";
      default:
        console.warn("Sport not supported :", sport);
        throw new Error("UNKNOWN_SPORT");
    }
  }
}
