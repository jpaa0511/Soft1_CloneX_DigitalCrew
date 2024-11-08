import React, { useState, useEffect } from "react";
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
import { doc, getDoc, setDoc } from "firebase/firestore";

export const ProfileModal = ({
  isOpen,
  onClose,
  user,
  errorMessage,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    bio: "",
    profilePhoto: null,
    bannerPhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isOpen) {
        try {
          const profileDoc = doc(db, "perfil", user.uid);
          const profileSnapshot = await getDoc(profileDoc);

          if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data();
            setFormData({
              name: profileData.displayName || "",
              userName: profileData.userName || "",
              bio: profileData.bio || "",
              profilePhoto: profileData.photoURL || null,
              bannerPhoto: profileData.bannerURL || null,
            });
          } else {
            setFormData({
              name: "",
              userName: "",
              bio: "",
              profilePhoto: null,
              bannerPhoto: null,
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfileData();
  }, [isOpen, user.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const downloadURL = await uploadFile(file, `perfil/${type}`);
        setFormData((prev) => ({
          ...prev,
          [type]: downloadURL,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "perfil", user.uid),
        {
          displayName: formData.name,
          userName: formData.userName,
          bio: formData.bio,
          photoURL: formData.profilePhoto,
          bannerURL: formData.bannerPhoto,
          followers: [],
          following: [],
        },
        { merge: true }
      );

      if (onProfileUpdated) {
        onProfileUpdated(formData);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
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
              <p>Uploading image...</p>
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
            {isLoading ? "Saving..." : "Save"}
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
