import { useNavigate } from "react-router-dom";
import Favorites from "../components/Favorites";

interface TrackProps {
  tracks: {
    id: string;
    name: string;
    spotify_url: string;
    track_number: number;
    liked: boolean;
  }[];
  album_image_url: string;
}

const TrackList: React.FC<TrackProps> = ({ tracks, album_image_url }) => {

  const navigate = useNavigate();

  const handleClick = (track_id: string) => {
    navigate(`/track/${track_id}`);
  };  

  return (
    <section className="col-span-8">
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">트랙</h2>
        <div className="mt-4 rounded-md border border-gray_border shadow-md">
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => handleClick(track.id)} 
              className="flex justify-between border-b items-center cursor-pointer hover:bg-gray-200"
            >
              <div className="flex flex-row items-center space-x-2">
                <img
                  src={album_image_url}
                  alt="album Cover"
                  className="p-2 w-20 h-20 rounded"
                />
                <p className="text-lg font-bold">{track.name}</p>
                <p className="text-sm font-semibold text-gray_dark">
                  duration
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold text-gray_dark">
                  ★ {track.rating} / 5.0 | 🗎 {track.ratingCount}
                </span>
                <span className="m-2 w-8 h-8">
                  <Favorites />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
