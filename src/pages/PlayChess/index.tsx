import BoardTile from "@/pages/PlayChess/components/BoardTile";
import { useChessBoard } from "@/pages/PlayChess/hooks/useChessBoard";
import React from "react";

const PlayChess: React.FC = () => {
  const { chessBoard, moveChessPiece, pickUpChess, currentPlayer } =
    useChessBoard();
  return (
    <div className="flex flex-col h-[100vh] max-h-[calc(100vh-160px)] aspect-square m-auto">
      {chessBoard.map((row, rowIndex) => (
        <div className="h-1/5 flex flex-row" key={`${row}`}>
          {row.map((chessPiece, col) => (
            <BoardTile
              chessPiece={chessPiece}
              col={col}
              row={rowIndex}
              key={`${row}.${col}`}
              pickUpChess={pickUpChess}
              moveChessPiece={moveChessPiece}
              currentPlayer={currentPlayer}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayChess;
