import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.button`
    color: #B5C401;
    border:none;
    background: transparent;
    font-size: 30px;
    padding: 22px 80px 33px 80px;
    font-style: italic;
    font-weight: bold;

    &:hover{
        color: ${shade(0.1, '#B5C401')}
    }
`;