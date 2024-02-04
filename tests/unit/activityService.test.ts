import ActivityService from "../../src/services/activity";
import Activity, { Sport } from "../../src/utils/activity";

describe("ActivityService.isValid", () => {});

describe("ActivityService.isValidRunning", () => {
  const sport: Sport = "RUNNING";
  it("should be valid if speed <= MAX_RUNNING_SPEED", () => {
    const activityService = new ActivityService();
    const isValid = activityService.isValidRunning({
      climb: 0,
      distance: 17_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport,
      date: new Date(),
      userId: "1",
    });

    expect(isValid).toBe(true);
  });
  it("should not be valid if speed > MAX_RUNNING_SPEED", () => {
    const activityService = new ActivityService();
    const isValid = activityService.isValidRunning({
      climb: 0,
      distance: 19_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport,
      date: new Date(),
      userId: "1",
    });

    expect(isValid).toBe(false);
  });
});

describe("ActivityService.isValidCycling", () => {
  const sport: Sport = "CYCLING";
  it("should be valid if speed <= MAX_CYCLING_SPEED", () => {
    const activityService = new ActivityService();
    const isValid = activityService.isValidCycling({
      climb: 0,
      distance: 49_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport,
      date: new Date(),
      userId: "1",
    });

    expect(isValid).toBe(true);
  });
  it("should not be valid if speed > MAX_CYCLING_SPEED", () => {
    const activityService = new ActivityService();
    const isValid = activityService.isValidCycling({
      climb: 0,
      distance: 51_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport,
      date: new Date(),
      userId: "1",
    });

    expect(isValid).toBe(false);
  });
});

describe("ActivityService.isValid", () => {
  it("should call isValidRunning for RUNNING spot", () => {
    const isValidRunningMock = jest.spyOn(
      ActivityService.prototype,
      "isValidRunning",
    );
    isValidRunningMock.mockReturnValue(true);

    const activity: Activity = {
      climb: 0,
      distance: 51_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport: "RUNNING",
      date: new Date(),
      userId: "1",
    };
    const activityService = new ActivityService();
    activityService.isValid(activity);

    expect(isValidRunningMock).toHaveBeenCalledWith(activity);
  });

  it("should call isValidCycling for RUNNING spot", () => {
    const isValidCyclingMock = jest.spyOn(
      ActivityService.prototype,
      "isValidCycling",
    );
    isValidCyclingMock.mockReturnValue(true);

    const activity: Activity = {
      climb: 0,
      distance: 51_000,
      duration: 3_600_000,
      provider: "GARMIN",
      sport: "CYCLING",
      date: new Date(),
      userId: "1",
    };
    const activityService = new ActivityService();
    activityService.isValid(activity);

    expect(isValidCyclingMock).toHaveBeenCalledWith(activity);
  });
});
