import Favorites from "../components/Favorites";

// Sample data for the tracks
const tracks = [
  {
    cover: "https://picsum.photos/300/300",
    id: 1,
    title: "노래 제목",
    trackNumber: "트랙 1",
    runningTime: "3:30",
    rating: 5.0,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    id: 2,
    title: "노래 제목",
    trackNumber: "트랙 2",
    runningTime: "3:30",
    rating: 5.0,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    id: 3,
    title: "노래 제목",
    trackNumber: "트랙 3",
    runningTime: "3:30",
    rating: 5.0,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    id: 4,
    title: "노래 제목",
    trackNumber: "트랙 4",
    runningTime: "3:30",
    rating: 5.0,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    id: 5,
    title: "노래 제목",
    trackNumber: "트랙 5",
    runningTime: "3:30",
    rating: 5.0,
    ratingCount: 10,
  },
];

// Track component
const TrackList: React.FC = () => {
  return (
    <section className="col-span-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">트랙</h2>
        <div className="mt-4 rounded-md border border-gray_border shadow-md">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="flex justify-between border-b items-center"
            >
              <div className="flex flex-row items-center space-x-2">
                <img
                  src={track.cover}
                  alt="album Cover"
                  className="p-2 w-20 h-20 rounded"
                />
                <p className="text-lg font-bold">{track.title}</p>
                <p className="text-sm font-semibold text-gray_dark">
                  {track.runningTime}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray_dark">
                  ★ {track.rating} / 5.0 | 🗎 {track.ratingCount}
                </span>
                <div className="mt-1 transform scale-50">
                  <Favorites />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
