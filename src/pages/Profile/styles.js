import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  background-color: #000;
  color: #fff;
`;

export const ProfileHeaderContainer = styled.div`
  .header-top {
    padding: 16px;
    border-bottom: 1px solid #2f3336;
    
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
    }
    
    span {
      font-size: 13px;
      color: #71767b;
    }
  }

  .cover-photo-container {
    width: 100%;
    height: 200px;
    background-color: #333;
    position: relative;
    
    .cover-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .profile-photo {
      position: absolute;
      bottom: -60px;
      left: 16px;
      width: 134px;
      height: 134px;
      border: 4px solid #000;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .profile-info {
    padding: 16px;
    margin-top: 60px;
    
    .profile-name {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 4px;
      color: white;
      padding-bottom: 5px;
    }
    
    .username {
      color: #71767b;
      margin: 0;
    }
    
    .join-date {
      display: flex;
      align-items: center;
      color: #71767b;
      margin-top: 12px;
      gap: 4px;
    }
    
    .stats {
      display: flex;
      gap: 20px;
      margin-top: 12px;
      
      span {
        color: #71767b;
        
        strong {
          color: #fff;
        }
      }
    }
  }
`;

export const Stats = styled.div`
  display: flex;
  gap: 20px; /* Espacio entre los elementos */
`;

export const StatItem = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  span.number {
    font-weight: bold;
    margin-right: 4px;
    color: rgb(331, 233, 234);
  }

  span.text {
    font-weight: normal;
    color: #6c757d;
  }

  &:hover::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: rgb(231, 233, 234);
  }
`;

export const ProfileButton = styled.button`
  position: absolute;
  right: 360px;
  top: 240px;
  background-color: transparent;
  color: #fff;
  font-weight: bold;
  border: 1px solid rgb(83, 100, 113);
  border-radius: 9999px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(239, 243, 244, 0.1);
  }
`;

export const TabsContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #2f3336;
  background-color: #000;

  .nav-item {
    flex: 1;
    text-align: center;

    .nav-link {
      display: block;
      padding: 16px 0;
      color: #71767b;
      text-decoration: none;
      font-size: 15px;
      
      &.active {
        color: #fff;
        font-weight: bold;
        position: relative;
        
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: rgb(29, 155, 240);
          border-radius: 4px 4px 0 0;
        }
      }

      &:hover {
        background-color: rgba(239, 243, 244, 0.1);
      }
    }
  }
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: rgba(29, 155, 240, 0.1);
  border-radius: 4px;
  padding: 4px 8px;
  color: rgb(29, 155, 240);
  font-size: 13px;
  margin-left: 4px;
`;

export const CloseButton = styled.button`
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border; none;
    background: none;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 5px;
    color: #fff;

    &:hover {
        background: #ccc;
    }
`;

export const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TitleRegister = styled.h1`
  font-size: 31px;
  font-weight: 700;
  color: #e7e9ea;
`;

export const Form = styled.div`
  margin-top: 2rem;
`;

export const Input = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 7px;
    border: 1px solid #ccc;
    border-radius: 16px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #1da1f2;
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border-radius: fill;
`;

export const File = styled.input.attrs({ type: "file" })`
  position: absolute;
  z-index: 10;
  opacity: 0;
  cursor: pointer;

  &.primary {
    top: 0;
    left: -51px;
  }

  &.secondary {
    top: 25px;
    left: 16px;
    width: 30px;
  }

  &.tertiary {
    top: 25px;
    left: 56px;
    width: 30px;
  }
`;

// ---------------------------------------------------------------------------------------------

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



