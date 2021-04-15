import React from 'react';

import { Container } from './styles';
interface NumberProps {
    valueNumber: Number;
}

const Numbers: React.FC<NumberProps> = ({ valueNumber, children }) => {
    return (
        <Container>
            {valueNumber}
        </Container>
    )
}

export default Numbers;