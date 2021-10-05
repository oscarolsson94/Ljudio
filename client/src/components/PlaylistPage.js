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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {playlist.map((song) => (
        <div key={song._id}>
          <p>
            <img src={song.coverPic} alt="album" /> |{song.title} |{" "}
            {song.artist}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PlaylistPage;
