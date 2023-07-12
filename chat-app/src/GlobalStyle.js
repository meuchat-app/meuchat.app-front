import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    }

    html{
        font-size: 62.5%; // A cada 1rem será considerado 10px
    }

    #root{
        margin: 0 auto;
    }

    body{
        font-size: 1.6rem;
        font-family: 'Poppins', sans-serif;
        background: #313238 0% 0% no-repeat padding-box;
        opacity: 1;
        width: 100%;
        height: 100vh;
        -webkit-font-smoothing: antialiased;
    }


`;

export default GlobalStyle;
