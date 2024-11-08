import { useState, useContext } from "react";
import { UserContext } from "../../auth/Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../Connecting_to_Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const useLogin = () => {
  const {
    logInUser,
    signUpUser,
    logInWithGoogle,
    logInWithFacebook,
    errorMessage,
    user,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    displayName: "",
    userName: "",
  });

  const [isOpenModalRegister, setOpenModalRegister] = useState(false);
  const [isOpenModalLogin, setOpenModalLogin] = useState(false);

  const { displayName, email, password, userName } = formState;

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await logInUser(email, password);
    if (isValidLogin) {
      navigate("/main", { replace: true });
    }
  };

  const onRegister = async (event) => {
    event.preventDefault();

    const signUpResult = await signUpUser(email, password, displayName);

    if (signUpResult.success) {
      const { uid } = signUpResult;

      await setDoc(doc(db, "perfil", uid), {
        bannerURL: "",
        Bio: "",
        displayName: displayName,
        followers: 0,
        following: 0,
        photoURL: "",
        userName: userName,
      });

      toggleModalRegister();

      navigate("/main", { replace: true });
    } else {
      console.error("Error al registrar usuario:", signUpResult.errorMessage);
    }
  };

  const toggleModalRegister = () => {
    setOpenModalRegister(!isOpenModalRegister);
  };

  const toggleModalLogin = () => {
    setOpenModalLogin(!isOpenModalLogin);
  };

  const onLoginWithGoogle = async (event) => {
    event.preventDefault();
    const isValidLogin = await logInWithGoogle();
    if (isValidLogin) {
      navigate("/main", { replace: true });
    }
  };

  const onLoginWithFacebook = async (event) => {
    event.preventDefault();
    const isValidLogin = await logInWithFacebook();
    if (isValidLogin) {
      navigate("/main", { replace: true });
    }
  };

  return {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    onLogin,
    onRegister,
    isOpenModalRegister,
    toggleModalRegister,
    isOpenModalLogin,
    toggleModalLogin,
    onLoginWithGoogle,
    onLoginWithFacebook,
    errorMessage,
  };
};
