import { lighten } from 'polished';
import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    a {
        margin-left: 25px;
        text-decoration: none;
        color: #707070;
        font-size: 20px;
        font-weight: bold;
        font-style: italic;

        &:hover{
            color: ${lighten(0.2, '#707070')}
        }
    }

    @media (max-width: 500px){
        
    }
`;

export const Span = styled.span`
    font-size: 44px;
    font-weight: bold;
    font-style: italic;
    margin-top: 25px;
    text-align: center;
`;

export const Hr = styled.hr` 
    border: 3px solid #B5C401;
    border-radius: 6px;
    width: 107px;
`;