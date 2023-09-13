import React from 'react';
import styled from 'styled-components';

const UserCardContainer = styled.div`
    background-color: #ffedcc; /* Warm yellow background */
    border: 2px solid #ffa500; /* Orange border */
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 93%;
    margin: 10px;
`;

const UserName = styled.h2`
    font-size: 24px;
    color: #ff6600;
`;

interface UserInfoCardProps {
    message: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ message }) => {
  return (
    <UserCardContainer>
        <UserName>{message}</UserName>
    </UserCardContainer>

  );
};

export default UserInfoCard;
