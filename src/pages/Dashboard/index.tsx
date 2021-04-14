import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ButtonGames from '../../components/ButtonGames';
import Footer from '../../components/Footer';

import { useSelector } from 'react-redux';
import Menu from '../../components/Menu';

import { IState } from '../../store';
import { Container, Content, Title, Button } from './styles';
// import { loadGames } from '../../store/modules/games/action';
import { GamesProps } from '../../store/modules/games/types';

const Dashboard: React.FC = () => {
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    // const dispatch = useDispatch();
    //state of active button 
    const [active, setActive] = useState(false);
    //state of games of json
    // const [bet, setBet] = useState<GamesProps[]>([]);
    //state of game selected to user
    const [gameSelected, setGameSelected] = useState('');

    const history = useHistory();

    const handleClickedInButtonGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(true);
    }, []);

    // useEffect(() => {
    //     dispatch(loadGames());
    // },[dispatch]);

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
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard;