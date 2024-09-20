/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { fetchGlobalWeeklyTop50, searchAll } from "../../apis/chat";
import {
  ChartResponse,
  ArtistResponse,
  mockArtistsData,
} from "../../apis/mockData";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const ChartPage = () => {
  const [chartData, setChartData] = useState<ChartResponse[]>([]);
  const [artistData, setArtistData] = useState<ArtistResponse[]>([]);
  const [filteredData, setFilteredData] = useState<
    (ChartResponse | ArtistResponse)[]
  >([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchContent, setSearchContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"앨범" | "아티스트">("앨범");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGlobalWeeklyTop50();

        setChartData(data as ChartResponse[]);
        setFilteredData(data as ChartResponse[]);
        setArtistData(mockArtistsData);
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchContent.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await searchAll(searchContent);

      if (activeTab === "앨범") {
        setFilteredData((data as { tracks: ChartResponse[] }).tracks);
      } else {
        const filteredArtists = mockArtistsData.filter((artist) =>
          artist.name.includes(searchContent)
        );
        setFilteredData(filteredArtists);
      }
    } catch (err) {
      setError("검색 데이터 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tab: "앨범" | "아티스트") => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === "앨범") {
      setFilteredData(chartData);
    } else {
      setFilteredData(artistData);
    }
  };

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre);
    if (activeTab === "앨범") {
      setFilteredData(
        chartData.filter((item) =>
          item.album_artists.some((artist) =>
            artist.artists_name.includes(genre)
          )
        )
      );
    } else {
      setFilteredData(
        artistData.filter((artist) => artist.genres.includes(genre))
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">최신 발매</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleTabClick("앨범")}
            className={`px-4 py-2 rounded ${
              activeTab === "앨범" ? "bg-gray-300" : ""
            }`}
          >
            앨범
          </button>
          <button
            onClick={() => handleTabClick("아티스트")}
            className={`px-4 py-2 rounded ${
              activeTab === "아티스트" ? "bg-gray-300" : ""
            }`}
          >
            아티스트
          </button>
        </div>
        {paginatedData.map((item) => (
          <div key={item.id} className="flex mb-4 p-4 border rounded-md">
            <img
              src={"album_image" in item ? item.album_image : item.image}
              alt={item.name}
              className="w-32 h-32 mr-4"
            />
            <div>
              <h3 className="text-xl font-semibold">{item.name}</h3>
              {activeTab === "앨범" && (
                <>
                  <div className="flex space-x-2 my-2">
                    {(item as ChartResponse).album_artists.map((artist) => (
                      <span key={artist.artists_name}>
                        {artist.artists_name}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    발매일: {(item as ChartResponse).release_date}
                  </p>
                  <p className="text-sm text-gray-600">
                    별점: {(item as ChartResponse).rated} / 5.0
                  </p>
                </>
              )}
              {activeTab === "아티스트" && (
                <>
                  <p className="text-sm text-gray-600">
                    장르: {(item as ArtistResponse).genres.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    별점: {(item as ArtistResponse).rated} / 5.0
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 ? "bg-gray-300" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-2xl font-bold mb-4">필터</h2>
        <div className="border p-4 rounded-md">
          <input
            type="text"
            placeholder="검색 내용"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            className="border rounded p-2 w-full mb-4"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-300 px-4 py-2 rounded w-full"
          >
            검색
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">장르별</h3>
            {[
              "Rock",
              "Pop",
              "Jazz",
              "Funk",
              "Disco",
              "Electronic",
              "Metal",
            ].map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreFilter(genre)}
                className={`px-2 py-1 m-1 rounded ${
                  selectedGenre === genre ? "bg-gray-300" : ""
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
