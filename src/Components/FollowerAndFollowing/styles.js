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
  color: #1da1f2;
  font-size: 18px;

  &:hover {
    color: #555;
  }
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
  color: ${({ $active }) => ($active ? "#fff" : "#777")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  text-align: center;
  position: relative;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: ${({ $active }) => ($active ? "#1da1f2" : "transparent")};
    transition: background-color 0.3s ease;
  }
`;

export const Content = styled.div`
  margin-top: 10px;
`;

export const FollowingList = styled.div`
  font-size: 14px;
`;

export const FollowingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #333;
`;

export const FollowingAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const FollowingInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const FollowingName = styled.h3`
  font-size: 16px;
  color: #fff;
  margin: 0;
  cursor: pointer; /* Indica que el elemento es clicable */
  text-decoration: none; /* Remueve el subrayado */

  &:hover {
    color: #ccc; /* Cambia ligeramente el color en hover, opcional */
  }
`;

export const FollowingHandle = styled.p`
  color: #777;
  font-size: 14px;
  margin: 0;
`;

export const FollowButton = styled.button`
  background-color: ${({ following }) => (following ? "#333" : "#333")};
  color: ${({ following }) => (following ? "#fff" : "#fff")};
  padding: 5px 15px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-left: auto;

  &:hover {
    background-color: ${({ following }) => (following ? "#555" : "#1a91da")};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const PaginationButton = styled.button`
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #5b7083;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #1991da;
  }
`;

export const FollowerList = styled.div`
  font-size: 14px;
`;

export const FollowerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-top: 1px solid #333;
`;

export const FollowerAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const FollowerInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const FollowerName = styled.h3`
  font-size: 16px;
  color: #fff;
  margin: 0;
  cursor: pointer; /* Indica que el elemento es clicable */
  text-decoration: none; /* Remueve el subrayado */

  &:hover {
    color: #ccc; /* Cambia ligeramente el color en hover, opcional */
  }
`;

export const FollowerHandle = styled.p`
  color: #777;
  font-size: 14px;
  margin: 0;
`;
