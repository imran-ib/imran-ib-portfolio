import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-Regular.ttf') ;
    font-weight: normal;
    font-style: normal;
  }
@font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-Bold.ttf') ;
    font-weight: bold;
    font-style: normal;
  }
@font-face {
    font-family: 'Montserrat';
    src: url('/static/fonts/Montserrat-Light.ttf') ;
    font-weight: lighter;
    font-style: normal;
  }
  body{
    font-family: 'Montserrat', sans-serif;
    background-color: #ecedee; 
    height: 100vh;
    width: 100vw;
    background-size: cover;
  }
  .p-top {
      padding-top: 150px;
  }
  .p {
      padding: 30px;
  }
  .color-white{
  color: #ffffff;
  }
  .clickable {
    cursor: pointer;
  }
`;

export default GlobalStyle;
