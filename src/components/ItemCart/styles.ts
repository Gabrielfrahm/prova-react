import styled from 'styled-components';

interface GamesProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    margin-top: 35px;
`;

export const GamesButtons = styled.button`
    background-color: transparent;
    border: none;
    font-size: 24px;
    margin: 15px;
`;

export const WrapperGames = styled.div`
    width: 240px;
    word-wrap: break-word;
    font-size: 17px;
`;

export const SecondDiv = styled.div<GamesProps>`
    display: flex;
    flex-direction: column;
    border-left: 4px solid ${props => props.color};
    border-radius: 5px;
    font-size: 19px;
    color: #868686;

    >p {
        margin: 5px;
    }
`;

export const ThirdDiv = styled.div`
    display: flex;
    >p {
        margin: 5px;
        font-size:16px
    }
`;

export const TypeGame = styled.p<GamesProps>`
    color: ${props => props.color};
    font-weight: bold;
    margin: 5px;
    font-style: italic;
    font-size: 16px;
`;
