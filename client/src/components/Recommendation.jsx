import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/videos/tags=${tags}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <VideoCard type="small" key={video.id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
