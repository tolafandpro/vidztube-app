import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 15px;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.soft};
`;

const MenuTrigger = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  max-height: 120px;
  background-color: transparent;

  &.${(props) => props.activeClassName} {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition: var(--speed) ease;
  }

  &.${(props) => props.inactiveClassName} {
    opacity: 0;
    visibility: hidden;
    transform: translate(-20px);
    transition: var(--speed) ease;
  }
`;

const DropdownWrapper = styled.ul`
  padding: 10px 0;
  align-items: center;
  text-align: justify;
  border-top: ${({ theme }) => theme.soft};
`;
const DropdownList = styled.li`
  text-align: center;
  list-style: none;
  padding: 8px 0;
  font-size: small;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 0.5px 0px;
  border: 0.1px solid ${({ theme }) => theme.text};
`;

const UserSettings = () => {
  return (
    <Container>
      <MenuTrigger>
        <DropdownWrapper>
          <DropdownList>Logout</DropdownList>
          <Hr />
          <DropdownList>Settings</DropdownList>
          <Hr />
          <DropdownList>Profile</DropdownList>
        </DropdownWrapper>
      </MenuTrigger>
    </Container>
  );
};

export default UserSettings;
