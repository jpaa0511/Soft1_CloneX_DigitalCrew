import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: black !important;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

export const HeaderModal = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleRegister = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: white; /* Cambiado a blanco */
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Form = styled.form`
  padding: 20px;
`;

export const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #000000;
  margin-bottom: 60px;
`;

export const BannerImage = styled.div`
  width: 100%;
  height: 150px;
  background: ${(props) => (props.$url ? `url(${props.$url})` : "#000")};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const ProfileImageContainer = styled.div`
  position: absolute;
  left: 20px;
  bottom: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  background: ${(props) => (props.$url ? `url(${props.$url})` : "#ccc")};
  background-size: cover;
  background-position: center;
`;

export const ImageUploadOverlay = styled.label`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  input {
    display: none;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: white;
  }

  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
      border-color: #1da1f2;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const SaveButton = styled.button`
  background: #1da1f2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
  float: right;

  &:hover {
    background: #1a91da;
  }
`;
