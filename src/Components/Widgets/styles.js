import styled from "styled-components";

export const WidgetContainer = styled.div`
  padding: 10px;
  background-color: #000; /* Fondo oscuro para widget */
  border-radius: 15px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12);
  color: #ffffff;
  margin-bottom: 20px; /* Espacio inferior para separar widgets */
`;

export const SearchBar = styled.div`
  padding: 10px 15px;
  background-color: #202327; /* Fondo oscuro para la barra de búsqueda */
  border-radius: 50px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .searchIcon {
    color: #8899a6; /* Color del ícono en modo oscuro */
    margin-right: 10px;
  }

  input {
    border: none;
    background: none;
    outline: none;
    font-size: 14px;
    width: 100%;
    color: #ffffff;

    &::placeholder {
      color: #8899a6; /* Color del placeholder */
    }
  }
`;

export const ContentSection = styled.div`
  h2 {
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 15px;
  }
`;

export const TrendsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TrendItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #2f3336;

  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
    cursor: pointer;
  }

  strong {
    font-weight: bold;
    color: #1da1f2; /* Color del texto de la tendencia */
    font-size: 16px;
  }

  span {
    color: #8899a6; /* Color del número de tweets */
    font-size: 14px;
    margin-top: 3px;
  }
`;
