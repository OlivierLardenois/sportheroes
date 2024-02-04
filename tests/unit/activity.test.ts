import Activity, {
  GarminSport,
  Sport,
  SuuntoSport,
} from "../../src/utils/activity";

describe("Activity.garminSportMapper", () => {
  test.each<{ sport: GarminSport; expected: Sport }>([
    { sport: "Run", expected: "RUNNING" },
    { sport: "Spinning", expected: "CYCLING" },
    { sport: "Biking", expected: "CYCLING" },
  ])("should map $sport with $expected", ({ sport, expected }) => {
    expect(Activity.garminSportMapper(sport)).toBe(expected);
  });
});

describe("Activity.suuntoSportMapper", () => {
  test.each<{ sport: SuuntoSport; expected: Sport }>([
    { sport: "TRAIL", expected: "RUNNING" },
    { sport: "RUNNING", expected: "RUNNING" },
    { sport: "BIKE", expected: "CYCLING" },
    { sport: "INDOOR_CYCLING", expected: "CYCLING" },
  ])("should map $sport with $expected", ({ sport, expected }) => {
    expect(Activity.suuntoSportMapper(sport)).toBe(expected);
  });
});

describe("Activity", () => {
  const climb = 100;
  const date = new Date();
  const distance = 1000;
  const distinct_id = "1";
  const duration = 2000;

  test("should create a garmin activity", () => {
    const garminSportMapperMock = jest.spyOn(Activity, "garminSportMapper");
    garminSportMapperMock.mockReturnValue("CYCLING");

    const sport: GarminSport = "Biking";
    const providerName = "GARMIN";

    const activity = new Activity({
      providerName,
      providerActivity: {
        climb,
        date,
        distance,
        distinct_id,
        duration,
        sport,
      },
    });
    expect(activity).toBeDefined();
    expect(activity.provider).toBe(providerName);
    expect(activity.sport).toBe("CYCLING");
    expect(activity.distance).toBe(distance);
    expect(activity.duration).toBe(duration * 1000);
    expect(activity.climb).toBe(activity.climb);

    garminSportMapperMock.mockRestore();
  });

  test("should create a suunto activity", () => {
    const suuntoSportMapperMock = jest.spyOn(Activity, "suuntoSportMapper");
    suuntoSportMapperMock.mockReturnValue("CYCLING");

    const sport: SuuntoSport = "BIKE";
    const providerName = "SUUNTO";

    const activity = new Activity({
      providerName,
      providerActivity: {
        sport,
        distance,
        duration,
        user_id: distinct_id,
        timestamp: 1707058884,
      },
    });
    expect(activity).toBeDefined();
    expect(activity.provider).toBe(providerName);
    expect(activity.sport).toBe("CYCLING");
    expect(activity.distance).toBe(distance * 1000);
    expect(activity.duration).toBe(duration);
    expect(activity.climb).toBe(0);

    suuntoSportMapperMock.mockRestore();
  });
});
