import { describe, it, expect } from "vitest";
import {
  getCachedData,
  setCachedData,
  clearCache,
} from "../../utils/cacheHelper";

describe("cacheHelper", () => {
  it("should save and retrieve cached data", () => {
    const testKey = "test_key";
    const testData = { name: "Ahri", region: "Ionia" };

    setCachedData(testKey, testData);

    const retrieved = getCachedData(testKey);
    expect(retrieved).toEqual(testData);
  });

  it("should return null when no cached data exists", () => {
    const testKey = "non_existent_key";

    const retrieved = getCachedData(testKey);
    expect(retrieved).toBeNull();
  });

  it("should clear cached data", () => {
    const testKey = "test_key_to_delete";
    const testData = { champion: "Yasuo" };

    setCachedData(testKey, testData);
    expect(getCachedData(testKey)).toEqual(testData);

    clearCache(testKey);
    expect(getCachedData(testKey)).toBeNull();
  });

  it("should handle corrupted cache gracefully", () => {
    const testKey = "corrupted_cache";

    localStorage.setItem(testKey, "This is not valid JSON");

    const retrieved = getCachedData(testKey);
    expect(retrieved).toBeNull();
  });
});
