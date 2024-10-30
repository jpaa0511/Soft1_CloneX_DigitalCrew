import { useState, useEffect, useContext } from "react";
import { TwitterBox, Avatar, Div, Form, DivIcon, File, DivURL } from "./styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PollIcon from "@mui/icons-material/Poll";
import { Button } from "@mui/material";
import { uploadFile } from "../../Connecting_to_Firebase/services/UploadService";
import { db } from "../../Connecting_to_Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import User from "../../Components/Img/user1.png";
import { UserContext } from "../../auth/Contexts/UserContext";

export const TwitterBoxs = () => {
  confirm;
  const [User, setUser] = useState("");
  const [tweeMsg, setTweeMsg] = useState("");
  const [avatar, setAvatar] = useState("");
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const sendTweet = async (e) => {
    e.preventDefault();
    if (User.length < 1) {
      alert("Debe escribir un nombre de usuario.");
    }
    if (tweeMsg.length < 5 || tweeMsg.length > 280) {
      alert("El tweet debe tener entre 5 y 300 caracteres.");
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        username: User,
        veridield: true,
        text: tweeMsg,
        timestamp: Date.now(),
        avatar: avatar,
        imagePost: post,
      });
      setAvatar("");
      setTweeMsg("");
      setUser("");
    } catch (error) {
      console.error("Error al enviar el tweet:", error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const downloadURL = await uploadFile(file, "avatar");
        setAvatar(downloadURL);
        localStorage.setItem("userAvatar", downloadURL);
      } catch (error) {
        console.error("Error al cambiar el avatar:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePostUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const downloadURL = await uploadFile(file, "post");
        setPost(downloadURL);
        console.log("URL del post:", downloadURL);
      } catch (error) {
        console.error("Error al subir el post:", error);
      } finally {
        setIsLoading(false);
      }
    }
    localStorage.removeItem("userAvatar");
  };

  return (
    <TwitterBox>
      <Form>
        <Div>
          <Avatar src={user?.photoURL} alt="" />
          <File
            type="file"
            className="primary"
            onChange={handleAvatarChange}
            accept="image/*"
          />
          <div className="columbus">
            <input
              type="text"
              placeholder="¿Qué está pasando?"
              value={tweeMsg}
              onChange={(e) => {
                setTweeMsg(e.target.value);
                console.log("Mensaje del tweet:", e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Usuario"
              value={User}
              onChange={(e) => setUser(e.target.value)}
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
            placeholder="URL: Opcional de imeg"
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
