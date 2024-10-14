import React, { useEffect, useState } from "react";
import TrackContainer from "../../components/container/TrackContainer";
import CommentSection from "../../components/CommentSection";
import Lyrics from "../../components/Lyrics";
import { getTrackInfo } from "../../apis/track";
import { useParams } from "react-router-dom";

interface TrackData {
  name: string;
  image_url: string;
  artist_names: string[];
  // release_date: string;
  spotify_url: string;
  album: Album;
  duration: number;
  avg_rated: number;
  // genres: string;
}

interface Album {
  id: string;
  name: string;
}

const Track: React.FC = () => {
  const [track, setTrack] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  const { trackId } = useParams(); // 동적 파라미터인 trackId 추출

  useEffect(() => {
    const fetchTrack = async () => {
      if (trackId) {
        try {
          const trackData = await getTrackInfo(trackId);
          setTrack(trackData); // 앨범 정보를 상태로 설정
        } catch (error) {
          console.error("Error fetching album info:", error);
        } finally {
          setLoading(false); // 로딩 완료
        }
      }
    };

    fetchTrack();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 UI
  }

  function formatDuration(ms: number) {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      {track ? (
        <>
          <TrackContainer
            image_url={track.image_url}
            name={track.name}
            artists={track.artist_names.join(", ") || "Unknown Artists"}
            spotify_url={track.spotify_url}
            album={track.album.name}
            duration={formatDuration(track.duration)}
            avg_rated={track.avg_rated}
          />
          <CommentSection />
          <Lyrics />
        </>
      ) : (
        <div>Track information not available</div> // 트랙 정보가 없을 때 보여줄 UI
      )}
    </div>
);

};

export default Track;
