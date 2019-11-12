import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

const HeaderContainer = styled.div`
  background-color: rgb(88, 118, 168);
  width: 100%;
`;

const HeaderLayout = styled.div`
  display: flex;
  padding: 10px 0;
  margin: auto;
  width: 80%;
`;

const Title = styled.div`
  width: 40%;
`;

const Logo = styled.div`
  float: left;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 60%;
  > a {
    text-decoration: none;
  }
`;

const NavItem = styled.div`
  color: #aaa;
  padding: 10px 15px;
  margin: 0 10px;
  border: 2px #aaa solid;
  border-radius: 4px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderLayout>
        <Title>
          <Logo></Logo>
        </Title>
        <Navigation>
          <Link to="/">
            <NavItem>Home</NavItem>
          </Link>
          <NavItem>Classes</NavItem>
          <Link to="card">
            <NavItem>Card Sets</NavItem>
          </Link>
        </Navigation>
      </HeaderLayout>
    </HeaderContainer>
  );
};

export default Header;
