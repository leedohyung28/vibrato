import axios, { AxiosError } from 'axios';

export interface updateRequest {
  profileImageUrl: string;
  nickname: string;
  token: string;
}

export const updateProfile = async ({token, profileImageUrl, nickname}: updateRequest) => {
  try {
    const response = await axios.put("/auth/edit", {
      profileImage: profileImageUrl,
      nickname: nickname,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('프로필 업데이트 완료 :', response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('프로필 업데이트 실패 :', axiosError.response.status);
    } else {
      console.error('알 수 없는 오류 :', error);
    }
  }
};
