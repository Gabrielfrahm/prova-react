import styled from 'styled-components';

export const MenuDiv = styled.div`
    width: 50px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;

    @media (min-width: 500px) {
        display: none;
    }
`;

export const SubDiv = styled.div `
    width: 90%;
    height: 5px;
    background-color: #B5C401;
`;