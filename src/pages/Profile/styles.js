import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  background-color: #000;
`;

export const ProfileHeaderContainer = styled.div`
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
          content: "";
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
