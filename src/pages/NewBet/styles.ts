import styled from 'styled-components';


export const Container = styled.div`
    height: 85vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    padding: 80px;
    flex: 1;
`;

export const Title = styled.h1`
    font-size: 25px;
    font-style: italic;
    font-weight: lighter;

    strong {
        font-weight: bold;
    }

    @media (max-width: 1150px){
        font-size: 18px;
    }

    @media (max-width: 600px){
        margin-top: 80px;
    }
`;

export const SectionGame = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 77px 0 0 200px;
    max-width: 900px;

    span {
        margin-top: 33px;
        font-size: 17px;
        font-weight: bold;
        font-style: italic;
        color: #868686;
        margin-bottom: 20px;
    }

    
`;

export const ButtonGamesDiv = styled.div`
    display: flex;
    align-items: center;

    button {
        margin: 0 25px 0 0;
    }
`;

export const Cart = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
`;
