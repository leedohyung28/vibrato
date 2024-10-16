import React, { useState } from "react";
import Favorites from "./Favorites";
import { useSearchAll } from "../apis/searchAll";

const mockComments = [
  {
    rating: 4.5,
  },
];

const artist = {
  ratingCount: 10,
};

const Discography: React.FC = () => {
  const [activeTab, setActiveTab] = useState("인기곡"); // 상태 관리

  return (
    <section className="col-span-8">
      <div className="col-span-1">
        {/* 탭 버튼 */}
        <div className="flex space-x-4">
          <button
            className={`text-xl font-bold ${
              activeTab === "인기곡"
                ? "underline decoration-coral decoration-4 underline-offset-8"
                : ""
            }`}
            onClick={() => setActiveTab("인기곡")}
          >
            인기곡
          </button>
          <button
            className={`text-xl font-bold ${
              activeTab === "디스코그래피"
                ? "underline decoration-coral decoration-4 underline-offset-8"
                : ""
            }`}
            onClick={() => setActiveTab("디스코그래피")}
          >
            디스코그래피
          </button>
        </div>

        {/* 인기곡 탭 */}
        {activeTab === "인기곡" ? (
          <div className="mt-4 rounded-md border border-gray_border shadow-md">
            {popularSongs.map((song, index) => (
              <div
                key={index}
                className="flex justify-between border-b items-center"
              >
                <div className="flex flex-row items-center space-x-2">
                  <img
                    src={song.cover}
                    alt="Song Cover"
                    className="p-2 w-20 h-20 rounded"
                  />
                  <p className="text-lg font-bold">{song.title}</p>
                  <p className="text-sm font-semibold text-gray_dark">
                    {song.album}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray_dark">
                    ★ {mockComments[0].rating} / 5.0 | 🗎 {artist.ratingCount}
                  </span>
                  <span className="m-2 w-8 h-8">
                    <Favorites />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* 디스코그래피 탭 */}
            <div className="p-4 mt-4 text-xl font-bold">
              앨범
              <div className="mt-2 rounded-md border border-gray_border shadow-md">
                {discography.map((album, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={album.cover}
                        alt="Album Cover"
                        className="p-2 w-20 h-20 rounded"
                      />
                      <p className="text-lg font-bold">{album.title}</p>
                      <p className="text-sm font-semibold text-gray_dark">
                        {album.releaseDate}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray_dark">
                        ★ {mockComments[0].rating} / 5.0 | 🗎{" "}
                        {artist.ratingCount}
                      </span>
                      <div className="mt-1 transform scale-50">
                        <Favorites />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 싱글 탭 */}
            <div className="p-4 mt-4 text-xl font-bold">
              싱글
              <div className="mt-2 rounded-md border border-gray_border shadow-md">
                {discography.map((album, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b items-center"
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <img
                        src={album.cover}
                        alt="Album Cover"
                        className="p-2 w-20 h-20 rounded"
                      />
                      <p className="text-lg font-bold">{album.title}</p>
                      <p className="text-sm font-semibold text-gray_dark">
                        {album.releaseDate}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray_dark">
                        ★ {mockComments[0].rating} / 5.0 | 🗎{" "}
                        {artist.ratingCount}
                      </span>
                      <div className="mt-1 transform scale-50">
                        <Favorites />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Discography;
