import axios from "axios";

export const getAlbumInfo = async (albumId: string) => {
  try {
    const response = await axios.put(
      `https://vibrato1.shop/search/single/album/${albumId}`
    );

    // console.log("response", response);
    console.log("response data", response.data);

    return response.data;
  } catch (error) {
    console.error("앨범 정보를 불러오지 못했습니다:", error);
    throw error;
  }
};
