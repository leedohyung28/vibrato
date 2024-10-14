import React, { useEffect, useState } from "react";
import AlbumContainer from "../../components/container/AlbumContainer";
import CommentSection from "../../components/CommentSection";
import TrackList from "../../components/TrackList";
import { getAlbumInfo } from "../../apis/album";

// Album 데이터 타입 정의
interface AlbumData {
  name: string;
  image_url: string;
  artist_names: string[];
  release_date: string;
  spotify_url: string;
  avg_rated: number;
  genres: string[];
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  spotify_url: string;
  track_number: number;
  liked: boolean;
}

const Album: React.FC = () => {
  const [album, setAlbum] = useState<AlbumData | null>(null); // 타입 명시
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await getAlbumInfo("5NMtxQJy4wq3mpo3ERVnLs");
        setAlbum(albumData); // 앨범 정보를 상태로 설정
      } catch (error) {
        console.error("Error fetching album info:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchAlbum();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 UI
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      {album ? (
        <>
          <AlbumContainer
            image_url={album.image_url}
            name={album.name}
            // artists={album.artists_names.join(", ")}
            artists={album?.artist_names?.join(", ") || "Unknown Artists"}
            release_date={album?.release_date || "Unkown Release Date"}
            spotify_url={album.spotify_url}
            avg_rated={album.avg_rated}
            genres={album.genres?.join(", ")}
          />
          <CommentSection />
          <TrackList 
            tracks={album.tracks}
            album_image_url={album.image_url}
          />
        </>
      ) : (
        <div>Track information not available</div> // 트랙 정보가 없을 때 보여줄 UI
      )}
    </div>
  );
};

export default Album;
