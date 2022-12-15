import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TimeAgo from "timeago-react";

const Container = styled.div`
  width: ${(props) => props.type !== "small" && "280px"};
  margin-bottom: ${(props) => (props.type === "small" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "small" && "flex"};
  gap: 5px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "small" ? "7.5rem" : "153px")};
  background-color: #999;
  border-radius: 8px;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type === "small" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "small" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const VideoCard = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/find/${video.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i.ytimg.com/vi/5Cm7SUP39UU/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDNOuTNvAQUYO94JzlVnIaZrUxNmw"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://pbs.twimg.com/profile_images/1446256465270947844/t2pKIWHP_400x400.jpg"
            // src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views •{" "}
              <TimeAgo datetime={video.createdAt} locale="vi" />
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default VideoCard;
