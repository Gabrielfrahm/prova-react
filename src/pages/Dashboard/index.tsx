import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ButtonGames from '../../components/ButtonGames';
import Footer from '../../components/Footer';
import { v4 as uuid } from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../components/Menu';

import { IState } from '../../store';
import { Container, Content, Title, Button, ShowBet } from './styles';
import { GamesProps } from '../../store/modules/games/types';
import Bet from '../../components/Bet';
import { formatValue } from '../../utils/formatValue';
// import { formatDate } from '../../utils/formatDate';
import { loadGames } from '../../store/modules/games/action';
import api from '../../server/api';

export interface ShowBetsProps {
    id: number;
    color: string;
    type: string;
    price: number;
    numbers: string;
    created_at: Date;
    game: GamesProps;
};

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();

    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    const [games, setGames] = useState<ShowBetsProps[]>([]);

    //state of active button 
    const [active, setActive] = useState(false);

    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const [filterGame, setFilterGame] = useState<ShowBetsProps[]>([]);

    const history = useHistory();

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    const handleFilterGame = useCallback(() => {
        const game = games.filter(item => {
            return item.game.type === gameSelected;
        });
        setFilterGame(game);
    }, [games, gameSelected])

    useEffect(() => {//initial bet
        handleFilterGame();
    }, [handleFilterGame]);

    useEffect(() => {
        api.get('/game/bets').then(
            response => {
                console.log(response.data);
                setGames(response.data)
            }
        );
    }, []);

    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);

        setActive(true);
    }, []);

    const handleToClickInNewBet = useCallback(() => {
        history.push('/new-bet')
    }, [history])

    return (
        <>
            <Menu />
            <Container >
                <Content>
                    <Title>RECENT GAMES</Title>
                    <span>Filters</span>
                    {!errorState
                        ? betsState.map(game => (
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
                        : <p>Erro ao carregar os jogos</p>
                    }
                    <Button onClick={handleToClickInNewBet}>New Bet <FiArrowRight style={{ verticalAlign: 'middle' }} /></Button>
                </Content>
                <ShowBet>

                    {filterGame.length !== 0
                        ? filterGame.map(item => (
                            <Bet
                                key={uuid()}
                                price={formatValue(item.price)}
                                color={item.game.color}
                                numbers={item.numbers}
                                date={String(item.created_at)}
                                betType={item.game.type}
                            />
                            // <p>Empty 😢 {gameSelected}</p>
                        ))
                        : games.map(item => (
                            <Bet
                                key={uuid()}
                                price={formatValue(item.price)}
                                color={item.game.color}
                                numbers={item.numbers}
                                date={item.created_at.toLocaleString()}
                                betType={item.game.type}
                            />
                        ))
                    }
                </ShowBet>
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard;

