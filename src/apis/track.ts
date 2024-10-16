import axios from 'axios';

export const getTrackInfo = async (trackId: string) => {
  try {
    const response = await axios.put(`/search/single/track/${trackId}`);
    return response.data;

  } catch (error) {
    console.error('트랙 정보를 불러오지 못했습니다:', error);
    throw error;
  }
};