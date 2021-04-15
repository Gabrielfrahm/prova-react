import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import ButtonGames from '../../components/ButtonGames';

import Numbers from '../../components/Numbers';
import { GamesProps } from '../../store/modules/games/types';
import { useSelector } from 'react-redux';
import { IState } from '../../store';

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
} from './styles';


const NewBet: React.FC = () => {
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    //state of active button 
    const [active, setActive] = useState(false);
    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);

    const [numbers, setNumbers] = useState<Number[]>([]);

    useEffect(() => {
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
    }, [betsState, gameSelected]);

    const handleGenerateNumbers = useCallback((range: number) => {
        const numberArr = [];
        for (let i = 1; i <= range; i++) {
            numberArr.push(i);
            console.log();
        }
        return setNumbers(numberArr);
    }, [])

    useEffect(() => {
        handleGenerateNumbers(Number(infoGame.map(game => game.range)));
    }, [infoGame, handleGenerateNumbers])

    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(true);
    }, []);

    return (
        <>
            <Menu />
            <Container>
                <Content>
                    <SectionGame>
                        <Title><strong>NEW BET</strong> FOR {gameSelected.toUpperCase()}</Title>
                        <span>Choose a game</span>
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
                            <GameDescription key={game.type}>
                                <p>{game.description}</p>
                            </GameDescription>
                        ))}
                        <DivNumbers >
                            {numbers.map(num => (
                                <Numbers key={num.valueOf()} valueNumber={num} />
                            ))}
                        </DivNumbers>
                        <ButtonsDiv>
                            <ButtonsGenerate>Complete game</ButtonsGenerate>
                            <ButtonsGenerate>Clear game</ButtonsGenerate>
                        </ButtonsDiv>
                    </SectionGame>
                    <SectionCart>
                        <CartTittle>CART</CartTittle>
                        <TotalDiv>
                            <strong>CART</strong>
                            <FinalText>Total: R$ 0,00</FinalText>
                        </TotalDiv>
                        <FinalButton type='button'>Save</FinalButton>
                    </SectionCart>
                </Content>
            </Container>
            <Footer />
        </>
    )
}

export default NewBet;