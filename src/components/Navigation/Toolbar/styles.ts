import styled from 'styled-components';

export const Header = styled.header`
    height: 75px;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    border-bottom: 2px solid #EBEBEB;
`;

export const Nav = styled.nav`
    height: 100%;
    @media (max-width: 499px){
        display: none;
    }
`;