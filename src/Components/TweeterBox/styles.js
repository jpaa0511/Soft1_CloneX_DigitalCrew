import styled, { css } from "styled-components";

export const Container = styled.div`
  flex: 0.6;
  max-width: 600px;
  border-right: 1px solid #e6ecf0;
  overflow-y: scroll;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  z-index: 100;
  border-bottom: 1px solid #e6ecf0;
  padding: 4px 20px;

  h2 {
    font-size: 20px;
    font-weight: 800;
    color: #14171a;
  }
`;

/*BoxTwitter */
export const TwitterBox = styled.div`
  padding: 5px 15px;
  border-bottom: 1px solid #ddd;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border-radius: fill;
`;

export const Div = styled.div`
  display: flex;
  width: 100%;
  position: relative; 
  align-items: flex-start;
  justify-content: space-between; /* Asegura que los elementos se distribuyan correctamente */

  .columbus {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 10px;
    
    > input {
      margin-top: 8px;
      width: 100%;
      border: none;
      outline: 0;
      font-size: 18px;
      line-height: 24px;
      background: transparent;
      color: #ffffff;
      
      &::placeholder {
        color: #8899a6;
      }
    }
  }
`;

export const DivBottom = styled.div`
  display: flex;
  justify-content: flex-start; /* Los íconos quedan a la izquierda */
  align-items: center;
  margin-top: 10px;
  width: 100%; /* Ocupar todo el ancho disponible */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  }
`;

export const DivURL = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 10px;

  > input {
    padding: 10px;
    font-size: 14px;
    border: none;
    margin-left: 25px;
    background-color: transparent;
    caret-color: #ffffff;
  }

  > button {
    background-color: var(--twittercolor);
    border: none;
    color: white;
    font-weight: bold;
    padding: 5px 20px;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: #1a91da;
    }
  }
`;

export const DivIcon = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  > .MuiSvgIcon-root {
    fill: var(--twittercolor);
    margin-left: 1rem;
    border: 2px solid var(--twittercolor)
    height: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 22px;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: colum;
  width: 100%;
`;

export const File = styled.input.attrs({ type: "file" })`
  position: absolute;
  z-index: 10;
  opacity: 0;
  cursor: pointer;

  &.primary {
    top: 0;
    left: -51px;
  }

  &.secondary {
    top: 25px;
    left: 16px;
    width: 30px;
  }

  &.tertiary {
    top: 25px;
    left: 56px;
    width: 30px;
  }
`;

export const Alert = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50; /* Verde para éxito */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")}; /* Ocultar cuando show es false */
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;
