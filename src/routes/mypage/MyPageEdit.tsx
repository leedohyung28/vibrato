import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const MyPageEdit = () => {
  const { nickname, profileImageUrl, updateNickname, updateProfileImageUrl } =
    useAuthStore();
  const [newNickname, setNewNickname] = useState(nickname);

  const handleNicknameChange = () => {
    if (newNickname.trim() === "") {
      alert("닉네임을 입력해주세요.");
      return;
    }
    updateNickname(newNickname);
    alert("닉네임이 변경되었습니다.");
  };

  const handleProfileImageChange = (imageUrl: string) => {
    updateProfileImageUrl(imageUrl);
    alert("프로필 이미지가 변경되었습니다.");
  };

  return (
    <div className="container mx-auto grid grid-cols-12 gap-10 px-5">
      {/* 프로필 섹션 */}
      <div className="col-span-12 flex items-center rounded-md p-5 justify-between">
        <div className="flex items-center space-x-8">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full border shadow-md"
          />
          <span className="text-2xl font-bold">{nickname} 님</span>
        </div>
      </div>

      <h2 className="col-span-12 text-2xl font-bold px-5 mr-40">
        개인정보 수정
      </h2>

      {/* 닉네임 변경 섹션 */}
      <div className="col-span-12 flex justify-between items-center">
        <h2 className="font-semibold text-xl px-5 mr-20">닉네임 변경</h2>
        <input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder="닉네임 변경"
          className="border rounded-md flex-grow m-4 px-4 py-2 text-sm"
        />
        <button
          onClick={handleNicknameChange}
          className="bg-coral text-white rounded-md px-5 py-2 "
        >
          확인
        </button>
      </div>

      {/* 프로필 이미지 변경 섹션 */}
      <h2 className="col-span-12 font-semibold text-xl px-5 mr-20">
        프로필 이미지 변경
      </h2>
      <div className="col-span-12 flex justify-between items-center px-10">
        {[
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMXz1JQ_zgFVaefF3VlyoteuPH5V9GWhIc-fCFGtvCF8Z37bN73rMc7n7sPT0GAzRfX3OiykfY99r5aZRp-RglLB8CA684ComGns2YrfyS1iisQAQ_tJm6sLEBUSEKbn2d_g5lzM10yJc4/s759/music_headphone_side_man.png",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTepTG-u_YTPn6nKJAccCNGADSE0muIu_8vDfc0i3G5kCGd8bneyKN0UqRUo7HHzsebjtWkOQf27BST6vfd_E7aQ2eq2CKdWJNy9XFY5qKuWpoxO72sF5I06PHqEN2l0Hfc6fdQ1zBGGXd/s759/music_headphone_side_woman.png",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisV2d0ePnogpUzvG5W4Jwnc8z9ms4dcblcpo45xA637bMTQQqnKtA2VkBcgEGj_bajSEaaWQENeiJE00P_yq_RvJtryMReUJ6WBqgNiowAqaytZoSnvyeKo7fOz53kLbJKR3sHXfEW_-Vs/s800/kagenagara_ouuen_idle_woman.png",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho9vI9SC_cRAh4b_PcNKV2PKazuCPsvEi9a6Qg06Rcs_cwotHaSYJtV6UdyjbltgP3SrH6GWC7na1UxKUspbFgJb6Lg-Nt4PYMrpKggvxTDELPOxo1BzPKAc-PTZ9xJ5T14ZGhcZnpPVjb/s800/kagenagara_ouuen_idle_man.png",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhGDEEaaw5UETHT3c4L_rmoUtATvdpwMgbqj43hA7svDozM-PQcLh5xkdzmrHqJE8PZ3NVSi9ZWve5FPCLWZ3MYegdj4_9FzvPikQBtndg0OAAJ8znKN73JFaVDCyq7I4AHO1J33aCCJllX/s800/live_music_ouen_woman.png",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNicBgBOwyjpxFkzdnEI2GfFMHb3VRe1CWZAPuxRAC2J__hjhk2jVYBpG3NNptTzndjPpxJERKCGeGX4boQgqTMpNfQ5sRpOrp3mnm98urdMNxLxoC6v5E9D5DXonymBApMJoCO63xC3lf/s800/live_music_ouen_man.png",
        ].map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Profile ${index + 1}`}
            className="w-40 h-40 rounded-full border shadow-md cursor-pointer"
            onClick={() => handleProfileImageChange(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPageEdit;
