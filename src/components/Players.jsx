import React from 'react';
import { useDispatch } from 'react-redux';
import { getPlayers } from '../redux/game';

const Players = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const player1 = e.target.player1.value;
    const player2 = e.target.player2.value;
    dispatch(getPlayers([{ X: player1, O: player2 }]));
  };

  return (
    <div>
      <h1>Players</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Player 1:
          <input type="text" name="player1" />
        </label>
        <label>
          Player 2:
          <input type="text" name="player2" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Players;
