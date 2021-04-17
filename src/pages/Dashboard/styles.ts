import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    height: 85vh;
    width: 100vw;
    display: flex;
    overflow-x: hidden;
    align-items: stretch; 
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    font-style: italic;

    @media (max-width: 1150px){
        font-size: 18px;
    }

    @media (max-width: 600px){
        margin-top: 80px;
    }

`;

export const Content = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    padding: 80px;
    height: 80px;
    max-width: 1300px;
    
    @media (max-width: 1150px){
        /* padding: 0px; */
    }

    @media (max-width: 600px){
        flex-direction: column;
        margin-top: 35px;
    }

    span {
        font-size: 17px;
        font-style: italic;
        padding-left: 45px;
        color: #868686;
        @media (max-width: 1150px){
            padding-left: 20px;
        }   
        @media (max-width: 600px){
            padding: 10px;
        }   
    }
`;

export const Button = styled.button`
    color: #B5C401;
    border:none;
    background: transparent;
    font-size: 24px;
    padding-left: 150px;
    font-style: italic;
    font-weight: bold;

    &:hover{
        color: ${shade(0.1, '#B5C401')}
    }

    @media (max-width: 1150px){
        padding-left: 8px;
        font-size: 18px;
    }

    @media (max-width: 600px){
        padding: 8px;
    } 
`;

export const ShowBet = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0  0 15px 150px ;
    height: 80px;
    max-width: 1300px;

    @media (max-width: 800px){
        padding: 80px;
    } 

    @media (max-width: 600px){
        align-items: center;

        margin-top: 70px;
        padding: 80px;
    } 
`;
