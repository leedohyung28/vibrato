import { ChartResponse, mockChartData } from "../../apis/mockData";
import { useEffect, useState } from "react";

const PopularAlbumSection = () => {
  const [albums, setAlbums] = useState<ChartResponse[]>([]);
  useEffect(() => {
    const fetchAlbums = () => {
      setAlbums(mockChartData.slice(0, 10)); // 더미 데이터를 상태에 저장
    };

    fetchAlbums();
  }, []);
  return (
    <aside className="col-span-4 p-4 bg-white">
      <a href="chart" className="text-xl font-bold mb-4">
        인기 앨범 ＞
      </a>

      {albums.map((album) => (
        <div key={album.id} className="shadow-xl p-4 rounded-md mb-4 my-4">
          <div className="flex flex-grow items-center">
            <img
              src={album.album_image}
              alt={album.album_name}
              className="w-20 h-20 bg-coral rounded"
            />
            <div className="ml-4 flex flex-col">
              <h4 className="font-bold text-lg">{album.album_name}</h4>
              <p className="text-sm text-gray_dark">
                {album.album_artists
                  .map((artist) => artist.artists_name)
                  .join(", ")}
              </p>
              <p className="text-sm text-gray_dark">{album.release_date}</p>
              <span className="text-sm">★ {album.rated} / 5.0</span>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default PopularAlbumSection;
