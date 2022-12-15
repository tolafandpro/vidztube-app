import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import { useState } from "react";
import UserSettings from "./UserSettings";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;
const SearchContainer = styled.div`
  position: absolute;
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const SearchInput = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ModeButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: #3ea6ff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [openUserSetting, setOpenUserSetting] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSettings = () => {
    setOpenUserSetting(!openUserSetting);
  };
  return (
    <>
      <Container>
        <Wrapper>
          <SearchContainer>
            <SearchInput
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </SearchContainer>
          <ModeButton>
            <DarkModeSwitch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              size={35}
              sunColor="yellow"
              moonColor="black"
            />
          </ModeButton>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} onClick={handleSettings} />
              {openUserSetting && <UserSettings />}
            </User>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
