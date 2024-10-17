import axios from "axios";

export const follow = async (type_id: string, token: string | null) => {
  try {
    const response = await axios.post(
      "/follows",
      { type_id: type_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response data", response.data);

    return response.data;
  } catch (error) {
    console.error("팔로우 오류 :", error);
    throw error;
  }
};
