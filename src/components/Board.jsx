import React from 'react';
import Cell from './Cell';

const Board = ({ cells, onClick }) => {
  const renderCell = (index) => {
    return <Cell value={cells[index]} onClick={() => onClick(index)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
    </div>
  );
};

export default Board;
