import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  
}

body{
  background: #F7F7F7;
  color: #707070;
  -webkit-font-smooth: antialiased;
}

body,input,button{
  font-family: Helvetica, serif;
  font-size: 16px;
  &:focus{
    display: hidden;
  }
}

h1, h2 , h3, h4, h5, h6, strong{
  font-weight: 500;
  font-style: italic;
}

button{
  cursor: pointer;
}

`;
