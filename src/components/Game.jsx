import React from 'react';
// import calculateWinner from '../helpers/calculateWinner';
import { useSelector, useDispatch } from 'react-redux';
import { jumpTo, reset, play } from '../redux/game';
import Board from './Board';
import Players from './Players';

const Game = () => {
  const players = useSelector((state) => state.game.players);
  const history = useSelector((state) => state.game.history);
  const stepNumber = useSelector((state) => state.game.stepNumber);
  const current = history[stepNumber];
  const status = useSelector((state) => state.game.status);
  const dispatch = useDispatch();

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';

    return (
      <li key={move}>
        <button onClick={() => dispatch(jumpTo(move))}>{desc}</button>
      </li>
    );
  });

  return (
    (players.length && (
      <div className="game">
        <div className="game-board">
          <Board
            cells={current.cells}
            onClick={(index) => dispatch(play(index))}
          />
          <button onClick={() => dispatch(reset())}>RESET BOARD</button>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )) || (
      <div className="game">
        <div className="game-board">
          <Players />
        </div>
      </div>
    )
  );
};

export default Game;
