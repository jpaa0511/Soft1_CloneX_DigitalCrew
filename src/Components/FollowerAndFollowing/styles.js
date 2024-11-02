import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  background-color: #000;
  color: #fff;
`;

export const ProfileContainer = styled.div`
  background-color: #000;
  padding: 20px;
  color: #fff;
  font-family: Arial, sans-serif;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const BackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 20px; 
`;

export const Username = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
  margin-right: 10px;
`;

export const Handle = styled.p`
  color: #777;
  font-size: 14px;
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 10px 0;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 14px;
  color: ${({ active }) => (active ? '#fff' : '#777')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  text-align: center;
  position: relative;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => (active ? '30%' : '0')};
    height: 2px;
    background-color: #1da1f2;
    transition: width 0.3s;
  }
`;


export const Content = styled.div`
  margin-top: 10px;
`;

export const FollowerList = styled.div`
  font-size: 14px;
  border-bottom: 1px solid #333;
`;

export const FollowerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const FollowingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  
`;

export const FollowerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FollowerName = styled.h3`
  font-size: 18px;
  margin-bottom: 3px;
`;

export const FollowerHandle = styled.p`
  color: #777;
  font-size: 14px;
`;

export const FollowButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 5px 15px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

export const FollowingList = styled.div`
  font-size: 14px;
  border-bottom: 1px solid #333;
`;

export const FollowingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FollowingName = styled.h3`
  font-size: 18px;
  margin-bottom: 3px;
`;

export const FollowingHandle = styled.p`
  color: #777;
  font-size: 14px;
`;



