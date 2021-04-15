import styled,{css} from 'styled-components';
interface NumberProps {
    color? : string;
}

export const Container = styled.button<NumberProps>`
    background-color : #ADC0C4;
    border:none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: #ADC0C4;
    border-radius: 50%;
    margin: 0 12px  20px 0;
    color: #fff;
    font-size: 24px;
    font-weight: bold;

    ${props => props.color && 
        css `
            background-color: ${props.color};
        `
    }

`;
