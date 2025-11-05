import { describe, it, expect, vi, beforeEach } from "vitest";
import ChampionService from "../../services/ChampionService";

// Mock axios pour éviter les vrais appels réseau
vi.mock("axios");
import axios from "axios";

describe("ChampionService", () => {
  beforeEach(() => {
    // Nettoyer les mocks avant chaque test
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should fetch latest version", async () => {
    const mockVersion = ["15.21.1", "15.21.0"];
    axios.get.mockResolvedValue({ data: mockVersion });

    const result = await ChampionService.fetchLatestVersion();

    expect(result.data).toEqual(mockVersion);
  });

  it("should cache latest version", async () => {
    const mockVersion = ["15.21.1"];
    axios.get.mockResolvedValue({ data: mockVersion });

    await ChampionService.fetchLatestVersion();
    await ChampionService.fetchLatestVersion();

    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  it("should fetch and return champions array", async () => {
    const mockResponse = {
      data: {
        data: {
          Ahri: { id: "Ahri", name: "Ahri" },
          Yasuo: { id: "Yasuo", name: "Yasuo" },
        },
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const result = await ChampionService.fetchChampions("15.21.1");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
  });

  it("should handle fetch errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    try {
      await ChampionService.fetchChampions("15.21.1");
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Network error");
    }
  });
});
