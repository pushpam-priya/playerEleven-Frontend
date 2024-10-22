import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AboutTitle = styled.h1`
  color: #1a1a2e;
  margin-bottom: 1rem;
`;

const AboutContent = styled.p`
  color: #333;
  line-height: 1.6;
`;

const About = () => {
    return (
        <AboutContainer>
            <AboutTitle>About Player 11 Fantasy Sports</AboutTitle>
            <AboutContent>
                This small project is a fantasy sports game where you can choose 11 players from a list of players and create a team. You can also see the list of matches and the details of each match.
                This was created as part of Hiring Assignment for MERN Stack Developer at Purani Dilli Talkies.
            </AboutContent>
        </AboutContainer>
    );
};

export default About;
