import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const CommentDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 10px;
`;
const Text = styled.p`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users/find/${comment.data.userId}`
      );
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <CommentDetail>
        <Name>
          {channel.name}
          <Date>2 hours ago</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </CommentDetail>
    </Container>
  );
};

export default Comment;
