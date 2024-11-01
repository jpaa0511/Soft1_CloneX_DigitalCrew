import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Connecting_to_Firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  SearchContainer,
  SearchInput,
  ResultsContainer,
  UserResult,
  UserName,
  UserHandle,
  UserInfo,
  UserProfilePicture,
} from "./styles";

export const UserSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Hook para programar navegación

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchTerm.length >= 3) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [searchTerm]);

  const handleSearch = async () => {
    const userRef = collection(db, "perfil");
    const q = query(
      userRef,
      where("userName", ">=", searchTerm),
      where("userName", "<=", searchTerm + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      userId: doc.id, // Incluye el userId único para la ruta
      userName: doc.data().userName,
      displayName: doc.data().displayName,
      photoURL: doc.data().photoURL,
    }));
    setResults(users);
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`); // Navega a la ruta del perfil con userId
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search by user name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {results.length > 0 && (
        <ResultsContainer>
          {results.map((user) => (
            <UserResult key={user.userId} onClick={() => handleUserClick(user.userId)}>
              <UserProfilePicture src={user.photoURL} alt={user.userName} />
              <UserInfo>
                <UserName>{user.userName}</UserName>
                <UserHandle>{user.displayName}</UserHandle>
              </UserInfo>
            </UserResult>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};
