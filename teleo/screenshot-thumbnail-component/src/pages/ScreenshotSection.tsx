import React from 'react';
import ScreenshotThumbnail from '../components/screenshotThumbnail';
import UserInfoCard from '../components/userCard';
import styled from 'styled-components';
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';

//adjust for example!
import { useQuery } from '@apollo/client';
import { GET_SREENSHOTS } from '../graphql/queries/screenshot'; 

const FullPageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100vh;
  background-color: #ffedcc;
  flex-direction: column;
`;

const userImages = [image1, image2, image3, image4];

const userName: string = "Kay"

function ScreenchotSection() {

  const userImagesList: Array<any> = [];

  userImages.forEach((image, index) => {
    userImagesList.push(<ScreenshotThumbnail imageUrl={image}/>);
  });
  return (
    <FullPageContainer>
      <UserInfoCard message={`Hey ${userName}!, here are your fantastic image captures`}/>
      {userImagesList}
    </FullPageContainer>
  );
}

export default ScreenchotSection;
