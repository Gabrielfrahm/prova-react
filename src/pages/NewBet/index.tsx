import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import ButtonGames from '../../components/ButtonGames';

import Numbers from '../../components/Numbers';
import { GamesProps } from '../../store/modules/games/types';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
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
    TotalDiv,
    FinalText,
    FinalButton,
    ButtonsDiv,
    ButtonsGenerate,
    ButtonAddCart
} from './styles';

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

    const [active, setActive] = useState(false); //state of active button 

    const [gameSelected, setGameSelected] = useState('');//state of game selected to user

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);//initial game and game selected
    const colorGame = infoGame.map(game => { return game.color });


    const [numbers, setNumbers] = useState<number[]>([]);//get numbers of range bet

    const [numbersUser, setNumbersUser] = useState<number[]>([])

    const handleGenerateNumbers = useCallback((range: number) => {//generate numbers of range bets
        const numberArr = [];
        for (let i = 1; i <= range; i++) {
            numberArr.push(i);
        }
        return setNumbers(numberArr);
    }, [])

    const handleClickedInButtonGame = useCallback((gameName: string) => {//get game selected and active toggle color button
        setGameSelected(gameName);
        setNumbersUser([]);
        setActive(true);
    }, []);

    const handleGenerateBet = useCallback(() => {
        let bet: number[] = [];
        const range = infoGame.map(game => { return game.range });
        const limit = infoGame.map(game => { return game['max-number'] });
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
              
                if (check|| check2) {
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

    const handleUserChoseNumber = useCallback((e) => {
        const limit = infoGame.map(game => game['max-number']);
        const check = numbersUser.find(numb => numb === Number(e.target.value));
        if (numbersUser.length < Number(limit)) {

            if (check) {
                alert('voce ja tem esse numero')
            } else {
                setNumbersUser([...numbersUser, Number(e.target.value)]);
            }

        }
    }, [numbersUser, infoGame]);

    const handleClearGame = useCallback(() => {
        setNumbersUser([]);
    }, []);

    useEffect(() => {//initial bet
        setInfoGame([initialGame]);
        setGameSelected(initialGame?.type)
    }, [initialGame]);

    useEffect(() => {//after user selected game set information on array 
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
    }, [betsState, gameSelected]);

    useEffect(() => {//run function generate numbers of game
        handleGenerateNumbers(Number(infoGame.map(game => game?.range)));
    }, [infoGame, handleGenerateNumbers]);

    return (
        <>
            <Menu />
            <Container>
                <Content>
                    <SectionGame>
                        <Title><strong>NEW BET</strong> FOR {gameSelected?.toUpperCase()}</Title>
                        <strong>Choose a game</strong>
                        <ButtonGamesDiv>
                            {!errorState
                                ? betsState.map(game => (
                                    <ButtonGames
                                        onClick={() => handleClickedInButtonGame(game.type)}
                                        isActive={game.type === gameSelected ? active : false}
                                        type='button'
                                        key={game.type}
                                        color={game.color}
                                    >{game.type}</ButtonGames>
                                ))
                                : <p>erro ao carregar os jogos</p>
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
                                    valueNumber={num} />
                            ))}
                        </DivNumbers>
                        <ButtonsDiv>
                            <ButtonsGenerate onClick={handleGenerateBet}>Complete game</ButtonsGenerate>
                            <ButtonsGenerate onClick={handleClearGame}>Clear game</ButtonsGenerate>
                            <ButtonAddCart><FiShoppingCart size={25} style={{ verticalAlign: 'middle', marginRight: 10 }} /> Add to cart</ButtonAddCart>
                        </ButtonsDiv>
                    </SectionGame>
                    <SectionCart>
                        <CartTittle>CART</CartTittle>
                        <TotalDiv>
                            <strong>CART</strong>
                            <FinalText>Total: R$ 0,00</FinalText>
                        </TotalDiv>
                        <FinalButton type='button'>Save <FiArrowRight style={{ verticalAlign: 'middle' }} /></FinalButton>
                    </SectionCart>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default NewBet;