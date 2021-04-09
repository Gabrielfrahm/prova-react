import styled from 'styled-components';
import { lighten } from 'polished';


export const Li = styled.li`
    list-style: none;
    margin-left: 57px;

    a {
        text-decoration: none;
        color: #707070;
        font-size: 20px;
        font-weight: bold;
        font-style: italic;

        &:hover{
            color: ${lighten(0.2, '#707070')}
        }
    }
`
