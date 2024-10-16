/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import {
  fetchKoreaTop50,
  fetchGlobalTop50,
  fetchKoreaWeeklyTop50,
  fetchGlobalWeeklyTop50,
  fetchKoreaRecentTracks,
  fetchAnimaRnBChart,
  Track,
  // 추가된 플레이리스트 가져오기 함수들
  fetchJazzForSleepChart,
  fetchKPopDanceChart,
  fetchAllTimeHighestChart,
  fetchTodaysHitChart,
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
  const itemsPerPage = 10;
  const maxPageDisplay = 10;
  const [pageStart, setPageStart] = useState<number>(1);
  const [tabDataCache, setTabDataCache] = useState<{ [key: string]: Track[] }>(
    {}
  );

  // 탭 클릭시 데이터 요청 및 캐싱 처리
  const handleTabClick = useCallback(
    async (tab: string) => {
      if (tabDataCache[tab]) {
        setChartData(tabDataCache[tab]);
        setActiveTab(tab);
        setCurrentPage(1);
        setPageStart(1);
        return;
      }

      setActiveTab(tab);
      setCurrentPage(1);
      setPageStart(1);

      try {
        setLoading(true);
        setError("");

        let data: Track[] = [];
        switch (tab) {
          case "Top 50 한국":
            data = await fetchKoreaTop50();
            break;
          case "Top 50 글로벌":
            data = await fetchGlobalTop50();
            break;
          case "주간 Top 50 한국":
            data = await fetchKoreaWeeklyTop50();
            break;
          case "주간 Top 50 글로벌":
            data = await fetchGlobalWeeklyTop50();
            break;
          case "최신 노래 한국":
            data = await fetchKoreaRecentTracks();
            break;
          case "Anima R&B":
            data = await fetchAnimaRnBChart();
            break;
          // 추가된 플레이리스트 처리
          case "Jazz for Sleep":
            data = await fetchJazzForSleepChart();
            break;
          case "K Pop Dance":
            data = await fetchKPopDanceChart();
            break;
          case "All-Time Highest Rated Songs":
            data = await fetchAllTimeHighestChart();
            break;
          case "Today’s Hit":
            data = await fetchTodaysHitChart();
            break;
          default:
            throw new Error("유효하지 않은 탭입니다.");
        }

        setTabDataCache((prev) => ({
          ...prev,
          [tab]: data,
        }));
        setChartData(data);
      } catch (err) {
        setError(`${tab} 데이터를 가져오는 데 실패했습니다.`);
      } finally {
        setLoading(false);
      }
    },
    [tabDataCache]
  );

  useEffect(() => {
    handleTabClick(activeTab);
  }, [activeTab, handleTabClick]);

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
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <section className="col-span-8 p-4 bg-white overflow-hidden">
        <h2 className="text-2xl font-bold">{activeTab}</h2>
        <div className="flex">
          <div className="flex-1 my-4">
            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <div
                  key={item.id}
                  className="relative flex mb-4 p-4 border border-gray_border shadow-md rounded-md"
                >
                  <img
                    src={item.image_url}
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
                    <p className="text-sm text-gray_dark">
                      발매일: {item.release_date}
                    </p>
                    <a
                      href={item.album_spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={spotifyLogo}
                        alt="스포티파이 로고"
                        className="w-6 h-6 rounded-full"
                      />
                    </a>
                  </div>
                  <p className="absolute bottom-2 right-2 text-sm text-gray_dark">
                    ⭐︎ {item.avg_rated} / 5.0 | 평가수 {item.count_rated}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray_dark">데이터가 없습니다.</div>
            )}

            {chartData.length > 0 && (
              <div className="flex justify-center space-x-2 mt-4">
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
        <h2 className="text-2xl font-bold mb-4">플레이 리스트</h2>
        <div className="border border-gray_border rounded-md shadow-md">
          {[
            "Top 50 한국",
            "Top 50 글로벌",
            "주간 Top 50 한국",
            "주간 Top 50 글로벌",
            "최신 노래 한국",
            "Anima R&B",
            "Jazz for Sleep",
            "K Pop Dance",
            "All-Time Highest Rated Songs",
            "Today’s Hit",
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
