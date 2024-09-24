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
    <div className="flex">
      {/* 왼쪽 콘텐츠 부분 */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
        <div className="flex space-x-4 mb-4">
          {/* 앨범 / 노래 선택 */}
          {["앨범", "노래"].map((type) => (
            <button
              key={type}
              onClick={() => setContentType(type)}
              className={`px-4 py-2 rounded ${
                contentType === type ? "bg-gray-300" : ""
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {/* 데이터가 배열인지 확인 */}
        {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div key={item.id} className="flex mb-4 p-4 border rounded-md">
              <img
                src={item.album_image}
                alt={item.album_name}
                className="w-32 h-32 mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="flex space-x-2 my-2">
                  {item.album_artists.map((artist) => (
                    <span key={artist.id}>{artist.name}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  발매일: {item.release_date}
                </p>
                <p className="text-sm text-gray-600">
                  별점: {item.rated} / 5.0
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600">데이터가 없습니다.</div>
        )}

        {/* Pagination */}
        {chartData.length > 0 && (
          <div className="flex justify-center space-x-2 mt-4">
            {/* 이전 페이지 세트로 이동 */}
            {pageStart > 1 && (
              <button
                onClick={handlePrevPageSet}
                className="px-3 py-1 rounded bg-gray-300"
              >
                &lt;
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
                  currentPage === page ? "bg-gray-300" : ""
                }`}
              >
                {page}
              </button>
            ))}

            {/* 다음 페이지 세트로 이동 */}
            {pageEnd < totalPages && (
              <button
                onClick={handleNextPageSet}
                className="px-3 py-1 rounded bg-gray-300"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>

      {/* 오른쪽 필터 부분 */}
      <div className="w-1/4 p-4 bg-white shadow-md h-screen">
        <h2 className="text-2xl font-bold mb-4">플레이 리스트</h2>
        <div className="border p-4 rounded-md">
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
              className={`px-4 py-2 m-2 w-full text-left rounded ${
                activeTab === tab ? "bg-gray-300" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
