import {
  BOARD_SIZE,
  MOVEMENT_GUIDE_FLAG,
  PLAYER_1,
  PLAYER_2,
  TRAPPING_FLAG,
} from "@/constants/board";
import React from "react";
import classNames from "classnames";
import {
  TPosition,
  TPositionParam,
} from "@/pages/PlayChess/hooks/useChessBoard";

export type TBoardTile = {
  row: number;
  col: number;
  chessPiece: number;
  currentPlayer: number;
  pickUpChess: (position: TPosition) => void;
  moveChessPiece: (position: TPositionParam) => void;
};

const PathRender = [
  <>
    <div className="border-l h-full absolute "></div>
    <div className="border-b w-full absolute"></div>
    <div className="border-b w-[calc(100%*sqrt(2))] absolute rotate-45"></div>
    <div className="border-b w-[calc(100%*sqrt(2))] absolute -rotate-45"></div>
  </>,
  <>
    <div className="border-l h-full absolute "></div>
    <div className="border-b w-full absolute"></div>
  </>,
];

const BoardTile: React.FC<TBoardTile> = ({
  row,
  col,
  chessPiece,
  currentPlayer,
  pickUpChess,
  moveChessPiece,
}) => {
  const diagonalMovement: number = (row * BOARD_SIZE + col) % 2;
  const chessPieceClassName = classNames("rounded-full aspect-square z-10 ", {
    "bg-red-600 w-5 cursor-pointer": chessPiece === PLAYER_1,
    "bg-blue-600 w-5 cursor-pointer": chessPiece === PLAYER_2,
    "!cursor-not-allowed": currentPlayer * chessPiece < 0,
    "bg-red-600 opacity-50 w-6 cursor-pointer":
      chessPiece === PLAYER_1 * MOVEMENT_GUIDE_FLAG,
    "bg-blue-600 opacity-50 w-6 cursor-pointer":
      chessPiece === PLAYER_2 * MOVEMENT_GUIDE_FLAG,

    "w-12 cursor-pointer":
      chessPiece === PLAYER_1 * TRAPPING_FLAG ||
      chessPiece === PLAYER_2 * TRAPPING_FLAG,
    hidden: chessPiece === 0,
  });

  return (
    <div className="flex relative justify-center items-center w-full aspect-square text-center align-middle">
      {PathRender[diagonalMovement]}
      {(chessPiece === PLAYER_1 || chessPiece === PLAYER_2) && (
        <div
          className={chessPieceClassName}
          onClick={() =>
            pickUpChess({
              row,
              col,
            })
          }
        />
      )}

      {(chessPiece === PLAYER_1 * MOVEMENT_GUIDE_FLAG ||
        chessPiece === PLAYER_2 * MOVEMENT_GUIDE_FLAG) && (
        <div
          className={chessPieceClassName}
          onClick={() =>
            moveChessPiece({
              row,
              col,
            })
          }
        />
      )}

      {(chessPiece === PLAYER_1 * TRAPPING_FLAG ||
        chessPiece === PLAYER_2 * TRAPPING_FLAG) && (
        <img
          src="/images/trap_icon.jpg"
          className={chessPieceClassName}
          onClick={() =>
            moveChessPiece({
              row,
              col,
            })
          }
        />
      )}
    </div>
  );
};

export default BoardTile;
