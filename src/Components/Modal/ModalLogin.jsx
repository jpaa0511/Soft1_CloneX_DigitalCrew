import { Overlay, ContainerModal } from "./ModalStyle";

export const LoginModal = ({ children }) => {
  return (
    <>
      <Overlay>
        <ContainerModal>{children}</ContainerModal>
      </Overlay>
    </>
  );
};
