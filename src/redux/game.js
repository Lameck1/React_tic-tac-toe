import { createSlice } from '@reduxjs/toolkit';

const determineWinner = (cells) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};

const initialState = {
  history: [
    {
      cells: Array(9).fill(null),
    },
  ],
  players: [],
  stepNumber: 0,
  xIsNext: true,
  draw: false,
  winner: null,
  status: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    jumpTo: (state, action) => {
      state.stepNumber = action.payload;
      state.xIsNext = state.stepNumber % 2 === 0;
    },

    play: (state, action) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[state.stepNumber];
      const cells = [...current.cells];
      if (determineWinner(cells) || cells[action.payload]) {
        return;
      }
      cells[action.payload] = state.xIsNext ? 'X' : 'O';
      state.history = history.concat([
        {
          cells,
        },
      ]);
      state.stepNumber = history.length;
      state.xIsNext = !state.xIsNext;
      state.draw = cells.every((cell) => cell !== null);
      state.winner = determineWinner(cells);

      state.status = state.winner
        ? `🎉 Winner: ${
            state.winner === 'X' ? state.players[0].X : state.players[0].O
          }`
        : state.draw
        ? "🤝 It's a Draw"
        : 'Next player: ' +
          (state.xIsNext
            ? state.players[0].X + ' - X '
            : state.players[0].O + ' - O ');
    },

    reset: (state) => {
      state.history = [
        {
          cells: Array(9).fill(null),
        },
      ];
      state.stepNumber = 0;
      state.xIsNext = true;
      state.draw = false;
      state.winner = null;
    },
    getPlayers: (state, action) => {
      state.players = action.payload;
      state.status = `Next player: ${state.players[0].X} - X`;
    },
  },
});

export const { jumpTo, reset, play, getPlayers } = gameSlice.actions;
export default gameSlice.reducer;
