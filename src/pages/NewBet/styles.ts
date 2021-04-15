import styled from 'styled-components';


export const Container = styled.div`
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const SectionGame = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;

    >strong {
        font-size: 17px;
        color: #868686;
        margin-top: 33px;
        margin-bottom: 15px;
        font-style: italic;
        font-weight: bold;
    }

    >span {
        margin-top: 28px;
        font-size: 17px;
        font-style: italic;
        font-weight: bold;
        color: #868686;
    }
`;

export const Title = styled.h1`
    margin-top: 50px;
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

export const ButtonGamesDiv = styled.div`
    display: flex;
    align-items: center;

    button {
        margin: 0 25px 0 0;
    }
`;

export const GameDescription = styled.div`
    font-style: italic;
    max-width: 648px;
    font-size: 17px;
    color: #868686;
    margin-bottom: 20px;
`;

export const DivNumbers = styled.div`
    width: 700px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const ButtonsDiv = styled.div`
    display: flex;
    margin-top: 30px;
`;

export const ButtonsGenerate = styled.button`
    width: 164px;
    height: 52px;
    color: #27C383;
    font-size: 15px;
    padding: 16px;
    border: 1px solid #27C383;
    background: transparent;
    border-radius: 10px;
    margin-right: 25px ;
    font-weight: bold;
    margin-bottom: 80px;
`;


export const ButtonAddCart = styled.button`
    width: 209px;
    height: 52px;
    color: #fff;
    font-size: 15px;
    padding: 16px;
    border: 1px solid #27C383;
    background: #27C383;
    border-radius: 10px;
    margin-left: 59px ;
    font-weight: bold;
`;

export const SectionCart = styled.section`
    margin-top: 41px;
    position: relative;
    width: 317px;
    background-color: #FFFFFF;
    border: 1px solid #E2E2E2;
    border-radius: 10px;
`;

export const CartTittle = styled.h1`
    color: #707070;
    font-size:28px;
    font-weight: bold;
    margin: 32px 19px;
`;

export const TotalDiv = styled.div`
    display: flex;
    font-size: 28px;
    margin: 19px;
    color: #707070;
`;

export const FinalText = styled.p`
    margin-left: 10px;
    font-size: 24px;
    font-weight: 100;
`;

export const FinalButton = styled.button`
    width: 100%;
    height: 96px;
    border: none;
    border-radius: 10px;
    color: #27C383;
    font-size: 32px;
    font-weight: bold;
`;
