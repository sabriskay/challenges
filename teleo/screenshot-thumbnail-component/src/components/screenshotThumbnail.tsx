import React from 'react';
import styled from 'styled-components';

interface ScreenshotThumbnailProps {
  imageUrl: string;
}

const ThumbnailContainer = styled.div`
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;
  margin: 10px;
  transition: transform 0.2s ease;
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: scale(1.05); 
  }
`;

const ThumbnailImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  transition: transform 0.2s ease;
`;



const ScreenshotThumbnail: React.FC<ScreenshotThumbnailProps> = ({ imageUrl }) => {
  return (
    <ThumbnailContainer>
      <ThumbnailImage src={imageUrl} alt="Screenshot Thumbnail" />
    </ThumbnailContainer>
  );
};

export default ScreenshotThumbnail;