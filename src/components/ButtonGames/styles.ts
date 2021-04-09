import styled, {css} from 'styled-components';

interface ButtonProps {
    color: string;
    isActive?: boolean;
}


export const Container = styled.button<ButtonProps>`
    width: 113px;
    height: 34px;
    border: 2px solid ${props => props.color};
    border-radius: 25px;
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    color: ${props => props.color};
    margin-left: 23px;

    &:hover{
        color: #fff;
        background-color: ${props => props.color};
    }

    ${props => props.isActive && 
        css `
            color: #fff;
            background-color: ${props.color};
        `
    }


    @media (max-width: 1150px){
        margin-left: 5px;
    }
    
    @media (max-width: 600px){
        margin-left: 0;
        padding: 5px;
        margin-bottom: 20px;
    }
`;