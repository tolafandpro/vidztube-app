import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.text}; */
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 18px;
  padding: 20px 50px;
  gap: 10px;
  box-shadow: 1px 1px 13px 0px ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 20px;
`;
const SinginContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  border-radius: 5px;
  border: none;
  padding: 8px 18px;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.blue};
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 3px;
  width: 100%;
  padding: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.text}; ;
`;
const More = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 20px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
`;
const BottomLink = styled.span`
  margin-left: 30px;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("http://localhost:8800/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
          });
      })
      .catch((error) => {
        dispatch(loginFailure);
      });
  };
  return (
    <Container>
      <Wapper>
        <Title>Sign Up</Title>
        <Button onClick={signInWithGoogle}>Sign-up with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.email)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.confirmPass)}
        />
        <Button>Sign Up</Button>
        <SinginContainer>
          <h6>Already have an account ?</h6>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontSize: "12px",
              color: "inherit",
            }}
          >
            Click here
          </Link>
        </SinginContainer>
      </Wapper>
      <More>
        English(USA)
        <Links>
          <BottomLink>Help</BottomLink>
          <BottomLink>Privacy</BottomLink>
          <BottomLink>Tearms</BottomLink>
        </Links>
      </More>
    </Container>
  );
};

export default Register;
