import React, { useState, useEffect, useContext } from "react";
import {
  TweetContainer,
  Avatar,
  TweetContent,
  UserInfo,
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
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { Posts } from "./Post";
import { UserContext } from "../../auth/Contexts/UserContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export const Tweet = ({ userId, limit = 10, showAll = false }) => {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const fetchFollowing = async () => {
    if (user?.uid) {
      const userDocRef = doc(db, "perfil", user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFollowing(userData.following || []);
      }
    }
  };

  const getPosts = () => {
    setIsLoading(true);
    const postsRef = collection(db, "posts");
    let q;

    if (showAll) {
      const usersToQuery = [user.uid, ...following].filter(Boolean);
      q = query(
        postsRef,
        where("userUid", "in", usersToQuery),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit)
      );
    } else if (userId) {
      q = query(
        postsRef,
        where("userUid", "==", userId),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit)
      );
    } else {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const postsWithDisplayName = await Promise.all(
        postData.map(async (post) => {
          const userDocRef = doc(db, "perfil", post.userUid);
          const userSnapshot = await getDoc(userDocRef);
          const displayName = userSnapshot.exists() ? userSnapshot.data().displayName : "User";
          return { ...post, displayName };
        })
      );

      setPosts(postsWithDisplayName);
      setIsLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (showAll) {
      fetchFollowing();
    }
  }, [user?.uid]);

  useEffect(() => {
    if ((showAll && following.length > 0) || (!showAll && userId)) {
      const unsubscribe = getPosts();
      return () => unsubscribe && unsubscribe();
    }
  }, [showAll, following, userId]);

  return (
    <div>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <TweetContainer key={post.id}>
              <Avatar
                src={post.avatar || "/default-avatar.png"}
                alt="User Avatar"
              />
              <TweetContent>
                <UserInfo>
                  <StyledLink to={`/profile/${post.userUid}`}>
                    {post.displayName || "User"}
                  </StyledLink>{" "}
                  <span>@{post.userName}</span>
                  {post.verified && <VerifiedUserIcon className="post_icon" />}
                  <TweetDate>{post.timestamp ? post.timestamp.toDate().toLocaleString() : ""}</TweetDate>
                </UserInfo>
                <Posts
                  veridield={post.veridield}
                  text={post.text}
                  imagenPost={post.imagePost}
                />
              </TweetContent>
            </TweetContainer>
          ))}
          <PaginationContainer>
            <PaginationButton onClick={() => getPosts(false, true)} disabled={isLoading}>
              Previous
            </PaginationButton>
            <PaginationButton onClick={() => getPosts(true)} disabled={isLoading}>
              Next
            </PaginationButton>
          </PaginationContainer>
        </>
      ) : (
        <p>No tweets available.</p>
      )}
    </div>
  );
};
