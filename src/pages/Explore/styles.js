import styled from "styled-components";
import { Link } from "react-router-dom";


export const ExploreContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  max-width: 600px; /* Para limitar el ancho máximo del timeline */
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 10px;
  border: 1 solid #e1e8ed;
  border-radius: 20px;
  outline: none;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

export const TrendingContainer = styled.div`
  background-color: #000;
  padding; 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const TrendingItem = styled.div`
  padding: 10px, 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
  }
`;

export const TrendingTopic = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
`;

export const TopicTweets = styled.p`
  font-size: 14px;
  color: white;
`;

export const SuggestionsContainer = styled.div`
  background-color: #0000;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const UserSuggestions = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e1e8ed;

  &:last-child {
    border-bottom: none;
  }
`;

export const UserProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const UserName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const FollowButton = styled.button`
  margin-left: auto;
  padding: 6px 12px;
  background-color: #1da1f2;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1991da;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    color: #1da1f2;
  }
`;
