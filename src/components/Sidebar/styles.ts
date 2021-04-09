import styled from 'styled-components';

export const SideDiv = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    padding: 32px 16px;
    transition: transform 0.3s ease-out;
    background: rgba( 255, 255, 255, 0.50 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2.0px );
    -webkit-backdrop-filter: blur( 2.0px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    @media (min-width: 500px) {
        display: none;
    }

    ul {
        display: block;
    }

    li {
        margin: 20px 0;
    }

`;
