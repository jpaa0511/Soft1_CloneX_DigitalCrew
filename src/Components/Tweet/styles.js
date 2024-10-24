import styled from "styled-components";

export const TweetContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #2f3336;
  background-color: #000;
  color: #d9d9d9;
  border-radius: 10px;
  position: relative; /* Necesario para el menú */
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #202327;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
  margin-right: 10px;
`;

export const TweetContent = styled.div`
  flex: 1;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  strong {
    margin-right: 5px;
    font-size: 15px;
  }

  span {
    font-size: 14px;
    color: #8899a6; /* Color para el handle del usuario */
  }
`;

export const TweetText = styled.p`
  font-size: 15px;
  color: #e1e8ed;
  margin-bottom: 10px;
`;

export const Interactions = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 250px;
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #6e767d;
    transition: color 0.3s ease;

    &:hover {
      color: #1da1f2;
    }

    .MuiSvgIcon-root {
      font-size: 20px;
    }
  }
`;

export const OptionsButton = styled.button`
  background: transparent;
  border: none;
  color: #6e767d;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    color: #1da1f2;
  }
`;

export const OptionsMenu = styled.div`
  position: absolute;
  top: 35px;
  right: 10px;
  background-color: #15181c;
  border: 1px solid #2f3336;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10;

  button {
    background: transparent;
    border: none;
    color: #ff4757;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: #e84118;
    }
  }
`;

export const Post = styled.div`
  padding: 10px 15px;
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
  .post-avatar {
    margin-top: 5px;
  }
`;

export const Images = styled.img`
  border-radius: 20px;
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

export const PostBody = styled.div`
  width: 100%;
  overflow: hidden;
  
  > div {
    span {
      font-weight: 600;
      font-size: 15px;
      color: #8899a6;
    }
  }

  h2 {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #d9d9d9;
  }

  p {
    color: #e1e8ed;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const PostDescription = styled.div`
  margin-bottom: 20px;
  > p {
    margin: 0;
    padding: 0;
    color: #fafbfd;
    font-size: 16px;
    line-height: 16.6875px;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: #5b7083;
  transition: all 100ms ease-in;
  > .MuiSvgIcon-root:hover:nth-child(1) {
    fill: #fafbfd;
    cursor: pointer;
  }
  > .MuiSvgIcon-root:hover:nth-child(2) {
    fill: #fafbfd;
    cursor: pointer;
  }
  > .MuiSvgIcon-root:hover:nth-child(3) {
    fill: #fafbfd;
    cursor: pointer;
  }
  > .MuiSvgIcon-root:hover:nth-child(4) {
    fill: #fafbfd;
    cursor: pointer;
  }
`;


