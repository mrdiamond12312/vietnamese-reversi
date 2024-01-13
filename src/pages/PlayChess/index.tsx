import BoardTile from "@/pages/PlayChess/components/BoardTile";
import { useChessBoard } from "@/pages/PlayChess/hooks/useChessBoard";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const PlayChess: React.FC = () => {
  const { chessBoard, moveChessPiece, pickUpChess, currentPlayer } =
    useChessBoard();
  return (
    <div className=" relative flex lg:flex-row flex-col max-h-[calc(100vh-160px)] w-auto aspect-square m-auto">
      <Card className="  lg:absolute  lg:-right-64 lg:top-20 relative">
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="Máy"
          description="Chơi quân đỏ"
        />
      </Card>
      <div className="flex flex-col  max-h-[calc(100vh-160px)] w-full  m-auto">
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
      <Card className="  lg:absolute  lg:-right-64 lg:bottom-20 relative">
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="Bạn"
          description="Chơi quân xanh"
        />
      </Card>
    </div>
  );
};

export default PlayChess;
