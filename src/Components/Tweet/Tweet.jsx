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
  OptionsButton,
  OptionsMenu,
} from "./styles";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  query,
  orderBy,
  where,
  limit as firestoreLimit,
  startAfter,
  endBefore,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Posts } from "./Post";
import { UserContext } from "../../auth/Contexts/UserContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Tweet = ({ userId, limit = 10, showAll = false }) => {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
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

  // const getPosts = (isNextPage = false, isPrevPage = false) => {
  //   setIsLoading(true);
  //   const postsRef = collection(db, "posts");

  //   const usersToQuery = showAll ? [user.uid, ...following] : [userId];
  //   let q = query(
  //     postsRef,
  //     where("userUid", "in", usersToQuery),
  //     orderBy("timestamp", "desc"),
  //     firestoreLimit(limit)
  //   );

  //   if (isNextPage && lastVisible) {
  //     q = query(q, startAfter(lastVisible));
  //   } else if (isPrevPage && firstVisible) {
  //     q = query(q, endBefore(firstVisible));
  //   }

  //   const unsubscribe = onSnapshot(q, async (snapshot) => {
  //     if (!snapshot.empty) {
  //       const newPosts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));

  //       const postsWithDisplayName = await Promise.all(
  //         newPosts.map(async (post) => {
  //           const userDocRef = doc(db, "perfil", post.userUid);
  //           const userSnapshot = await getDoc(userDocRef);
  //           const displayName = userSnapshot.exists()
  //             ? userSnapshot.data().displayName
  //             : "User";
  //           return { ...post, displayName };
  //         })
  //       );

  //       setPosts(postsWithDisplayName);
  //       setFirstVisible(snapshot.docs[0]);
  //       setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  //     } else {
  //       setPosts([]);
  //     }
  //     setIsLoading(false);
  //   });

  //   return unsubscribe;
  // };

  const getPosts = (isNextPage = false, isPrevPage = false) => {
    setIsLoading(true);
    const postsRef = collection(db, "posts");
  
    const usersToQuery = showAll ? [user.uid, ...following] : [userId];
    let q = query(
      postsRef,
      where("userUid", "in", usersToQuery),
      orderBy("timestamp", "desc"),
      firestoreLimit(limit)
    );
  
    if (isNextPage && lastVisible) {
      q = query(q, startAfter(lastVisible));
    } else if (isPrevPage && firstVisible) {
      q = query(q, endBefore(firstVisible));
    }
  
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (!snapshot.empty) {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const postsWithDisplayNameAndUserName = await Promise.all(
          newPosts.map(async (post) => {
            const userDocRef = doc(db, "perfil", post.userUid);
            const userSnapshot = await getDoc(userDocRef);
            const userData = userSnapshot.exists() ? userSnapshot.data() : {};
            return { 
              ...post, 
              displayName: userData.displayName || "User", 
              userName: userData.userName || "Usuario" 
            };
          })
        );
  
        setPosts(postsWithDisplayNameAndUserName);
        setFirstVisible(snapshot.docs[0]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        setPosts([]);
      }
      setIsLoading(false);
    });
  
    return unsubscribe;
  };
  

  const handleDelete = async (id, postUid) => {
    if (user?.uid !== postUid) {
      alert("You can't delete another user's post.");
      return;
    }

    try {
      await deleteDoc(doc(db, "posts", id));
      console.log(`Post with id ${id} deleted`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const toggleMenu = (id) => {
    setShowMenu((prevShowMenu) => (prevShowMenu === id ? null : id));
  };

  useEffect(() => {
    if (showAll) {
      fetchFollowing();
    }
  }, [user?.uid]);

  useEffect(() => {
    if ((showAll && user.uid) || (!showAll && userId)) {
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
                  <span> @{post.userName}</span>
                  {post.verified && <VerifiedUserIcon className="post_icon" />}
                  <TweetDate>
                    {post.timestamp
                      ? post.timestamp.toDate().toLocaleString()
                      : ""}
                  </TweetDate>
                </UserInfo>
                <OptionsButton onClick={() => toggleMenu(post.id)}>
                  <MoreHorizIcon />
                </OptionsButton>
                {showMenu === post.id && (
                  <OptionsMenu>
                    {user?.uid === post.userUid && (
                      <button
                        onClick={() => handleDelete(post.id, post.userUid)}
                      >
                        Delete
                      </button>
                    )}
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
            <PaginationButton
              onClick={() => getPosts(false, true)}
              disabled={isLoading || !firstVisible}
            >
              Previous
            </PaginationButton>
            <PaginationButton
              onClick={() => getPosts(true)}
              disabled={isLoading || !lastVisible}
            >
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
