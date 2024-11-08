import { Overlay, ContainerModal } from "./ModalStyle";

export const RegisterModal = ({ children }) => {
  return (
    <>
      <Overlay>
        <ContainerModal>{children}</ContainerModal>
      </Overlay>
    </>
  );
};
