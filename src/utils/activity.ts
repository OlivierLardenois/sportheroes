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
  date: Date;
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

export default class Activity {
  provider: ProviderName;
  sport: Sport;
  distance: number;
  duration: number;
  climb: number;

  constructor({ providerName, providerActivity }: ProviderActivity) {
    switch (providerName) {
      case "GARMIN":
        this.provider = "GARMIN";
        this.sport = Activity.garminSportMapper(providerActivity.sport);
        this.distance = providerActivity.distance;
        this.duration = providerActivity.duration * 1000;
        this.climb = providerActivity.climb;
        break;
      case "SUUNTO":
        this.provider = "SUUNTO";
        this.sport = Activity.suuntoSportMapper(providerActivity.sport);
        this.distance = providerActivity.distance * 1000;
        this.duration = providerActivity.duration;
        this.climb = 0;
        break;
      default:
        throw new Error("");
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
        throw new Error("");
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
        throw new Error("");
    }
  }
}
