export interface SignupRequest {
  email: string;
  password: string;
  image_id: number;
  nickname: string;
}

export const signup = async ({
  email,
  password,
  image_id,
  nickname,
}: SignupRequest) => {
  const response = await fetch("/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, image_id, nickname }),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return await response.json();
};

export const getUserInfo = async () => {
  const response = await fetch("/users/edit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("회원정보 조회 실패");
  }

  return await response.json();
};
