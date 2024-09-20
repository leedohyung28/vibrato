import { mockChartData, mockArtistsData } from "./mockData";

export const fetchGlobalWeeklyTop50 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockChartData);
    }, 500);
  });
};

export const searchAll = async (searchContent: string) => {
  const filteredTracks = mockChartData.filter((track) =>
    track.name.includes(searchContent)
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tracks: filteredTracks,
        artists: mockArtistsData,
        albums: mockChartData,
      });
    }, 500);
  });
};
