import { useState, useEffect, useContext } from "react";
import {
  TwitterBox,
  Avatar,
  Div,
  Form,
  DivIcon,
  File,
  DivURL,
  Alert,
} from "./styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PollIcon from "@mui/icons-material/Poll";
import { Button } from "@mui/material";
import { uploadFile } from "../../Connecting_to_Firebase/services/UploadService";
import { db } from "../../Connecting_to_Firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { UserContext } from "../../auth/Contexts/UserContext";

export const TwitterBoxs = () => {
  const [tweeMsg, setTweeMsg] = useState("");
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tweetSuccess, setTweetSuccess] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "perfil", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.userName);
            setAvatar(userData.photoURL);
          } else {
            console.log("User profile not found");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const sendTweet = async (e) => {
    e.preventDefault();

    if (tweeMsg.length < 5 || tweeMsg.length > 280) {
      alert("Tweet must be between 5 and 280 characters.");
      return;
    }
    if (!userName || !avatar) {
      alert(
        "You need to update your profile to include a username and avatar before posting."
      );
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        userUid: user.uid,
        username: userName,
        verified: true,
        text: tweeMsg,
        timestamp: serverTimestamp(),
        avatar: avatar,
        imagePost: post,
      });

      setTweeMsg("");
      setPost("");
      setTweetSuccess(true);

      setTimeout(() => setTweetSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending tweet:", error);
    }
  };

  const handlePostUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const downloadURL = await uploadFile(file, "post");
        setPost(downloadURL);
        console.log("Post URL:", downloadURL);
      } catch (error) {
        console.error("Error uploading post:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextareaChange = (e) => {
    setTweeMsg(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <TwitterBox>
      {tweetSuccess && (
        <Alert show={tweetSuccess}>Tweet posted successfully!</Alert>
      )}
      <Form>
        <Div>
          <Avatar src={avatar} alt="Avatar" />
          <div className="columbus">
            <textarea
              placeholder="What is happening?!"
              value={tweeMsg}
              onChange={handleTextareaChange}
              rows="1"
              maxLength="280"
            />
          </div>
        </Div>
      </Form>
      <Div>
        <DivIcon>
          <File type="file" className="secondary" onChange={handlePostUpload} />
          <AddPhotoAlternateIcon />
          <GifIcon />
          <File type="file" className="tertiary" onChange={handlePostUpload} />
          <EmojiEmotionsIcon />
          <PollIcon />
        </DivIcon>
        <DivURL>
          <input
            type="text"
            placeholder="URL: IMG or GIF"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <Button onClick={sendTweet} type="submit">
            Post
          </Button>
        </DivURL>
      </Div>
    </TwitterBox>
  );
};
