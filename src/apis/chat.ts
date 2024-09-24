import axios from "axios";

export interface Track {
  id: string;
  name: string;
  preview: string;
  album_id: string;
  album_name: string;
  album_image: string;
  album_spotify_url: string;
  release_date: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
  }[];
  rated: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  spotify_url: string;
  rated: number;
  genres: string[];
}

export interface Album {
  id: string;
  name: string;
  image: string;
  total_tracks: number;
  release_date: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
  }[];
  rated: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 글로벌 주간 50차트 조회
export const fetchGlobalWeeklyTop50 = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/global/weekly`);
    return response.data;
  } catch (error) {
    console.error("글로벌 주간 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("글로벌 주간 차트를 가져오는 데 실패했습니다.");
  }
};

// 한국 주간 50차트 조회
export const fetchKoreaWeeklyTop50 = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/korea/weekly`);
    return response.data;
  } catch (error) {
    console.error("한국 주간 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("한국 주간 차트를 가져오는 데 실패했습니다.");
  }
};

// 한국 Top 50 차트 조회
export const fetchKoreaTop50 = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/korea`);
    return response.data;
  } catch (error) {
    console.error("한국 Top 50 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("한국 Top 50 차트를 가져오는 데 실패했습니다.");
  }
};

// 글로벌 Top 50 차트 조회
export const fetchGlobalTop50 = async (): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/global`);
    return response.data;
  } catch (error) {
    console.error("글로벌 Top 50 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("글로벌 Top 50 차트를 가져오는 데 실패했습니다.");
  }
};

// 최신 노래 조회 (국내)
export const fetchKoreaRecentTracks = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/korea/recent`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("최신 노래(한국)를 가져오는 데 실패했습니다:", error);
    throw new Error("최신 노래(한국)를 가져오는 데 실패했습니다.");
  }
};

// Anima R&B 장르 차트 조회
export const fetchAnimaRnBChart = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chart/genres/animarnb`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("Anima R&B 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("Anima R&B 차트를 가져오는 데 실패했습니다.");
  }
};

// 전체 검색 API 호출
export const searchAll = async (
  searchContent: string
): Promise<{
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: {
        search_content: searchContent,
      },
    });
    return response.data;
  } catch (error) {
    console.error("검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 노래 검색 API 호출
export const searchTracks = async (searchContent: string): Promise<Track[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/tracks`, {
      params: {
        search_content: searchContent,
      },
    });
    return response.data;
  } catch (error) {
    console.error("노래 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("노래 검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 아티스트 검색 API 호출
export const searchArtists = async (
  searchContent: string
): Promise<Artist[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/artists`, {
      params: {
        search_content: searchContent,
      },
    });
    return response.data;
  } catch (error) {
    console.error("아티스트 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("아티스트 검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 앨범 검색 API 호출
export const searchAlbums = async (searchContent: string): Promise<Album[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/albums`, {
      params: {
        search_content: searchContent,
      },
    });
    return response.data;
  } catch (error) {
    console.error("앨범 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("앨범 검색 결과를 가져오는 데 실패했습니다.");
  }
};
