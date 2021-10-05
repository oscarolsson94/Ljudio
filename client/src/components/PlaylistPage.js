import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function PlaylistPage() {
  const { title } = useParams();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/lists/single/" + title
      );
      setPlaylist(result.data.content);
    };
    getAllPlaylists();
  }, []);

  return (
    <div>
      <p>{title}</p>
      {playlist.map((song) => (
        <div>
          <p>{song.title}</p>
          <p>{song.artist}</p>
        </div>
      ))}
    </div>
  );
}

export default PlaylistPage;
