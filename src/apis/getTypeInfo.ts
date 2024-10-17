import axios from "axios";

// type_id를 기준으로 앨범, 아티스트, 트랙을 확인하는 함수
export const getTypeInfo = async (type_id: string) => {
  try {
    // 트랙 요청
    try {
      const trackResponse = await axios.put(`/search/single/track/${type_id}`);
      if (trackResponse.data) {
        return { type: "track", data: trackResponse.data };
      }
    } catch (trackError) {}

    // 트랙 요청 실패 후 앨범 요청
    try {
      const albumResponse = await axios.put(`/search/single/album/${type_id}`);
      if (albumResponse.data) {
        return { type: "album", data: albumResponse.data };
      }
    } catch (albumError) {}

    // 앨범 요청 실패 후 아티스트 요청
    try {
      const artistResponse = await axios.put(
        `/search/single/artist/${type_id}`
      );
      if (artistResponse.data) {
        return { type: "artist", data: artistResponse.data };
      }
    } catch (artistError) {}

    return { type: null, data: null };
  } catch (error) {
    console.error(`Error fetching data for type_id ${type_id}:`, error);
    return { type: null, data: null };
  }
};
