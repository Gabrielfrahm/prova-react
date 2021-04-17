import styled from 'styled-components';

interface BetProps {
    color: string;
}


export const Container = styled.div`
    /* display: flex;
    flex-direction: column; */
    margin-bottom: 30px;    
`;

export const Content = styled.div<BetProps>`
    display: flex;
    flex-direction: column;
    border-left: 4px solid ${props => props.color};
    padding-left: 15px;
    border-radius: 6px;

`;

export const Numbers = styled.p`
    padding: 7px;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    color: #868686;
    
    word-wrap: break-word;
    @media (max-width: 600px){
        width: 200px;
        font-size: 16px;
      
    } 
`;

export const TextData = styled.p`
    padding: 7px;
    font-size: 17px;
    color: #868686;
    font-style:italic;
    @media (max-width: 600px){
       
       font-size: 16px;
    } 
`;

export const BetType = styled.p<BetProps>`
    padding: 7px;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    color: ${props => props.color};
    @media (max-width: 600px){
       
       font-size: 16px;
    } 
`;