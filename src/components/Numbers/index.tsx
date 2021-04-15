import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type NumberProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    valueNumber: Number;
    color?: string;
}

const Numbers: React.FC<NumberProps> = ({ valueNumber, color,  ...rest}) => {
    return (
        <Container  type="button" {...rest} color={color}>
            {valueNumber}
        </Container>
    )
}

export default Numbers;