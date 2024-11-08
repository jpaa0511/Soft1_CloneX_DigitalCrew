import { Overlay, ContainerModal } from "./ModalStyle";

export const ProfileModal = ({ children }) => {
  return (
    <>
      <Overlay>
        <ContainerModal>{children}</ContainerModal>
      </Overlay>
    </>
  );
};
