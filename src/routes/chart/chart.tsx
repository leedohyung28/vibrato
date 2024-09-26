import { useEffect, useState } from "react";
import {
  fetchKoreaTop50,
  fetchGlobalTop50,
  fetchKoreaWeeklyTop50,
  fetchGlobalWeeklyTop50,
  fetchKoreaRecentTracks,
  fetchAnimaRnBChart,
  Track,
} from "../../apis/chat";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import spotifyLogo from "../../assets/spotify.png";

const ChartPage = () => {
  const [chartData, setChartData] = useState<Track[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Top 50 한국");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentType, setContentType] = useState<string>("앨범");
  const itemsPerPage = 10;
  const maxPageDisplay = 10;
  const [pageStart, setPageStart] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 기본적으로 Top 50 한국 데이터를 로드
        const data = await fetchKoreaTop50();
        setChartData(data);
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = async (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setPageStart(1);

    try {
      setLoading(true);
      setError("");

      switch (tab) {
        case "Top 50 한국":
          setChartData(await fetchKoreaTop50());
          break;
        case "Top 50 글로벌":
          setChartData(await fetchGlobalTop50());
          break;
        case "주간 Top 50 한국":
          setChartData(await fetchKoreaWeeklyTop50());
          break;
        case "주간 Top 50 글로벌":
          setChartData(await fetchGlobalWeeklyTop50());
          break;
        case "최신 노래 한국":
          setChartData(await fetchKoreaRecentTracks());
          break;
        case "Anima R&B":
          setChartData(await fetchAnimaRnBChart());
          break;
        default:
          setChartData([]);
          setError("유효하지 않은 탭입니다.");
          break;
      }
    } catch (err) {
      setError(`${tab} 데이터를 가져오는 데 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPageSet = () => {
    setPageStart((prev) => prev + maxPageDisplay);
  };

  const handlePrevPageSet = () => {
    setPageStart((prev) => Math.max(1, prev - maxPageDisplay));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = chartData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(chartData.length / itemsPerPage);
  const pageEnd = Math.min(pageStart + maxPageDisplay - 1, totalPages);

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
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10 bg-coral">
      <section className="col-span-8 p-4 bg-white overflow-hidden">
        <h2 className="text-2xl font-bold">{activeTab}</h2>
        <div className="flex">
          <div className="flex-1 my-4">
            <div className="flex space-x-4 mb-4">
              {/* 앨범 / 노래 선택 */}
              {["앨범", "노래"].map((type) => (
                <button
                  key={type}
                  onClick={() => setContentType(type)}
                  className={`text-xl font-semibold ${
                    contentType === type
                      ? "font-bold underline decoration-coral decoration-4 underline-offset-8"
                      : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* 데이터가 배열인지 확인 */}
            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="relative flex mb-4 p-4 border border-gray_border shadow-md rounded-md"
                >
                  <img
                    src={item.album_image}
                    alt={item.album_name}
                    className="w-32 h-32 mr-4"
                  />
                  <div className="flex flex-col h-32 w-full justify-between">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <div>
                      {item.album_artists.map((artist) => (
                        <span
                          className="text-sm text-gray_dark"
                          key={artist.id}
                        >
                          {artist.name}
                        </span>
                      ))}
                    </div>
                    {contentType === "노래" && (
                      <h2 className="text-sm text-gray_dark">
                        {item.album_name}
                      </h2>
                    )}
                    <p className="text-sm text-gray_dark">
                      발매일: {item.release_date}
                    </p>
                    <a href="https://www.spotify.com" target="_blank">
                      <img
                        src={spotifyLogo}
                        alt="스포티파이 로고"
                        className="w-6 h-6 rounded-full"
                      ></img>
                    </a>
                  </div>
                  <p className="absolute bottom-2 right-2 text-sm text-gray_dark">
                    ⭐︎ {item.rated} / 5.0 | 🗎 평가수
                  </p>
                  <h2 className="absolute top-4 right-4 text-2xl font-bold">
                    #{item.id}
                  </h2>
                </div>
              ))
            ) : (
              <div className="text-gray_dark">데이터가 없습니다.</div>
            )}

            {/* Pagination */}
            {chartData.length > 0 && (
              <div className="flex justify-center space-x-2 mt-4">
                {/* 이전 페이지 세트로 이동 */}
                {pageStart > 1 && (
                  <button onClick={handlePrevPageSet} className="px-3 py-1">
                    ←
                  </button>
                )}

                {Array.from(
                  { length: pageEnd - pageStart + 1 },
                  (_, index) => pageStart + index
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "font-bold underline decoration-coral decoration-4 underline-offset-8"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* 다음 페이지 세트로 이동 */}
                {pageEnd < totalPages && (
                  <button onClick={handleNextPageSet} className="px-3 py-1">
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="col-span-4 p-4 bg-white">
        {/* 오른쪽 필터 부분 */}
        <h2 className="text-2xl font-bold mb-4">플레이 리스트</h2>
        <div className="border border-gray_border rounded-md shadow-md">
          {[
            "Top 50 한국",
            "Top 50 글로벌",
            "주간 Top 50 한국",
            "주간 Top 50 글로벌",
            "최신 노래 한국",
            "Anima R&B",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`p-4 w-full text-left rounded-md ${
                activeTab === tab
                  ? "font-bold underline decoration-coral decoration-4 underline-offset-8"
                  : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChartPage;
