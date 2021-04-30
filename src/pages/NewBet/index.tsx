import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import ButtonGames from '../../components/ButtonGames';

import Numbers from '../../components/Numbers';
import { GamesProps } from '../../store/modules/games/types';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';

import ItemCart from '../../components/ItemCart';
import { addProductToCartRequest, addGamesRequest } from '../../store/modules/itemCart/action';
import { Item } from '../../store/modules/itemCart/type';
import { formatValue } from '../../utils/formatValue';
import { compareNumbers } from '../../utils/formSortArray';
import { useToast } from '../../hooks/Toast';

import {
    Container,
    Content,
    SectionGame,
    Title,
    ButtonGamesDiv,
    GameDescription,
    DivNumbers,
    SectionCart,
    CartTittle,
    WrapperCartItem,
    TotalDiv,
    FinalText,
    FinalButton,
    ButtonsDiv,
    ButtonsGenerate,
    ButtonAddCart,
    FeedbackCart,
} from './styles';
import { useHistory } from 'react-router';
import api from '../../server/api';
import { useAuth } from '../../hooks/Auth';
import Backdrop from '../../components/Backdrop';
import { Spin } from '../../components/Spinner/styles';
import { loadGames } from '../../store/modules/games/action';

export interface ItemCartProps {
    user_id: string;
    game_id: number;
    price: number;
    numbers: string;
}

const NewBet: React.FC = () => {

    const errorState = useSelector<IState>(state => {//error of api state
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {//array bets
        return state.games.games;
    });

    const initialGame = useSelector<IState, GamesProps>(state => {//first bet of array bets
        return state.games.games[0];
    });

    const itensInCart = useSelector<IState, Item[]>(state => {//state item in cart
        return state.itemCart.items;
    })

    const cartPrice = useSelector<IState>(state => {//state cart price
        return state.itemCart.price;
    })

    const dispatch = useDispatch();

    const { addToast } = useToast();
    const { user } = useAuth();

    const history = useHistory();

    const [showSide, setShowSide] = useState(true);

    const [active, setActive] = useState(false); //state of active button 

    const [gameSelected, setGameSelected] = useState('');//state of game selected to user

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);//initial game and game selected

    const colorGame = infoGame.map(game => { return game.color });//color game selected

    const [numbers, setNumbers] = useState<number[]>([]);//get numbers of range bet

    const [numbersUser, setNumbersUser] = useState<number[]>([]);

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);


    useEffect(() => {//initial bet
        setInfoGame([initialGame]);
        setGameSelected(initialGame?.type)
        setActive(true);
    }, [initialGame]);

    useEffect(() => {//after user selected game set information on array 
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
    }, [betsState, gameSelected]);

    const handleGenerateNumbers = useCallback((range: number) => {//generate numbers of range bets
        const numberArr = [];
        for (let i = 1; i <= range; i++) {
            numberArr.push(i);
        }
        return setNumbers(numberArr);
    }, []);

    useEffect(() => {//run function generate numbers of game
        handleGenerateNumbers(Number(infoGame.map(game => game?.range)));
    }, [infoGame, handleGenerateNumbers]);

    const handleClickedInButtonGame = useCallback((gameName: string) => {//get game selected and active toggle color button
        setGameSelected(gameName);
        setNumbersUser([]);
        setActive(true);
    }, []);

    const handleGenerateBet = useCallback(() => {//generate numbers of bets
        let bet: number[] = [];
        const range = infoGame.map(game => { return game.range });
        const limit = infoGame.map(game => { return game.maxNumber });
        let arrLength = Number(limit) - numbersUser.length;
        if (numbersUser.length > 0) {
            for (let i = 1; i <= arrLength; i++) {
                let number = Math.ceil(Math.random() * Number(range));
                let check = bet.some(item => {
                    return item === number;
                });
                let check2 = numbersUser.some(item => {
                    return item === number;
                })

                if (check || check2) {
                    i--;
                } else {
                    bet.push(number);
                }
            }
            bet = bet.concat(numbersUser);
            setNumbersUser(bet);
            return bet;
        }

        for (let i = 1; i <= Number(limit); i++) {
            let number = Math.ceil(Math.random() * Number(range));
            let check = bet.some(item => {
                return item === number;
            });

            let check2 = numbersUser.some(item => {
                return item === number;
            })

            if (check || check2) {
                i--;
            } else {
                bet.push(number);
            }
        }

        setNumbersUser(bet);
        return bet;
    }, [numbersUser, infoGame]);


    const handleUserChoseNumber = useCallback((e) => {//user selected number 
        const limit = infoGame.map(game => game.maxNumber);
        const check = numbersUser.find(numb => numb === Number(e.target.value));
        // const findIndex = numbersUser.findIndex(numb => numb === e.target.value);
        if (numbersUser.length === Number(limit)) {
            addToast({
                type: 'error',
                title: 'atingi-o o limite de números para esse jogo ',
            })
        }
        if (numbersUser.length < Number(limit)) {
            if (check) {
                addToast({
                    type: 'error',
                    title: 'voce ja tem esse numero',
                    description: e.target.value,
                })

                // numbersUser.splice(findIndex, 1);
            } else {
                setNumbersUser([...numbersUser, Number(e.target.value)]);
            }
        }
    }, [numbersUser, infoGame, addToast]);

    const handleClearGame = useCallback(() => {//clear the game 
        if (numbersUser.length !== 0) {
            setNumbersUser([]);
        } else {
            addToast({
                type: 'info',
                title: 'Antes de limpar selecione escolha um numero'
            })
        }
    }, [addToast, numbersUser]);

    const handleAddGameCart = useCallback(() => {//add item  in state cart
        if (Number(infoGame.map(game => game.maxNumber)) === numbersUser.length) {
            dispatch(addProductToCartRequest({
                id: Number(infoGame.map(game => game.id)),
                color: String(colorGame),
                // numbers: numbersUser.sort(compareNumbers).join(','),
                numbers: String(numbersUser.sort(compareNumbers).map(numb => {
                    return numb < 10 ? '0' + numb : numb;
                })),
                type: String(infoGame.map(game => game.type)),
                price: Number(infoGame.map(game => game.price)),
                created_at: new Date(),
            }))
            setNumbersUser([]);
            addToast({
                type: 'success',
                title: 'Adicionado no carrinho',
                description: 'Você adicionou um jogo ao carrinho',
            })
        } else {
            addToast({
                type: 'info',
                title: 'antes de adicionar no carrinho selecione todos os números',
            })
        }
    }, [dispatch, colorGame, infoGame, numbersUser, addToast]);

    const handleSaveGame = useCallback(async () => {

        if (Number(cartPrice) >= 30) {
            dispatch(addGamesRequest(itensInCart));
            const itemInCart: ItemCartProps[] = [];
            itensInCart.map(item => {
                return itemInCart.push({
                    user_id: user.id,
                    game_id: item.id,
                    numbers: item.numbers,
                    price: item.price
                })
            })
            await api.post(`/game/bets`, { itemInCart });
            history.goBack()
            addToast({
                type: 'success',
                title: 'jogos salvos',
            })
        }
        if (Number(cartPrice) < 30) {
            addToast({
                type: 'error',
                title: 'faça jogos, ate chegar no valor de R$ 30,00',
            })
        }

    }, [dispatch, itensInCart, cartPrice, addToast, history, user])


    const handleSideDrawerClosed = useCallback(() => {
        setShowSide(true);
    }, []);
    return (
        <>
            <Menu />
            <Container>
                <Content>
                    <SectionGame>
                        <Title><strong>NEW BET</strong> FOR {gameSelected?.toUpperCase()}</Title>
                        <strong>Choose a game</strong>
                        <ButtonGamesDiv>
                            {errorState
                                ?
                                <Backdrop show={showSide} clicked={handleSideDrawerClosed}>
                                    <Spin />
                                    <p style={{ color: 'red', textAlign: 'center' }}>Ops algo deu errado contante o administrador</p>
                                </Backdrop>
                                : betsState.map(game => (
                                    <ButtonGames
                                        onClick={() => handleClickedInButtonGame(game.type)}
                                        isActive={gameSelected === game.type ? active : false}
                                        type='button'
                                        key={game.type}
                                        color={game.color}
                                    >
                                        {game.type}
                                    </ButtonGames>
                                ))
                            }
                        </ButtonGamesDiv>
                        <span>Fill your bet</span>
                        {infoGame.map(game => (
                            <GameDescription key={game?.type + 1}>
                                <p>{game?.description}</p>
                            </GameDescription>
                        ))}
                        <DivNumbers >
                            {numbers.map(num => (
                                <Numbers
                                    onClick={handleUserChoseNumber}
                                    value={num}
                                    color={numbersUser.some(item => item === num) ? String(colorGame) : ''}
                                    key={num.valueOf()}
                                    valueNumber={num > 9 ? String(num) : '0' + num} />
                            ))}
                        </DivNumbers>
                        <ButtonsDiv>
                            <ButtonsGenerate onClick={handleGenerateBet}>Complete game</ButtonsGenerate>
                            <ButtonsGenerate onClick={handleClearGame}>Clear game</ButtonsGenerate>
                            <ButtonAddCart onClick={handleAddGameCart}><FiShoppingCart size={25} style={{ verticalAlign: 'middle', marginRight: 10 }} /> Add to cart</ButtonAddCart>
                        </ButtonsDiv>
                    </SectionGame>
                    <SectionCart>
                        <CartTittle>CART</CartTittle>
                        <WrapperCartItem>
                            {cartPrice !== 0
                                ?
                                itensInCart.map(item => (
                                    <ItemCart key={item.numbers}
                                        item={item}
                                        color={item.color}
                                        numbers={item.numbers}
                                        type={item.type}
                                        price={item.price}
                                    />
                                ))
                                : <FeedbackCart>Empty 😢 </FeedbackCart>
                            }
                        </WrapperCartItem>
                        <TotalDiv>
                            <strong>CART</strong>
                            <FinalText>Total:{formatValue(Number(cartPrice))}</FinalText>
                        </TotalDiv>
                        <FinalButton onClick={handleSaveGame} >Save <FiArrowRight style={{ verticalAlign: 'middle' }} /></FinalButton>
                    </SectionCart>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default NewBet;