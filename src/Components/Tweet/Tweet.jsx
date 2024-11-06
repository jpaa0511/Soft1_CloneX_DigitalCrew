import React, { useState, useEffect, useContext } from "react";
import {
  TweetContainer,
  Avatar,
  TweetContent,
  UserInfo,
  OptionsButton,
  OptionsMenu,
  StyledLink,
} from "./styles";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit as firestoreLimit,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Posts } from "./Post";
import { UserContext } from "../../auth/Contexts/UserContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Tweet = ({ userId, loggedInUserId, limit = null, showAll = false }) => {
  const [posts, setPosts] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(null);

  const getPosts = () => {
    const postsRef = collection(db, "posts");
    let q;

    if (showAll) {
      q = query(postsRef, orderBy("timestamp", "desc"));
    } else if (userId === loggedInUserId) {
      q = query(
        postsRef,
        where("userUid", "==", loggedInUserId),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit || 10)
      );
    } else {
      q = query(
        postsRef,
        where("userUid", "==", userId),
        orderBy("timestamp", "desc"),
        firestoreLimit(limit || 10)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(docs);
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
  }, [userId, loggedInUserId, limit, showAll]);

  useEffect(() => {
    posts.forEach((post) => {
      fetchProfileData(post.userUid);
    });
  }, [posts]);

  const handleDelete = async (id, postUid) => {
    if (user?.uid !== postUid) {
      alert("No puedes eliminar el post de otro usuario.");
      return;
    }

    try {
      await deleteDoc(doc(db, "posts", id));
      console.log(`Post with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const toggleMenu = (id) => {
    setShowMenu(showMenu === id ? null : id);
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
                {userProfiles[post.userUid]?.displayName || "Usuario"}
              </StyledLink>{" "}
              <span>@{userProfiles[post.userUid]?.userName || post.username}</span>
              {post.verified && <VerifiedUserIcon className="post_icon" />}
            </UserInfo>
            <OptionsButton onClick={() => toggleMenu(post.id)}>
              <MoreHorizIcon />
            </OptionsButton>
            {showMenu === post.id && (
              <OptionsMenu>
                <button onClick={() => handleDelete(post.id, post.userUid)}>Eliminar</button>
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
    </div>
  );
};
