import { useState } from "react";
import { getUserInfo, signup } from "../apis/login";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleSignup = async () => {
    try {
      const email = "test@test.com";
      const password = "test";
      const nickname = "test";
      const imageId = 1;

      await signup({ email, password, image_id: imageId, nickname });
      alert("회원가입 성공");
    } catch (error) {
      console.error("회원가입:", error);
      alert("회원가입 실패");
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoggedIn(true);

      const userInfo = await getUserInfo();
      setNickname(userInfo.nickname);
      setProfileImageUrl(userInfo.profile_image_URL);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("회원 정보 조회 실패");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setNickname("");
    setProfileImageUrl("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full bg-red-300"
          />
          <span className="text-gray-600">{nickname}님</span>
          <button onClick={handleLogout} className="text-gray-600">
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button onClick={handleLogin} className="text-gray-600">
            로그인
          </button>
          <button onClick={handleSignup} className="text-gray-600">
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
