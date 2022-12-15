import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "./../components/VideoCard";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/videos/search${query}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
