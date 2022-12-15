import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/video";
import Signing from "./pages/Signing";
import Register from "./pages/Register";
import Search from "./pages/Search";


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background: ${({theme})=> theme.bg};
  color: ${({theme})=> theme.text};
`;
const Wrapper = styled.div`
  padding: 10px 15px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <Container>
        <Router>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Wrapper >
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random"/>} />
                <Route path="trends" element={<Home type="trend"/>} />
                <Route path="subscriptions" element={<Home type="sub"/>} />
                <Route path="search" element={<Search />} />
                <Route path="login" element={<Signing />} />
                <Route path="signup" element={<Register />} />
                <Route path="video">
                    <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
