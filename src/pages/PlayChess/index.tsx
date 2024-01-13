import BoardTile from "@/pages/PlayChess/components/BoardTile";
import { useChessBoard } from "@/pages/PlayChess/hooks/useChessBoard";
import React from "react";

const PlayChess: React.FC = () => {
  const { chessBoard, moveChessPiece, pickUpChess, currentPlayer } =
    useChessBoard();
  return (
    <div className="flex flex-col  max-h-[calc(100vh-160px)] w-auto aspect-square m-auto">
      {chessBoard.map((row, rowIndex) => (
        <div className="max-w-[90vw] flex flex-row" key={rowIndex}>
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
