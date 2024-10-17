import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// type_id를 기준으로 앨범, 아티스트, 트랙을 확인하는 함수
export const getTypeInfo = async (type_id: string) => {
  try {
    console.log(`Fetching track for type_id: ${type_id}`);

    // 트랙 요청
    try {
      const trackResponse = await axios.put(
        `${API_BASE_URL}/search/single/track/${type_id}`
      );
      if (trackResponse.data) {
        console.log("Track data:", trackResponse.data);
        return { type: "track", data: trackResponse.data };
      }
    } catch (trackError) {
      console.log(`Track fetch failed for type_id: ${type_id}`);
    }

    // 트랙 요청 실패 후 앨범 요청
    console.log(`Fetching album for type_id: ${type_id}`);
    try {
      const albumResponse = await axios.put(
        `${API_BASE_URL}/search/single/album/${type_id}`
      );
      if (albumResponse.data) {
        console.log("Album data:", albumResponse.data);
        return { type: "album", data: albumResponse.data };
      }
    } catch (albumError) {
      console.log(`Album fetch failed for type_id: ${type_id}`);
    }

    // 앨범 요청 실패 후 아티스트 요청
    console.log(`Fetching artist for type_id: ${type_id}`);
    try {
      const artistResponse = await axios.put(
        `${API_BASE_URL}/search/single/artist/${type_id}`
      );
      if (artistResponse.data) {
        console.log("Artist data:", artistResponse.data);
        return { type: "artist", data: artistResponse.data };
      }
    } catch (artistError) {
      console.log(`Artist fetch failed for type_id: ${type_id}`);
    }

    console.log("No data found for type_id:", type_id);
    return { type: null, data: null };
  } catch (error) {
    console.error(`Error fetching data for type_id ${type_id}:`, error);
    return { type: null, data: null };
  }
};
