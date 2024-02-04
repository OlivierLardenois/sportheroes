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

const mockFindByUserInPeriod = jest
  .fn()
  .mockResolvedValueOnce(true)
  .mockResolvedValueOnce(false);
const mockSave = jest.fn();
jest.mock("../../src/repositories/activity.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      findByUserInPeriod: mockFindByUserInPeriod,
      save: mockSave,
    };
  });
});

describe("ActivityService.saveActivity", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw on conflicting activity", async () => {
    const isValidMock = jest.spyOn(ActivityService.prototype, "isValid");
    isValidMock.mockReturnValue(true);

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
    expect(activityService.saveActivity(activity)).rejects.toThrow(
      "CONFLICTING_ACTIVITY",
    );

    expect(isValidMock).toHaveBeenCalledWith(activity);
    expect(mockFindByUserInPeriod).toHaveBeenCalledTimes(1);
  });

  it("should save activity", async () => {
    const isValidMock = jest.spyOn(ActivityService.prototype, "isValid");
    isValidMock.mockReturnValue(true);

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
    await activityService.saveActivity(activity);

    expect(isValidMock).toHaveBeenCalledWith(activity);
    expect(mockFindByUserInPeriod).toHaveBeenCalledTimes(1);
    expect(mockSave).toHaveBeenCalledWith({
      climb: activity.climb,
      date: activity.date,
      distance: activity.distance,
      duration: activity.duration,
      isValid: true,
      provider: activity.provider,
      sport: activity.sport,
      userId: activity.userId,
    });
  });
});
