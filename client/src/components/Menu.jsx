import styled from "styled-components";
import OdTube from "../images/ODplaylogo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import HelpIcon from "@mui/icons-material/Help";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 1.125rem 1.625rem;
`;
const LogoWrapper = styled.div`
  display: flex;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 10px;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  color: #3ea6ff;
  border: 1px solid #3ea6ff;
  font-weight: 500;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <MenuIcon />
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "20px",
            }}
          >
            <Logo>
              <Img src={OdTube} />
              OD Tube
            </Logo>
          </Link>
        </LogoWrapper>
        <Link to="random" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment and Subscribe
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>Best of OD Tube</Title>
        <Item>
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballIcon />
          Sport
        </Item>
        <Item>
          <SportsEsportsIcon />
          Gaming
        </Item>
        <Item>
          <MovieCreationIcon />
          Movies
        </Item>
        <Item>
          <ArticleIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <FlagCircleIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
