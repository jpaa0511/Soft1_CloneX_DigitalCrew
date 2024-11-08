import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  border: 1px solid #e1e8ed;
  font-size: 15px;
  outline: none;
  color: #14171a;
  background-color: #f5f8fa;
  transition: all 0.3s ease;

  &:focus {
    border-color: #1da1f2;
    background-color: #ffffff;
  }
`;

export const ResultsContainer = styled.div`
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const UserResult = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e8ed;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f8fa;
  }
`;

export const UserProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.p`
  font-size: 15px;
  font-weight: bold;
  color: #14171a;
  margin: 0;
`;

export const UserHandle = styled.p`
  font-size: 14px;
  color: #657786;
  margin: 0;
`;
