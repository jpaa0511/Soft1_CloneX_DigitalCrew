import React, { useState, useEffect, useContext } from "react";
import {
  TweetContainer,
  Avatar,
  TweetContent,
  UserInfo,
  OptionsButton,
  OptionsMenu,
  StyledLink,
  PaginationContainer,
  PaginationButton,
  TweetDate,
} from "./styles";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  query,
  orderBy,
  where,
  limit as firestoreLimit,
  startAfter,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Posts } from "./Post";
import { UserContext } from "../../auth/Contexts/UserContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Tweet = ({ userId, loggedInUserId, limit = 10, showAll = false }) => {
  const [posts, setPosts] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [lastVisible, setLastVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const { user } = useContext(UserContext);

  const getPosts = (isNextPage = false) => {
    setIsLoading(true);
    const postsRef = collection(db, "posts");

    let q;
    if (showAll) {
      
      q = query(postsRef, orderBy("timestamp", "desc"), firestoreLimit(limit));
    } else {
      
      q = query(
        postsRef,
        where("userUid", "==", userId),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit)
      );
    }

    if (isNextPage && lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setIsLoading(false);
        return;
      }

      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts((prevPosts) => (isNextPage ? [...prevPosts, ...newPosts] : newPosts));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setIsLoading(false);
    });

    return unsubscribe;
  };

  const fetchProfileData = async (userUid) => {
    if (!userProfiles[userUid]) {
      const profileRef = doc(db, "perfil", userUid);
      const profileSnapshot = await getDoc(profileRef);
      if (profileSnapshot.exists()) {
        setUserProfiles((prevProfiles) => ({
          ...prevProfiles,
          [userUid]: profileSnapshot.data(),
        }));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = getPosts();
    return () => unsubscribe();
  }, [userId, showAll]);

  useEffect(() => {
    posts.forEach((post) => {
      fetchProfileData(post.userUid);
    });
  }, [posts]);

  const handleDelete = async (id, postUid) => {
    if (user?.uid !== postUid) {
      alert("You can't delete another user's post.");
      return;
    }

    try {
      await deleteDoc(doc(db, "posts", id));
      console.log(`Post with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleMenu = (id) => {
    setShowMenu((prevShowMenu) => (prevShowMenu === id ? null : id));
  };

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      {posts.map((post) => (
        <TweetContainer key={post.id}>
          <Avatar
            src={userProfiles[post.userUid]?.photoURL || "/default-avatar.png"}
            alt="User Avatar"
          />
          <TweetContent>
            <UserInfo>
              <StyledLink to={`/profile/${post.userUid}`}>
                {userProfiles[post.userUid]?.displayName || "User"}
              </StyledLink>{" "}
              <span>@{userProfiles[post.userUid]?.userName || post.username}</span>
              {post.verified && <VerifiedUserIcon className="post_icon" />}
              <TweetDate>
                {post.timestamp ? formatDate(post.timestamp) : ""}
              </TweetDate>
            </UserInfo>
            <OptionsButton onClick={() => toggleMenu(post.id)}>
              <MoreHorizIcon />
            </OptionsButton>
            {showMenu === post.id && (
              <OptionsMenu>
                <button onClick={() => handleDelete(post.id, post.userUid)}>Delete</button>
              </OptionsMenu>
            )}
            <Posts
              veridield={post.veridield}
              text={post.text}
              imagenPost={post.imagePost}
            />
          </TweetContent>
        </TweetContainer>
      ))}
      <PaginationContainer>
        <PaginationButton onClick={() => getPosts(true)} disabled={isLoading}>
          Load More
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};
