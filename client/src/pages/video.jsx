import styled from "styled-components";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import Comments from "../components/Comments";
import TimeAgo from "timeago-react";
// import VideoCard from "./../components/VideoCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
// import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 20px;
`;
const Content = styled.div`
  flex: 4;
`;

const VideoContainer = styled.div`
  width: 100%;
`;

const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelAvarta = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;
// const Subscription = styled.div``;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  background-color: red;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  // const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchVideo = await axios.get(
          `http://localhost:8800/api/videos/find/${path}`
        );
        const fetchChannel = await axios.get(
          `http://localhost:8800/api/users/find/${fetchVideo.data.userId}`
        );
        // setVideo(fetchVideo.data);
        setChannel(fetchChannel.data);
        dispatch(fetchSuccess(fetchVideo.data));
      } catch (error) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`http://localhost:8800/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(
      `http://localhost:8800/api/users/dislike/${currentVideo._id}`
    );
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUser.includes(channel._id)
      ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`)
      : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoContainer>
          <VideoFrame src={currentVideo.videoUrl} controls />
          {/* <iframe
            width="100%"
            height="420"
            src="https://www.youtube.com/embed/JXJqxBEDxdM"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </VideoContainer>
        <VideoTitle>{currentVideo.title}</VideoTitle>
        <Details>
          <Info>
            {currentVideo.views} views •{" "}
            {<TimeAgo datetime={currentVideo.createdAt} locale="vi" />}
            {/* {format(currentVideo && currentVideo.createdAt)} */}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <VerticalAlignBottomOutlinedIcon /> Download
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelAvarta src={channel.img} />
            {/* "https://pbs.twimg.com/profile_images/1446256465270947844/t2pKIWHP_400x400.jpg"  */}
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.subscribedUser?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
      {/* <Recommendation>
        Recommendation
        <VideoCard type="small" />
        <VideoCard type="small" />
        <VideoCard type="small" />
        <VideoCard type="small" />
        <VideoCard type="small" />
      </Recommendation> */}
    </Container>
  );
};

export default Video;
