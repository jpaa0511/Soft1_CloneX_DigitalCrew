import React, { useState, useEffect, useContext } from "react";
import {
  TweetContainer,
  Avatar,
  TweetContent,
  UserInfo,
  OptionsButton,
  OptionsMenu,
} from "./styles";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Posts } from "./Post";
import { UserContext } from "../../auth/Contexts/UserContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const Tweet = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(null);

  const getPost = () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(docs);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getPost();
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      console.log(`Post with id ${id} deleted`);
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const toggleMenu = (id) => {
    if (showMenu === id) {
      setShowMenu(null);
    } else {
      setShowMenu(id);
    }
  };

  return (
    <div>
      {posts.map((post) => (
        <TweetContainer key={post.id}>
          <Avatar src={user?.photoURL} alt="User Avatar" />
          <TweetContent>
            <UserInfo>
              <strong>{user?.displayName}</strong>{" "}
              <span>@{post.username}</span>
              {post.verified && <VerifiedUserIcon className="post_icon" />}
            </UserInfo>
            <OptionsButton onClick={() => toggleMenu(post.id)}>
              <MoreHorizIcon />
            </OptionsButton>
            {showMenu === post.id && (
              <OptionsMenu>
                <button onClick={() => handleDelete(post.id)}>Eliminar</button>
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
