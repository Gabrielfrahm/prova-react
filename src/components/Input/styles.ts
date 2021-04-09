import styled, {css} from 'styled-components';

interface InputProps {
    isError: boolean;
}


export const Container = styled.div<InputProps>`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    

    ${props =>
    props.isError &&
    css`
      border-bottom: 1px solid #c53030;
      border-radius: 5px 5px 0 0;
    `}

    input {
        width: 100%;
        background: transparent;
        border: none;
        padding: 16px;
        border-radius: none;
        font-size: 16px;
        font-style: italic;
        border-bottom: 2px solid #EBEBEB;
        &::-webkit-input-placeholder {
            font-size: 15px;
            color: #9D9D9D;
            font-style: italic;
            font-weight: bold;
        }
    }
`;

export const Error = styled.span`
    color: #c53030;
    font-weight: bold;
`;