import { describe, expect, it } from "vitest";
import { getWeatherInfo } from "./weatherCodes";

describe("getWeatherInfo", () => {
  it("returns correct info for clear sky (code 0)", () => {
    const result = getWeatherInfo(0);
    expect(result.description).toBe("Cielo despejado");
    expect(result.emoji).toBe("☀️");
  });

  it("returns correct info for partly cloudy (code 2)", () => {
    const result = getWeatherInfo(2);
    expect(result.description).toBe("Parcialmente nublado");
  });

  it("returns correct info for thunderstorm (code 95)", () => {
    const result = getWeatherInfo(95);
    expect(result.description).toBe("Tormenta eléctrica");
    expect(result.emoji).toBe("⛈️");
  });

  it("returns fallback for unknown code", () => {
    const result = getWeatherInfo(999);
    expect(result.description).toBe("Desconocido");
    expect(result.emoji).toBe("🌡️");
  });

  it("returns correct info for snow (code 73)", () => {
    const result = getWeatherInfo(73);
    expect(result.description).toBe("Nevada moderada");
  });
});
