import {
  BOARD_SIZE,
  MOVEMENT_GUIDE_FLAG,
  PLAYER_1,
  PLAYER_2,
} from "@/constants/board";
import { useCallback, useEffect, useMemo, useState } from "react";

export type TPosition = {
  row: number | null;
  col: number | null;
};

export const useChessBoard = () => {
  // const [prevBoard, setPrevBoard] = useState<number[][]>();
  const [chessBoard, setChessBoard] = useState<number[][]>([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, -1],
    [-1, 0, 0, 0, -1],
    [-1, -1, -1, -1, -1],
  ]);

  const chessMoveHelper = [
    // Diagonal Moves
    [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ],
    // Normal Moves
    [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  ];

  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  const [currentChess, setCurrentChess] = useState<TPosition>({
    row: null,
    col: null,
  });

  const noChessChosen = useMemo(
    () => currentChess.col === null && currentChess.row === null,
    [currentChess]
  );
  const isDiagonalMoveAvailable = (position: TPosition) =>
    position.row !== null && position.col !== null
      ? (position.col + position.row * 5) % 2
      : 0;

  const clearMoveGuides = () => {
    setChessBoard((previous) =>
      previous.map((row) =>
        row.map((col) =>
          col === PLAYER_1 * MOVEMENT_GUIDE_FLAG ||
          col === PLAYER_2 * MOVEMENT_GUIDE_FLAG
            ? 0
            : col
        )
      )
    );
  };

  const pickUpChess = useCallback(
    (position: TPosition) => {
      if (
        position.col !== null &&
        position.row !== null &&
        chessBoard[position.row][position.col] === currentPlayer
      ) {
        setCurrentChess(position);
      }
    },
    [chessBoard]
  );

  const getMovable = (position: TPosition) => {
    return chessMoveHelper[isDiagonalMoveAvailable(position)]
      .map((direction) => ({
        row: (position.row ?? -100) + direction[0],
        col: (position.col ?? -100) + direction[1],
      }))
      .filter(
        (position) =>
          position.row >= 0 &&
          position.row < BOARD_SIZE &&
          position.col >= 0 &&
          position.col < BOARD_SIZE &&
          chessBoard[position.row][position.col] !== PLAYER_1 &&
          chessBoard[position.row][position.col] !== PLAYER_2
      );
  };

  const moveChessPiece = useCallback(
    (position: TPosition) => {
      console.log(position);
      setChessBoard((previous) => {
        const temp = previous;
        if (
          currentChess.row !== null &&
          currentChess.col !== null &&
          position.row !== null &&
          position.col !== null
        ) {
          temp[currentChess.row][currentChess.col] = 0;
          temp[position.row][position.col] = currentPlayer;
          console.log(temp);
          return temp;
        } else return previous;
      });
      setCurrentChess({
        row: null,
        col: null,
      });
      setCurrentPlayer((prev) => -prev);
    },
    [currentChess]
  );

  const addMoveGuides = useCallback(() => {
    if (!noChessChosen) {
      setChessBoard((previous) => {
        const tempBoard = previous;
        const placeToHighlight = getMovable(currentChess);
        placeToHighlight.map(
          (place) =>
            (tempBoard[place.row][place.col] =
              currentPlayer * MOVEMENT_GUIDE_FLAG)
        );

        console.log(tempBoard, placeToHighlight);
        return tempBoard;
      });
    }
  }, [currentChess]);

  useEffect(() => {
    clearMoveGuides();
    addMoveGuides();
  }, [currentChess]);

  return {
    chessBoard,
    setChessBoard,
    currentChess,
    setCurrentChess,
    currentPlayer,
    setCurrentPlayer,
    moveChessPiece,
    pickUpChess,
  } as const;
};
