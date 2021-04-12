import { lighten } from 'polished';
import styled from 'styled-components';


export const Ul = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    a {
        margin-left: 57px;
        text-decoration: none;
        color: #707070;
        font-size: 20px;
        font-weight: bold;
        font-style: italic;

        &:hover{
            color: ${lighten(0.2, '#707070')}
        }
    
    }
`;


