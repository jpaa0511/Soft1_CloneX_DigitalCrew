import React, { useState } from "react";
import { Camera } from "lucide-react";
import {
  ModalOverlay,
  ModalContent,
  HeaderModal,
  TitleRegister,
  CloseButton,
  Form,
  ImageSection,
  BannerImage,
  ProfileImageContainer,
  ImageUploadOverlay,
  InputGroup,
  SaveButton,
} from "./stylesModal";
import { uploadFile } from "../../Connecting_to_Firebase/services/UploadService";
import { db } from "../../Connecting_to_Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const ProfileModal = ({
  isOpen,
  onClose,
  user,
  errorMessage,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    userName: user?.username || "",
    bio: user?.bio || "",
    profilePhoto: null,
    bannerPhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.debug(`Campo cambiado: ${name} - Nuevo valor: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      console.debug(`Archivo seleccionado para ${type}:`, file);
      try {
        const downloadURL = await uploadFile(file, `perfil/${type}`);
        console.debug(`URL de descarga para ${type}:`, downloadURL);
        setFormData((prev) => ({
          ...prev,
          [type]: downloadURL,
        }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn(`No se seleccionó ningún archivo para ${type}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.debug("Datos del formulario antes de guardar:", formData);
    try {
      await setDoc(doc(db, "perfil", user.uid), {
        displayName: formData.name,
        userName: formData.userName,
        bio: formData.bio,
        photoURL: formData.profilePhoto,
        bannerURL: formData.bannerPhoto,
      });
      console.log("Perfil actualizado:", formData);
      setFormData({
        name: "",
        userName: "",
        bio: "",
        profilePhoto: null,
        bannerPhoto: null,
      });

      onProfileUpdated(formData);

      onClose();
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalContent>
        <HeaderModal>
          <TitleRegister>Edit Profile</TitleRegister>
          <CloseButton onClick={onClose}>×</CloseButton>
        </HeaderModal>

        <Form onSubmit={handleSubmit}>
          <ImageSection>
            {isLoading ? (
              <p>Cargando imagen...</p>
            ) : (
              <>
                <BannerImage $url={formData.bannerPhoto || user?.bannerURL}>
                  <ImageUploadOverlay>
                    <Camera color="white" size={24} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange("bannerPhoto", e)}
                    />
                  </ImageUploadOverlay>
                </BannerImage>

                <ProfileImageContainer
                  $url={formData.profilePhoto || user?.photoURL}
                >
                  <ImageUploadOverlay>
                    <Camera color="white" size={24} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange("profilePhoto", e)}
                    />
                  </ImageUploadOverlay>
                </ProfileImageContainer>
              </>
            )}
          </ImageSection>

          <InputGroup>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </InputGroup>

          <InputGroup>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Enter your bio"
              rows="4"
            />
          </InputGroup>

          <SaveButton type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </SaveButton>
        </Form>

        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px", padding: "0 20px" }}>
            {errorMessage}
          </p>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileModal;
