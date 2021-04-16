import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { removeProductToCart } from '../../store/modules/itemCart/action';
import { Item } from '../../store/modules/itemCart/type';
import { formatValue } from '../../utils/formatValue';
import {
    Container,
    GamesButtons,
    WrapperGames,
    SecondDiv,
    TypeGame,
    ThirdDiv
} from './styles';

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//     color: string;
//     type: string;
//     price: number;
//     numbers: string;
//     item: Item;
// }

interface ItemProps {
    color: string;
    type: string;
    price: number;
    numbers: string;
    item: Item;
}

const ItemCart: React.FC<ItemProps> = ({ color, type, price, numbers, item }) => {
    const dispatch = useDispatch();

    return (
        <Container>
            <GamesButtons onClick={() => dispatch(removeProductToCart(item))} ><FiTrash2 color={'#888888'} /> </GamesButtons>
            <WrapperGames>
                <SecondDiv color={color}>
                    <p>{numbers}</p>
                    <ThirdDiv>
                        <TypeGame color={color}>{type}</TypeGame>
                        <p>{formatValue(price)} </p>
                    </ThirdDiv>
                </SecondDiv>
            </WrapperGames>
        </Container>
    );
}

export default ItemCart;