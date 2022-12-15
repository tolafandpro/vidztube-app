import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  cursor: pointer;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-size: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  // const [desc, setdesc] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const inputChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfull, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "viideoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.prevent.default();
    const res = await axios.post("http://localhost:8800/api/videos/", {
      ...inputs,
      tags,
    });
    setOpen(false);
    res.status === 200 &&
      navigate(`http://localhost:8800/api/videos/${res.data._id}`);
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>x</Close>
        <Title>Upload a New Video</Title>
        <Label>Video</Label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc + " %"
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Input type="text" name="title" placeholder="Title" />
        <Desc
          type="textarea"
          name="textarea"
          placeholder="Write a video description here"
          rows={8}
          onChange={(e) => setTags(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />
        <Label>Image</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
