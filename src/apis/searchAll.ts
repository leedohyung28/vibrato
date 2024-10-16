import { useEffect, useState } from "react";
import axios from "axios";

// Artist 타입 정의
interface Artist {
  name: string;
  id: number;
  image_url: string;
  spotify_url: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
  genres?: string[];
}

// Album 타입 정의
interface Album {
  name: string;
  id: number;
  artists_name: string[];
  album_artists: {
    id: number;
    name: string;
    spotify_url: string;
    count_rated: number;
    liked: boolean;
  }[];
  spotify_url: string;
  image_url: string;
  total_tracks: number;
  release_date: string;
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

// Track 타입 정의
interface Track {
  name: string;
  id: number;
  artists_name: string[];
  image_url: string;
  spotify_url: string;
  preview?: string;
  album_id: number;
  album_name: string;
  release_date: string;
  duration: number;
  album_spotify_url: string;
  album_artists: {
    id: number;
    name: string;
    spotify_url: string;
    count_rated?: number;
    liked?: boolean;
  }[];
  avg_rated?: number;
  count_rated?: number;
  liked?: boolean;
}

export const useSearchAll = (searchContent: string) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.put(`/search/all/${searchContent}`);

        const { artists, albums, tracks } = response.data;

        setArtists(Array.isArray(artists) ? artists : []);
        setAlbums(Array.isArray(albums) ? albums : []);
        setTracks(Array.isArray(tracks) ? tracks : []);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchContent) {
      fetchSearchResults();
    }
  }, [searchContent]);

  return { artists, albums, tracks, loading, error };
};

export default useSearchAll;
