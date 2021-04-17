import React from 'react';
import { Container, Content, Numbers, TextData, BetType } from './styles';

interface BetProps {
    numbers: string;
    date: string;
    betType: string;
    color: string;
    price : string;
}

const Bet: React.FC<BetProps> = ({ numbers, date, betType, color, price }) => {
    return (
        <Container>
            <Content color={color} >
           
                <Numbers>{numbers}</Numbers>
                <TextData>{date} - ({price})</TextData>
                <BetType color={color}>{betType}</BetType>
            </Content>
        </Container>
    )
}

export default Bet;