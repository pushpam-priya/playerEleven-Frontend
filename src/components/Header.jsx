import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #90aaf0;
  color: #ffffff;
`;

const HeaderText = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
`;

const AboutButton = styled(Link)`
  background-color: #4c70cf;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f3460;
  }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderText>Player 11 Fantasy Sports</HeaderText>
            <AboutButton to="/about">About</AboutButton>
        </HeaderContainer>
    );
};

export default Header;
